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
    ref: 'Référence',
    name: 'Nom',
    address: 'Adresse',
    email: 'Email',
    legalStatus: 'Statut',
    siret: 'Siret',
    rna: 'RNA'
}



class Clients extends Component {
    state = {
        clients: []
    }

    componentDidMount() {
        axios.get('https://megacastingapi.azurewebsites.net/clients')
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
        this.formatId(this.state.clients);

        return (
            <Fragment>
                <ToolBar name={'Client'} newElement={this.newClientClickHandler} />
                <Table className={classes.table}>
                    <TableHead fields={clientFields} />
                    <TableBody>
                        {this.state.clients.map(client => (
                            <TableRow hover key={client._id} onClick={() => this.clientClickHandler(client)}>
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