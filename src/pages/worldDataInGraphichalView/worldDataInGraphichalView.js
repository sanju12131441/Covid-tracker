import React, { Component } from 'react';
import axios from 'axios';
import { Typography, Paper, Grid } from '@material-ui/core';
import { Doughnut, Pie } from 'react-chartjs-2';
import './worldDataInGraphichalView.css';
import CircularProgress from '@material-ui/core/CircularProgress';


class OverView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            worldData: {
                labels: [
                    'Active Cases',
                    'Recovered Cases',
                    'Total Deaths'
                ],
                datasets: [{
                    data: [],
                    backgroundColor: [
                       '#ff6d00',
                        '#1a237e',
                        '#ec407a',
                    ],
                    hoverBackgroundColor: [
                       '#ff6d00',
                        '#1a237e',
                        '#ec407a',
                    ]
                }]
            },
            top5CountriesData: {
                labels: [

                ],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#14db9f',
                        '#8f34eb',
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#14db9f',
                        '#8f34eb',
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            },
        }
    }

    componentDidMount() {
        this.getWorldData();
    }

    compareValues = (key, order = 'asc') => {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    getWorldData() {
        axios.get('https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true').then(res => {
            const worldData = { ...this.state.worldData };
            const top5CountriesData = { ...this.state.top5CountriesData };
            const totalActiveCases = res.data.reduce((sum, val) => sum + val.infected, 0);
            let totalRecoveredCases = 0;
            res.data.forEach(val => {
                if (val.recovered !== 'NA') {
                    totalRecoveredCases = totalRecoveredCases + val.recovered
                }
            });
            const top5CountriesCases = res.data.sort(this.compareValues('infected', 'desc')).slice(0, 5).map(val => val.infected);
            const top5CountriesNames = res.data.sort(this.compareValues('infected', 'desc')).slice(0, 5).map(val => val.country);
            const totalDeaths = res.data.reduce((sum, val) => sum + val.deceased, 0);
            worldData.datasets[0].data = [totalActiveCases, totalRecoveredCases, totalDeaths]
            top5CountriesData.datasets[0].data = top5CountriesCases;
            top5CountriesData.labels = top5CountriesNames;
            this.setState({
                worldData,
                top5CountriesData
            })
        })
    }

    render() {
        const { worldData, top5CountriesData } = this.state;
        if (worldData.datasets[0].data.length === 0 && top5CountriesData.labels.length === 0) {
            return (
                <div className='spinnerContainer'>
                    <CircularProgress></CircularProgress>
                </div>
            )
        }
        return (
            <Paper className='master-container'>
                <Grid container align='center'>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            World Wide Graph
                    </Typography>
                        <Doughnut data={worldData} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Top 5 Countries Graph
                    </Typography>
                        <Pie data={top5CountriesData} />

                    </Grid>
                </Grid>



            </Paper>


        )
    }
}

export default OverView;