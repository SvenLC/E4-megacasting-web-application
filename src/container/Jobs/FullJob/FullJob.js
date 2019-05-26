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

class FullJob extends Component {
    state = {
        inputProps: false,
        job: null
    };

    componentDidMount() {       
        if (this.props.match.params.id === 'new') {
            let job = {};
            this.setState({ job: job });
        }
        else {
            axios.get('/jobs/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ job: response.data });
                });
        }
    }

    handleChange = name => event => {
        this.setState(Object.assign(this.state.job, { [name]: event.target.value }))
    };

    saveJob = () => {

        if (this.props.match.params.id === 'new') {

            axios.post('/jobs/', {
                name: this.state.job.name

            })
                .then((res) => {

                    this.props.history.push({ pathname: '/jobs' });

                })
                .catch((error) => {

                })
        }
        else {
            axios.put('/jobs/' + this.props.match.params.id, {
                name: this.state.name,

            })
                .then((res) => {

                    this.props.history.push({ pathname: '/jobs' });

                })
                .catch((error) => {

                })

        }
    }

    deleteJob = () => {
        axios.delete('/jobs/' + this.props.match.params.id)
            .then(response => {
                this.props.history.push({ pathname: '/jobs' });
            })
            .catch((error) => {

            });
    }

    render() {
        let cli = null;
        const { classes } = this.props;

        if (this.state.job) {
            cli = (
                <Fragment>
                    <Toolbar>
                        <Typography variant="headline" style={{ flex: 3 }}>
                            Métier
                        </Typography>
                    </Toolbar>
                    <form className={classes.container} noValidate autoComplete="job">
                        <TextField
                            id="1"
                            label="Nom"
                            className={classes.textField}
                            defaultValue={this.state.job.name}
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
                    <Fab color="primary" right size='small' aria-label="Sauvegarder" className={classes.fab} onClick={this.saveJob}>
                        <Save />
                    </Fab>
                    <Fab color="secondary" right size='small' aria-label="Supprimer" className={classes.fab} onClick={this.deleteJob}>
                        <Delete />
                    </Fab>
                </div>
            </Fragment>
        )

    }
}

export default withStyles(styles)(FullJob);