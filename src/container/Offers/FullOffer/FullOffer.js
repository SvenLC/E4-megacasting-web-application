import React, { Component, Fragment } from 'react';

import { withStyles, TextField, Fab } from '@material-ui/core';
import { Delete, Save } from '@material-ui/icons'

import axios from 'axios';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    fab: {
        marginRight: theme.spacing.unit * 6,
        marginTop: theme.spacing.unit * 6,


    }
});

class FullOffer extends Component {
    state = {
        inputProps: false,
        offer: null
    };

    componentDidMount() {
        console.log(this.props.match.params.id)
        if (this.props.match.params.id === 'new') {
            let offer = {
                name: null,
                address: null,
                legalStatus: null,
                siret: null
            }
            this.setState({ offer: offer })
        }
        else {
            axios.get('http://localhost:4000/castingOffers/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ offer: response.data });
                });
        }
    }

    handleChange = name => event => {
        this.setState(Object.assign(this.state.offer, { [name]: event.target.value }))
    };

    saveOffer = () => {

        if (this.props.match.params.id === 'new') {

            axios.post('http://localhost:4000/castingOffers/', {
                reference: this.state.offer.reference,
        title: this.state.offer.title,
        startDatePublication: this.state.offer.startDatePublication,
        "publicationDuration": 30,
        "startDateContract": "2020-01-17T02:24:00.000Z",
        "jobNumber": 3,
        "jobDescription": "Cherche chanteur pour soirée reprise années 80",
        "contract": "CDD",
        "profileDescription": "Vous aimez chanter du Balavoine ? Ce poste est pour vous !",
        "job": "Chanteur",
        "domain": "Spectacle vivant",
        "contact": "animfun@gmail.com",
        "location": "Brest",
        "client": "test",
            })
                .then((res) => {

                    this.props.history.push({ pathname: '/castingOffers' });

                })
                .catch((error) => {

                })
        }
        else {
            axios.put('http://localhost:4000/castingOffers/' + this.props.match.params.id, {
                name: this.state.name,
                address: this.state.address,
                legalStatus: this.state.legalStatus,
                siret: this.state.siret,
            })
                .then((res) => {

                    this.props.history.push({ pathname: '/castingOffers' });

                })
                .catch((error) => {

                })

        }
    }

    deleteOffer = () => {
        axios.delete('http://localhost:4000/castingOffers/' + this.props.match.params.id)
            .then(response => {
                this.props.history.push({ pathname: '/castingOffers' });
            })
            .catch((error) => {

            });
    }

    render() {
        let cli = null;
        const { classes } = this.props;

        if (this.state.offer) {
            cli = (
                <form className={classes.container} noValidate autoComplete="cli">
                    <TextField
                        InputProps={{
                            readOnly: this.state.inputProps,
                        }}
                        id="1"
                        label="Nom"
                        className={classes.textField}
                        defaultValue={this.state.offer.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        InputProps={{
                            readOnly: this.state.inputProps,
                        }}
                        id="2"
                        label="Adresse"
                        className={classes.textField}
                        defaultValue={this.state.offer.address}
                        onChange={this.handleChange('address')}
                        margin="normal"
                    />
                    <TextField
                        id="3"
                        label="Statut"
                        className={classes.textField}
                        defaultValue={this.state.offer.legalStatus}
                        onChange={this.handleChange('legalStatus')}
                        margin="normal"
                    />
                </form>
            )
        }

        return (
            <Fragment>
                {cli}
                <div style={{ margin: "auto", width: "20%" }}>
                    <Fab color="primary" right size='small' aria-label="Sauvegarder" className={classes.fab} onClick={this.saveOffer}>
                        <Save />
                    </Fab>
                    <Fab color="secondary" right size='small' aria-label="Supprimer" className={classes.fab} onClick={this.deleteOffer}>
                        <Delete />
                    </Fab>
                </div>
            </Fragment>
        )

    }
}

export default withStyles(styles)(FullOffer);