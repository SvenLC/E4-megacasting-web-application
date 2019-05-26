import React, { Component, Fragment } from 'react';

import { withStyles, TextField, Fab, InputLabel, Select, MenuItem, FormControl, Typography, Toolbar } from '@material-ui/core';
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
    },
    formControl: {
        marginTop: theme.spacing.unit * 2,        
        marginLeft: theme.spacing.unit
    },
    selectEmpty: {
        marginTop: theme.spacing.unit,
    },
});

class FullCasting extends Component {
    state = {
        casting: null,
        clients: [],
        jobs: [],
        contracts: []
    };

    componentDidMount() {
        axios.get('/clients')
            .then(response => {
                this.setState({ clients: response.data });
            });
        axios.get('/jobs')
            .then(response => {
                this.setState({ jobs: response.data });
            });
            axios.get('/contracts')
            .then(response => {
                this.setState({ contracts: response.data });
            });
        if (this.props.match.params.id === 'new') {
            let casting = {};
            this.setState({ casting: casting });

        }
        else {
            axios.get('/castings/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ casting: response.data });
                });
        }

    }

    handleChange = name => event => {
        this.setState(Object.assign(this.state.casting, { [name]: event.target.value }))
    };

    saveCasting = () => {

        if (this.props.match.params.id === 'new') {

            axios.post('/castings/', {
                title: this.state.casting.title,
                description: this.state.casting.description,
                datePublication: this.state.casting.datePublication,
                publicationDuration: this.state.casting.publicationDuration,
                contact: this.state.casting.contact,
                job: this.state.casting.job,
                contract: this.state.casting.contract,
                location: this.state.casting.location,
                client: this.state.casting.client
            })
                .then((res) => {
                    this.props.history.push({ pathname: '/castings' });
                })
                .catch((error) => {

                })
        }
        else {
            console.log(this.state.casting.datePublication);
            axios.put('/castings/' + this.props.match.params.id, {
                title: this.state.casting.title,
                description: this.state.casting.description,
                datePublication: this.state.casting.datePublication,
                publicationDuration: this.state.casting.publicationDuration,
                contact: this.state.casting.contact,
                job: this.state.casting.job,
                contract: this.state.casting.contract,
                location: this.state.casting.location,
                client: this.state.casting.client
            })
                .then((res) => {


                    this.props.history.push({ pathname: '/castings' });

                })
                .catch((error) => {

                })
        }
    }

    deleteCasting = () => {
        axios.delete('/castings/' + this.props.match.params.id)
            .then(response => {
                this.props.history.push({ pathname: '/castings' });
            })
            .catch((error) => {

            });
    }

    render() {
        let casting = null;
        const { classes } = this.props;

        if (this.state.casting) {
            casting = (
                <Fragment>
                    <Toolbar>
                        <Typography variant="headline" style={{ flex: 3 }}>
                            Casting
                        </Typography>
                    </Toolbar>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="1"
                            label="Titre"
                            className={classes.textField}
                            defaultValue={this.state.casting.title}
                            style={{ width: 400 }}
                            onChange={this.handleChange('title')}
                            margin="normal"
                        />
                        <TextField
                            id="2"
                            label="Date de publication"
                            type="date"
                            className={classes.textField}
                            defaultValue={this.state.casting.datePublication}
                            onChange={this.handleChange('datePublication')}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="3"
                            label="Durée de publication"
                            className={classes.textField}
                            defaultValue={this.state.casting.publicationDuration}
                            onChange={this.handleChange('publicationDuration')}
                            margin="normal"
                        />
                        <TextField
                            id="4"
                            label="Contact"
                            className={classes.textField}
                            defaultValue={this.state.casting.contact}
                            onChange={this.handleChange('contact')}
                            style={{ width: 400 }}
                            margin="normal"
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="metier-simple">Métier</InputLabel>
                            <Select
                                inputProps={{
                                    name: 'metier',
                                    id: 'metier-simple'
                                }}
                                className={classes.textField}
                                value={this.state.casting.job}
                                onChange={this.handleChange('job')}
                            >
                                <MenuItem value="">Aucun</MenuItem>
                                {this.state.jobs.map(job => (
                                    <MenuItem key={job._id} value={job.name}>
                                        {job.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="contrat-simple">Contrat</InputLabel>
                            <Select
                                inputProps={{
                                    name: 'contract',
                                    id: 'contract-simple'
                                }}
                                className={classes.textField}
                                value={this.state.casting.contract}
                                onChange={this.handleChange('contract')}
                            >
                                <MenuItem value="">Aucun</MenuItem>
                                {this.state.contracts.map(contract => (
                                    <MenuItem key={contract._id} value={contract.name}>
                                        {contract.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="7"
                            label="Localisation"
                            className={classes.textField}
                            defaultValue={this.state.casting.location}
                            onChange={this.handleChange('location')}
                            margin="normal"
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="client">Client</InputLabel>
                            <Select

                                inputProps={{
                                    name: 'client'
                                }}
                                className={classes.textField}
                                value={this.state.casting.client}
                                onChange={this.handleChange('client')}
                            >
                                <MenuItem>Aucun</MenuItem>
                                {this.state.clients.map(client => (
                                    <MenuItem key={client._id} value={client.name}>
                                        {client.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="9"
                            label="Description"
                            defaultValue={this.state.casting.description}
                            onChange={this.handleChange('description')}
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            multiline={true}
                            rows={20}
                            rowsMax={25}
                        />
                    </form>
                </Fragment>
            )
        }

        return (
            <Fragment>
                {casting}
                <div style={{ margin: "auto", width: "20%" }}>
                    <Fab color="primary" right size='small' aria-label="Sauvegarder" className={classes.fab} onClick={this.saveCasting}>
                        <Save />
                    </Fab>
                    <Fab color="secondary" right size='small' aria-label="Supprimer" className={classes.fab} onClick={this.deleteCasting}>
                        <Delete />
                    </Fab>
                </div>
            </Fragment>
        )

    }
}

export default withStyles(styles)(FullCasting);