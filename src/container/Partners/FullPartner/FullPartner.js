import React, { Component, Fragment } from 'react';

import { withStyles, TextField, Fab, Toolbar, Typography } from '@material-ui/core';
import { Delete, Save } from '@material-ui/icons'

import axios from '../../../axios-request';

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

class FullPartner extends Component {
    state = {
        inputProps: false,
        partner: null
    };

    componentDidMount() {
        console.log(this.props.match.params.id)
        if (this.props.match.params.id === 'new') {
            let partner = {};
            this.setState({ partner: partner });
        }
        else {
            axios.get('/partners/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ partner: response.data });
                });
        }
    }

    handleChange = name => event => {
        this.setState(Object.assign(this.state.partner, { [name]: event.target.value }))
    };

    savePartner = () => {

        if (this.props.match.params.id === 'new') {

            axios.post('/partners/', {
                name: this.state.partner.name,
                login: this.state.partner.login,
                mdp: this.state.partner.mdp
            })
                .then((res) => {
                    this.props.history.push({ pathname: '/partners' });
                })
                .catch((error) => { })
        }
        else {
            axios.put('/partners/' + this.props.match.params.id, {
                name: this.state.partner.name,
                login: this.state.partner.login,
                mdp: this.state.partner.mdp
            })
                .then((res) => {
                    this.props.history.push({ pathname: '/partners' });
                })
                .catch((error) => { })
        }
    }

    deletePartner = () => {
        axios.delete('/partners/' + this.props.match.params.id)
            .then(response => {
                this.props.history.push({ pathname: '/partners' });
            })
            .catch((error) => { });
    }

    render() {
        let cli = null;
        const { classes } = this.props;

        if (this.state.partner) {
            cli = (
                <Fragment>
                    <Toolbar>
                        <Typography variant="headline" style={{ flex: 3 }}>
                            Partenaire
                        </Typography>
                    </Toolbar>
                    <form className={classes.container} noValidate autoComplete="partner">
                        <TextField
                            id="1"
                            label="Nom"
                            className={classes.textField}
                            defaultValue={this.state.partner.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <TextField
                            id="2"
                            label="Identifiant"
                            className={classes.textField}
                            defaultValue={this.state.partner.login}
                            onChange={this.handleChange('login')}
                            margin="normal"
                        />
                        <TextField
                            id="3"
                            label="Mot de passe"
                            className={classes.textField}
                            defaultValue={this.state.partner.mdp}
                            onChange={this.handleChange('mdp')}
                            margin="normal"
                        />
                    </form>
                </Fragment>
            )
        }

        return (
            <Fragment>
                {cli}
                <div style={{ margin: "auto", width: "20%" }}>
                    <Fab color="primary" right size='small' aria-label="Sauvegarder" className={classes.fab} onClick={this.savePartner}>
                        <Save />
                    </Fab>
                    <Fab color="secondary" right size='small' aria-label="Supprimer" className={classes.fab} onClick={this.deletePartner}>
                        <Delete />
                    </Fab>
                </div>
            </Fragment>
        )

    }
}

export default withStyles(styles)(FullPartner);