import React, { Component } from 'react';

import { withStyles, TextField, Button, DialogContent, DialogContentText, DialogTitle, Dialog, DialogActions } from '@material-ui/core';
import axios from '../../axios-request';


const styles = theme => ({
     textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button : {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
})


class Auth extends Component {
    state = {
        user: {
            login: '',
            mdp: ''
        },
        dialog: false
    }

    

    componentDidMount () {
        localStorage.clear();
    }

    handleChange = name => event => {
        this.setState(Object.assign(this.state.user, { [name]: event.target.value }))
    };

    login = () => {
        axios.post('/auth/login', {
            login: this.state.user.login,
            mdp: this.state.user.mdp
        })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('userLogin', this.state.user.login);
                
                localStorage.setItem('userToken', res.data.token);
                localStorage.setItem('isAuth', true);
                this.props.history.push({ pathname: '/castings' });
                window.location.reload();


            })
            .catch((error) => {
                console.log(error);
                this.setState({dialog : true});
            })
    }


    handleOpen = () => {
        this.setState({dialog : true});
        
    }

    handleClose = () => {
        this.setState({dialog : false});
    }


   



    render() {
        const { classes } = this.props;
        const errorDialog = <Dialog
                                open={this.state.dialog}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Erreur de connection"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Echec de la connexion. Veuillez vérifier votre couple identifiant, mot de passe.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>                                 
                                    <Button onClick={this.handleClose} color="primary" autoFocus>
                                        Fermer
                                    </Button>
                                </DialogActions>
                            </Dialog>
        return (
            <div style={{ width: 200 }}>
                <form onSubmit={this.submitHandler}>
                    <TextField
                        id="1"
                        label="Identifiant"
                        type="string"
                        className={classes.textField}
                        value={this.state.user.login}
                        onChange={this.handleChange('login')}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="2"
                        label="Mot de passe"
                        type="password"
                        className={classes.textField}
                        value={this.state.user.mdp}
                        onChange={this.handleChange('mdp')}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.login}>
                        Connexion
                    </Button>
                    {errorDialog}

                </form>
            </div>);
    }
}


export default withStyles(styles)(Auth);