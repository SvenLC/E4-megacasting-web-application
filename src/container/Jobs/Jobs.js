import React, { Component, Fragment } from 'react';

import axios from '../../axios-request';
import { withStyles, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import shortid from 'shortid';

import ToolBar from '../../Components/Tables/ToolBar/ToolBar';
import TableHead from '../../Components/Tables/TableHead/TableHead';



const styles = theme => ({
    table: {
        minWidth: 700,
    },
    input: {
        display: 'none',
    },
});

const jobFields = {
    ref: 'Référence',
    name: 'Nom'
}



class Jobs extends Component {
    state = {
        jobs: []
    }

    componentDidMount() {
        axios.get('/jobs', )
            .then(res => {
                this.setState({ jobs: res.data });

            })
            .catch(() => {

            });
    }

    jobClickHandler = (job) => {
        this.setState({ job: job });
        this.props.history.push({ pathname: '/job/' + job._id });

    }

    newJobClickHandler = () => {
        this.props.history.push({ pathname: '/job/new' });
    }

    formatData = (data, fieldsName) => {
        const arrayFieldsName = Object.keys(fieldsName)
        let formatedData = {};

        for (let fields of arrayFieldsName) {
            formatedData[fields] = data[fields]

        }
        return formatedData;

    }

    formatId = (list) => {

        list.forEach(element => {
            if (element._id) {
                element['ref'] = element._id.substr(-8);
            }
        });
        return list;
    }

    render() {
        const { classes } = this.props;
        this.formatId(this.state.jobs);

        return (
            <Fragment>
                <ToolBar name={'Métier'} newElement={this.newJobClickHandler} />
                <Table className={classes.table}>
                    <TableHead fields={jobFields} />
                    <TableBody>
                        {this.state.jobs.map(job => (
                            <TableRow hover key={job._id} onClick={() => this.jobClickHandler(job)}>
                                {Object.values(this.formatData(job, jobFields)).map(field => (
                                    <TableCell key={shortid.generate()} data={this.formatData(job, jobFields)}>{field}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment >

        );

    }


}


export default withStyles(styles)(Jobs);