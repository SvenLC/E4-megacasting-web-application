import React from 'react';

import { AppBar, Toolbar, Typography, Button, withStyles } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
};




const appBar = (props) => {
    const { classes } = props;

    let button = null;
    if(window.location.pathname !== '/') {
        button = 'Déconnecter';
    }
    
    return (
        <div className={classes.root}>
            <AppBar position="relative" >
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        MegaCasting
                    </Typography>
                    <Button color="inherit" onClick={() => window.location = '/'}>{button}</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(appBar);

