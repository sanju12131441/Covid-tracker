import React from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import './worldData.css'

const worldData = ({ heading = 'Hold On...', data = [] }) => {
    if (data.length === 0) {
        return (
            <div className='masterContainer'>
                <Typography variant="body1" className='heading'>
                    {heading}
                </Typography>
                <Grid container spacing={2} >
                    {
                        [0, 1, 2, 3].map(obj => {
                            return (
                                <Grid item xs={6} sm={4} md={3} key={obj}>
                                    <Paper className='dataContainer'>
                                        <Typography variant="caption">
                                            <Skeleton />
                                        </Typography>
                                        <Typography variant="h6" >
                                            <Skeleton />
                                        </Typography>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        )
    }
    return (
        <div className='masterContainer'>
            <Typography variant="body1" className='heading'>
                {heading}
            </Typography>
            <Grid container spacing={2} >
                {
                    data.map(obj => {
                        return (
                            <Grid item xs={6} sm={4} md={3} key={obj.value}>
                                <Paper className='dataContainer'>
                                    <Typography variant="caption">
                                        {obj.title}
                                    </Typography>
                                    <Typography variant="h6" >
                                        {obj.value}
                                    </Typography>
                                    <Typography variant="caption">
                                        {obj.subtitle}
                                    </Typography>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

export default worldData; 