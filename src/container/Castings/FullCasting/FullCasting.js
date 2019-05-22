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

class FullCasting extends Component {
    state = {
        casting: null
    };

    componentDidMount() {
        if (this.props.match.params.id === 'new') {
            let casting = {};
            this.setState({ casting: casting });
        }
        else {
            axios.get('https://megacastingapi.azurewebsites.net/castings/' + this.props.match.params.id)
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

            axios.post('https://megacastingapi.azurewebsites.net/castings/', {
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
            axios.put('https://megacastingapi.azurewebsites.net/castings/' + this.props.match.params.id, {
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
        axios.delete('https://megacastingapi.azurewebsites.net/castings/' + this.props.match.params.id)
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
                <form className={classes.container} noValidate autoComplete="casting">
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
                    <TextField
                        id="5"
                        label="Métier"
                        className={classes.textField}
                        defaultValue={this.state.casting.job}
                        onChange={this.handleChange('job')}
                        margin="normal"
                    />
                    <TextField
                        id="6"
                        label="Contrat"
                        className={classes.textField}
                        defaultValue={this.state.casting.contract}
                        onChange={this.handleChange('contract')}
                        margin="normal"
                    />
                    <TextField
                        id="7"
                        label="Localisation"
                        className={classes.textField}
                        defaultValue={this.state.casting.location}
                        onChange={this.handleChange('location')}
                        margin="normal"
                    />
                    <TextField
                        id="8"
                        label="Client"
                        className={classes.textField}
                        defaultValue={this.state.casting.client}
                        onChange={this.handleChange('client')}
                        margin="normal"
                    />
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