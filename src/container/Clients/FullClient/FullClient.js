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

class Client extends Component {
    state = {
        inputProps: false,
        client: null
    };

    componentDidMount() {
        console.log(this.props.match.params.id)
        if (this.props.match.params.id === 'new') {
            let client = {};
            this.setState({ client: client });
        }
        else {
            axios.get('https://megacastingapi.azurewebsites.net/clients/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ client: response.data });
                });
        }
    }

    handleChange = name => event => {
        this.setState(Object.assign(this.state.client, { [name]: event.target.value }))
    };

    saveClient = () => {

        if (this.props.match.params.id === 'new') {

            axios.post('https://megacastingapi.azurewebsites.net/clients/', {
                name: this.state.name,
                address: this.state.address,
                legalStatus: this.state.legalStatus,
                siret: this.state.siret,
            })
                .then((res) => {

                    this.props.history.push({ pathname: '/clients' });

                })
                .catch((error) => {

                })
        }
        else {
            axios.put('https://megacastingapi.azurewebsites.net/clients/' + this.props.match.params.id, {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email,
                legalStatus: this.state.legalStatus,
                siret: this.state.siret,
                rna: this.state.rna
            })
                .then((res) => {

                    this.props.history.push({ pathname: '/clients' });

                })
                .catch((error) => {

                })

        }
    }

    deleteClient = () => {
        axios.delete('https://megacastingapi.azurewebsites.net/clients/' + this.props.match.params.id)
            .then(response => {
                this.props.history.push({ pathname: '/clients' });
            })
            .catch((error) => {

            });
    }

    render() {
        let cli = null;
        const { classes } = this.props;

        if (this.state.client) {
            cli = (
                <form className={classes.container} noValidate autoComplete="cli">
                    <TextField
                        id="1"
                        label="Nom"
                        className={classes.textField}
                        defaultValue={this.state.client.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />

                    <TextField
                        id="2"
                        label="Adresse"
                        className={classes.textField}
                        defaultValue={this.state.client.address}
                        onChange={this.handleChange('address')}
                        margin="normal"
                    />
                    <TextField
                        id="3"
                        label="Email"
                        className={classes.textField}
                        defaultValue={this.state.client.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
                    <TextField
                        id="4"
                        label="Statut"
                        className={classes.textField}
                        defaultValue={this.state.client.legalStatus}
                        onChange={this.handleChange('legalStatus')}
                        margin="normal"
                    />
                    <TextField
                        id="5"
                        label="Siret"
                        className={classes.textField}
                        defaultValue={this.state.client.siret}
                        onChange={this.handleChange('siret')}
                        margin="normal"
                    />
                    <TextField
                        id="6"
                        label="RNA"
                        className={classes.textField}
                        defaultValue={this.state.client.rna}
                        onChange={this.handleChange('rna')}
                        margin="normal"
                    />
                </form>
            )
        }

        return (
            <Fragment>
                {cli}
                <div style={{ margin: "auto", width: "20%" }}>
                    <Fab color="primary" right size='small' aria-label="Sauvegarder" className={classes.fab} onClick={this.saveClient}>
                        <Save />
                    </Fab>
                    <Fab color="secondary" right size='small' aria-label="Supprimer" className={classes.fab} onClick={this.deleteClient}>
                        <Delete />
                    </Fab>
                </div>
            </Fragment>
        )

    }
}

export default withStyles(styles)(Client);