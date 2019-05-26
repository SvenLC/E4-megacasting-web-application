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

class FullContract extends Component {
    state = {
        inputProps: false,
        contract: null
    };

    componentDidMount() {
        console.log(this.props.match.params.id)
        if (this.props.match.params.id === 'new') {
            let contract = {};
            this.setState({ contract: contract });
        }
        else {
            axios.get('/contracts/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ contract: response.data });
                });
        }
    }

    handleChange = name => event => {
        this.setState(Object.assign(this.state.contract, { [name]: event.target.value }))
    };

    savecontract = () => {

        if (this.props.match.params.id === 'new') {

            axios.post('/contracts/', {
                name: this.state.contract.name

            })
                .then((res) => {

                    this.props.history.push({ pathname: '/contracts' });

                })
                .catch((error) => {

                })
        }
        else {
            axios.put('/contracts/' + this.props.match.params.id, {
                name: this.state.name,

            })
                .then((res) => {

                    this.props.history.push({ pathname: '/contracts' });

                })
                .catch((error) => {

                })

        }
    }

    deleteContract = () => {
        axios.delete('/contracts/' + this.props.match.params.id)
            .then(response => {
                this.props.history.push({ pathname: '/contracts' });
            })
            .catch((error) => {

            });
    }

    render() {
        let cli = null;
        const { classes } = this.props;

        if (this.state.contract) {
            cli = (
                <Fragment>
                    <Toolbar>
                        <Typography variant="headline" style={{ flex: 3 }}>
                            Contrat
                        </Typography>
                    </Toolbar>
                    <form className={classes.container} noValidate autoComplete="contract">
                        <TextField
                            id="1"
                            label="Nom"
                            className={classes.textField}
                            defaultValue={this.state.contract.name}
                            onChange={this.handleChange('name')}
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
                    <Fab color="primary" right size='small' aria-label="Sauvegarder" className={classes.fab} onClick={this.savecontract}>
                        <Save />
                    </Fab>
                    <Fab color="secondary" right size='small' aria-label="Supprimer" className={classes.fab} onClick={this.deletecontract}>
                        <Delete />
                    </Fab>
                </div>
            </Fragment>
        )

    }
}

export default withStyles(styles)(FullContract);