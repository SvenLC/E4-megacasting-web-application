import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withStyles, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import shortid from 'shortid'

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

const clientFields = {
    name: 'Nom',
    address: 'Adresse',
    legalStatus: 'Statut'
}



class Clients extends Component {
    state = {
        clients: []
    }

    componentDidMount() {
        axios.get('http://localhost:4000/clients')
            .then(res => {
                this.setState({ clients: res.data });

            })
            .catch(() => {

            });
    }

    clientClickHandler = (client) => {
        this.setState({ client: client });
        this.props.history.push({ pathname: '/client/' + client._id });

    }

    newClientClickHandler = () => {
        this.props.history.push({ pathname: '/client/new' });
    }

    formatData = (data, fieldsName) => {
        const arrayFieldsName = Object.keys(fieldsName)
        let formatedData = {};

        for (let fields of arrayFieldsName) {
            formatedData[fields] = data[fields]

        }
        return formatedData;

    }

    generateKey = (pre) => {
        return `${pre}_${new Date().getTime()}`;
    }

    render() {
        const { classes } = this.props;


        return (
            <Fragment>
                <ToolBar name={'Client'} newElement={this.newClientClickHandler} />
                <Table className={classes.table}>
                    <TableHead fields={clientFields} />
                    <TableBody>
                        {this.state.clients.map(client => (
                            <TableRow hover key={client._id} onClick={this.clientClickHandler}>
                                {Object.values(this.formatData(client, clientFields)).map(field => (
                                    <TableCell key={shortid.generate()} data={this.formatData(client, clientFields)}>{field}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment >

        );

    }


}


export default withStyles(styles)(Clients);