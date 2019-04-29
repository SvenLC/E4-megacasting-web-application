import React from 'react';
import { Fab, Typography, Toolbar, withStyles } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
    fab: {
        marginRight: theme.spacing.unit * 6,
    }
});

const toolBar = (props) => {
    const { classes } = props;
    return (
        <Toolbar>
            <Typography variant="headline" style={{ flex: 3 }}>
                {props.name}
            </Typography>
            <Fab color="primary" size='small' aria-label="Add" className={classes.fab} onClick={props.newElement}>
                <AddIcon />
            </Fab>
        </Toolbar>
    )

}

export default withStyles(styles)(toolBar);