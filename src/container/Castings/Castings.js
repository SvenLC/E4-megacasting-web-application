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

const castingFields = {
    ref: "Référence",
    title: "Titre",
    datePublication: "Date de début de publication",
    publicationDuration: "Durée de publication",
    // contact: "animfun@gmail.com",
    job: "Métier",
    contract: "Contrat",
    location: "Localisation",
    client: "Client"
}

class Castings extends Component {
    state = {
        castings: []
    }

    componentDidMount() {
        axios.get('https://megacastingapi.azurewebsites.net/castings')
            .then(res => {
                this.setState({ castings: res.data });
            })
            .catch(() => {

            });
    }

    castingClickHandler = (casting) => {
        this.setState({ casting: casting });
        this.props.history.push({ pathname: '/casting/' + casting._id });

    }

    newCastingClickHandler = () => {
        this.props.history.push({ pathname: '/casting/new' });
    }

    formatData = (data, fieldsName) => {
        const arrayFieldsName = Object.keys(fieldsName)
        let formatedData = {};

        for (let fields of arrayFieldsName) {
            formatedData[fields] = data[fields]

        }
        return formatedData;

    }

    formatDate = (listCasting) => {

        listCasting.forEach(element => {
            if (element.datePublication) {
                element.datePublication = element.datePublication.split('-').reverse().join('-');
            }
        });
        return listCasting;
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
        this.formatDate(this.state.castings);
        this.formatId(this.state.castings);

        return (
            <Fragment>
                <ToolBar name={'Castings'} newElement={this.newCastingClickHandler} />
                <Table className={classes.table}>
                    <TableHead fields={castingFields} />
                    <TableBody>
                        {this.state.castings.map(casting => (
                            <TableRow hover key={casting._id} onClick={() => this.castingClickHandler(casting)}>
                                {Object.values(this.formatData(casting, castingFields)).map(field => (
                                    <TableCell key={shortid.generate()} data={this.formatData(casting, castingFields)}>{field}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment >

        );
    }
}

export default withStyles(styles)(Castings);

