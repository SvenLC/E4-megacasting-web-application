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

const partnerFields = {
    ref: 'Référence',
    name: 'Nom',
    login: 'Identifiant',
    mdp: 'Mot de passe'
}



class Partners extends Component {
    state = {
        partners: []
    }

    componentDidMount() {
        axios.get('https://megacastingapi.azurewebsites.net/partners')
            .then(res => {
                this.setState({ partners: res.data });

            })
            .catch(() => {

            });
    }

    partnerClickHandler = (partner) => {
        this.setState({ partner: partner });
        this.props.history.push({ pathname: '/partner/' + partner._id });

    }

    newPartnerClickHandler = () => {
        this.props.history.push({ pathname: '/partner/new' });
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

        return (
            <Fragment>
                <ToolBar name={'Partner'} newElement={this.newPartnerClickHandler} />
                <Table className={classes.table}>
                    <TableHead fields={partnerFields} />
                    <TableBody>
                        {this.state.partners.map(partner => (
                            <TableRow hover key={partner._id} onClick={() => this.partnerClickHandler(partner)}>
                                {Object.values(this.formatData(partner, partnerFields)).map(field => (
                                    <TableCell key={shortid.generate()} data={this.formatData(partner, partnerFields)}>{field}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment >

        );

    }


}


export default withStyles(styles)(Partners);