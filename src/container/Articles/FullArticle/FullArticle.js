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
        width: 400,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 300,
    },
    fab: {
        marginRight: theme.spacing.unit * 6,
        marginTop: theme.spacing.unit * 6,
    }
});

class FullArticle extends Component {
    state = {
        inputProps: false,
        article: null
    };

    componentDidMount() {       
        if (this.props.match.params.id === 'new') {
            let article = {};
            this.setState({ article: article });
        }
        else {
            axios.get('/articles/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ article: response.data });
                });
        }
    }

    handleChange = name => event => {
        this.setState(Object.assign(this.state.article, { [name]: event.target.value }))
    };

    saveArticle = () => {
        if (this.props.match.params.id === 'new') {
            axios.post('/articles/', {
                title: this.state.article.title,
                content: this.state.article.content
            })
                .then((res) => {
                    this.props.history.push({ pathname: '/articles' });
                })
                .catch((error) => {

                })
        }
        else {
            axios.put('/articles/' + this.props.match.params.id, {
                title: this.state.article.title,
                content: this.state.article.content

            })
                .then((res) => {
                    this.props.history.push({ pathname: '/articles' });
                })
                .catch((error) => {

                })
        }
    }

    deleteArticle = () => {
        axios.delete('/articles/' + this.props.match.params.id)
            .then(response => {
                this.props.history.push({ pathname: '/articles' });
            })
            .catch((error) => {

            });
    }

   

    render() {
        let cli = null;
        const { classes } = this.props;
        

        if (this.state.article) {
            cli = (
                <Fragment>
                    <Toolbar>
                        <Typography variant="headline" style={{ flex: 3 }}>
                            Article
                        </Typography>
                    </Toolbar>
                    <form className={classes.container} noValidate autoComplete="article">
                        <TextField
                            id="1"
                            label="Titre"
                            className={classes.textField}
                            defaultValue={this.state.article.title}
                            onChange={this.handleChange('title')}
                            margin="normal"
                        />
                        <TextField
                            id="2"
                            label="Contenu"                    
                            defaultValue={this.state.article.content}
                            onChange={this.handleChange('content')}                           
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
                {cli}
                <div style={{ margin: "auto", width: "20%" }}>
                    <Fab color="primary" right size='small' aria-label="Sauvegarder" className={classes.fab} onClick={this.saveArticle}>
                        <Save />
                    </Fab>
                    <Fab color="secondary" right size='small' aria-label="Supprimer" className={classes.fab} onClick={this.deleteArticle}>
                        <Delete />
                    </Fab>
                </div>
            </Fragment>
        )

    }
}

export default withStyles(styles)(FullArticle);