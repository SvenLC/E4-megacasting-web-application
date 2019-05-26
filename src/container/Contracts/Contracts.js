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

const contractFields = {
    ref: 'Référence',
    name: 'Nom'
}



class Contracts extends Component {
    state = {
        contracts: []
    }

    componentDidMount() {
        axios.get('/contracts')
            .then(res => {
                this.setState({ contracts: res.data });

            })
            .catch(() => {

            });
    }

    contractClickHandler = (contract) => {
        this.setState({ contract: contract });
        this.props.history.push({ pathname: '/contract/' + contract._id });

    }

    newContractClickHandler = () => {
        this.props.history.push({ pathname: '/contract/new' });
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
        this.formatId(this.state.contracts);

        return (
            <Fragment>
                <ToolBar name={'Contrat'} newElement={this.newContractClickHandler} />
                <Table className={classes.table}>
                    <TableHead fields={contractFields} />
                    <TableBody>
                        {this.state.contracts.map(contract => (
                            <TableRow hover key={contract._id} onClick={() => this.contractClickHandler(contract)}>
                                {Object.values(this.formatData(contract, contractFields)).map(field => (
                                    <TableCell key={shortid.generate()} data={this.formatData(contract, contractFields)}>{field}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment >

        );

    }


}


export default withStyles(styles)(Contracts);