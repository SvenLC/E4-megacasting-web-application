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
    return (
        <div className={classes.root}>
            <AppBar position="relative" >
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        MegaCasting
                    </Typography>
                    <Button color="inherit" >{localStorage.getItem('userLogin')}</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(appBar);

