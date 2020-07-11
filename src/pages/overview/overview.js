import React, { Component } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import WorldData from '../../components/worlddata/worldData';
import './overview.css'

class OverView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            worldData: [],
            top5CountriesData: [],
            top5StatesData: [],
            stateWiseData: {
                labels: [],
                datasets: [
                    {
                        label: 'Total Active Cases',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: []
                    }
                ]
            },
        }
    }

    componentDidMount() {
        this.getWorldData();
        this.getIndiaData();
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
            const totalActiveCases = res.data.reduce((sum, val) => sum + val.infected, 0);
            const top5CountriesData = [];
            res.data.sort(this.compareValues('infected', 'desc')).slice(0, 5).forEach(val => {
                val['title'] = val.country;
                val['value'] = val.infected;
                top5CountriesData.push(val)
            });
            let totalRecoveredCases = 0;
            res.data.forEach(val => {
                if (val.recovered !== 'NA') {
                    totalRecoveredCases = totalRecoveredCases + val.recovered
                }
            });
            const totalDeaths = res.data.reduce((sum, val) => sum + val.deceased, 0);
            const worldData = [
                { title: 'Active Cases', value: totalActiveCases },
                { title: 'Recovered', value: totalRecoveredCases },
                { title: 'Total Deaths', value: totalDeaths },
            ]

            this.setState({
                worldData,
                top5CountriesData,
            })
        })
    }

    getIndiaData() {
        axios.get('https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true').then(res => {
            const stateWiseData = { ...this.state.stateWiseData };
            stateWiseData.labels = res.data.regionData.map(obj => obj.region);
            stateWiseData.datasets[0].data = res.data.regionData.map(obj => obj.totalCases);
            const top5StatesData = [];
            res.data.regionData.sort(this.compareValues('totalCases', 'desc')).slice(0, 5).forEach(val => {
                val['title'] = val.region;
                val['value'] = val.totalCases;
                top5StatesData.push(val)
            });
            this.setState({
                stateWiseData,
                top5StatesData
            })
        })
    }

    render() {
        const { worldData, top5CountriesData,top5StatesData } = this.state;
        return (
            <>
                <div className='overviewContainer'>
                    <Typography variant="h5" >
                        Overview
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                    >
                        NEW ACCOUNT
                    </Button>
                </div>
                <WorldData data={worldData} heading={'All Over the World'} />
                <WorldData data={top5CountriesData} heading={'Top 5 Affected Countries'} />
                <WorldData data={top5StatesData} heading={'Top 5 Affected States In India'} />
            </>
        )
    }
}

export default OverView;