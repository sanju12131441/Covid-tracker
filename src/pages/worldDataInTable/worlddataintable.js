import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import './worldDataInTable.css'

class WorldDataInTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsPerPage: 10,
            page: 0,
            worldData: [],
            columns: [
                { id: 'country', label: 'Country' },
                { id: 'infected', label: 'Infected' },
                { id: 'recovered', label: 'Recovered' },
                { id: 'deceased', label: 'Deceased' },
            ]
        }
    }

    componentDidMount() {
        this.getWorldData();
    }

    getWorldData() {
        axios.get('https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true').then(res => {
            this.setState({
                worldData: res.data
            })
        })
    }
    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            page: 0,
            rowsPerPage: event.target.value
        })
    };

    render() {
        const { rowsPerPage, page, columns, worldData } = this.state;
        if (worldData.length === 0) {
            return (
                <div className='spinnerContainer'>
                    <CircularProgress></CircularProgress>
                </div>
            )
        }
        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    All Countries Data
                </Typography>
                <Paper>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {worldData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.country}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={value}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={worldData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        )
    }

}

export default WorldDataInTable