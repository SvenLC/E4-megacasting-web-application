import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withStyles, Table, TableHead, TableBody, TableCell, TableRow, Fab } from '@material-ui/core';


import { Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700,
    },
    fab: {
        marginRight: theme.spacing.unit * 6,
    },
    input: {
        display: 'none',
    },
});

class Offers extends Component {
    state = {
        offers: []
    }

    componentDidMount() {
        axios.get('http://localhost:4000/castingOffers')
            .then(res => {
                this.setState({ offers: res.data });
            })
            .catch(() => {

            });
    }

    offerClickHandler = (offer) => {
        this.setState({ offer: offer });
        this.props.history.push({ pathname: '/offer/' + offer._id });

    }

    test() {
        console.log('test')
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Toolbar>
                    <Typography variant="headline" style={{ flex: 3 }}>
                        Offres
                    </Typography>
                    <Fab color="primary" size='small' aria-label="Add" className={classes.fab} onClick={this.test}>
                        {/* <AddIcon /> */}
                    </Fab>
                </Toolbar>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Référence</TableCell>
                            <TableCell>Titre</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Client</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.offers.map(offer => (
                            <TableRow hover key={offer._id} onClick={() => this.offerClickHandler(offer)}>
                                {/* <Offer
                                    key={offer._id}
                                    offer={offer} /> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment>

        );
    }
}

export default withStyles(styles)(Offers);

