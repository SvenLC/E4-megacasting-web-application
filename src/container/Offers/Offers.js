import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withStyles, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import shortid from 'shortid'

import ToolBar from '../../Components/Tables/ToolBar/ToolBar';
import TableHead from '../../Components/Tables/TableHead/TableHead';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700
    },
    fab: {
        marginRight: theme.spacing.unit * 6,
    },
    input: {
        display: 'none',
    },
});

const offerFields = {

    reference: "Référence",
    title: "Titre",
    startDatePublication: "Date de début de publication",
    publicationDuration: "Durée de publication",
    startDateContract: "Date de début du contrat",
    jobNumber: "Postes",
    // "jobDescription": "Cherche chanteur pour soirée reprise années 80",
    contract: "Contrat",
    // "profileDescription": "Vous aimez chanter du Balavoine ? Ce poste est pour vous !",
    // "job": "Chanteur",
    // "domain": "Spectacle vivant",
    // "contact": "animfun@gmail.com",
    location: "Brest",
    client: "Client"
    // "__v": 0
}

class Offers extends Component {
    state = {
        offers: []
    }

    componentDidMount() {
        axios.get('http://localhost:4000/castingOffers')
            .then(res => {
                this.setState({ offers: res.data });
            })
            .catch(() => {

            });
    }

    offerClickHandler = (offer) => {
        this.setState({ offer: offer });
        this.props.history.push({ pathname: '/offer/' + offer._id });

    }

    newOfferClickHandler = () => {
        this.props.history.push({ pathname: '/offer/new' });
    }

    formatData = (data, fieldsName) => {
        const arrayFieldsName = Object.keys(fieldsName)
        let formatedData = {};

        for (let fields of arrayFieldsName) {
            formatedData[fields] = data[fields]

        }
        return formatedData;

    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <ToolBar name={'Offres'} newElement={this.newOffertClickHandler} />
                <Table className={classes.table}>
                    <TableHead fields={offerFields} />
                    <TableBody>
                        {this.state.offers.map(offer => (
                            <TableRow hover key={offer._id} onClick={() => this.offerClickHandler(offer)}>
                                {Object.values(this.formatData(offer, offerFields)).map(field => (
                                    <TableCell key={shortid.generate()} data={this.formatData(offer, offerFields)}>{field}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment >

        );
    }
}

export default withStyles(styles)(Offers);

