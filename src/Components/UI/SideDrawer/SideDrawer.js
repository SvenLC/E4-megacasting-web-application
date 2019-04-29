import React from 'react';
import { Drawer, List, withStyles, Divider, Paper } from '@material-ui/core';

import CastingList from './CastingList/CastingList';
import ReferentialList from './ReferentialList/ReferentialList';
import EditorialList from './EditorialList/EditorialList';

const styles = theme => ({
    root: {
        width: 'auto',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        overflowX: 'auto',
        height: 700,
    },
    drawerPaper: {
        position: 'relative',
        width: 'auto',
    }
})

const sideDrawer = (props) => {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Drawer
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left">
                <List component="nav">
                    <CastingList />
                    <Divider />
                    <ReferentialList />
                    <EditorialList />
                    <Divider />
                </List>
            </Drawer>
        </Paper>
    )
}

export default withStyles(styles)(sideDrawer);

