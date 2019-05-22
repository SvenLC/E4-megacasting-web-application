import React from 'react';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        overflowX: 'auto',
        maxWidth: 'auto'
    }
});

const Dashboard = (props) => {
    const { classes } = props;

    return (
        <div>
            <Paper className={classes.root}>


                {props.children}
            </Paper>
        </div>
    );
}

export default withStyles(styles)(Dashboard);