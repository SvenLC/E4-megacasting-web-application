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

class FullUser extends Component {
    state = {
        inputProps: false,
        user: null
    };

    componentDidMount() {
        console.log(this.props.match.params.id)
        if (this.props.match.params.id === 'new') {
            let user = {};
            this.setState({ user: user });
        }
        else {
            axios.get('/users/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ user: response.data });
                });
        }
    }

    handleChange = name => event => {
        this.setState(Object.assign(this.state.user, { [name]: event.target.value }))
    };

    saveUser = () => {

        if (this.props.match.params.id === 'new') {

            axios.post('/users/', {
                login: this.state.user.login,
                mdp: this.state.user.mdp
            })
                .then((res) => {
                    this.props.history.push({ pathname: '/users' });
                })
                .catch((error) => { })
        }
        else {
            axios.put('/users/' + this.props.match.params.id, {
                login: this.state.user.login,
                mdp: this.state.user.mdp
            })
                .then((res) => {
                    this.props.history.push({ pathname: '/users' });
                })
                .catch((error) => { })
        }
    }

    deleteUser = () => {
        axios.delete('/users/' + this.props.match.params.id)
            .then(response => {
                this.props.history.push({ pathname: '/users' });
            })
            .catch((error) => { });
    }

    render() {
        let cli = null;
        const { classes } = this.props;

        if (this.state.user) {
            cli = (
                <Fragment>
                    <Toolbar>
                        <Typography variant="headline" style={{ flex: 3 }}>
                            Utilisateurs
                        </Typography>
                    </Toolbar>
                    <form className={classes.container} noValidate autoComplete="user">               
                        <TextField
                            id="2"
                            label="Identifiant"
                            className={classes.textField}
                            defaultValue={this.state.user.login}
                            onChange={this.handleChange('login')}
                            margin="normal"
                        />
                        <TextField
                            id="3"
                            label="Mot de passe"
                            className={classes.textField}
                            defaultValue={null}
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
                    <Fab color="primary" right size='small' aria-label="Sauvegarder" className={classes.fab} onClick={this.saveUser}>
                        <Save />
                    </Fab>
                    <Fab color="secondary" right size='small' aria-label="Supprimer" className={classes.fab} onClick={this.deleteUser}>
                        <Delete />
                    </Fab>
                </div>
            </Fragment>
        )

    }
}

export default withStyles(styles)(FullUser);