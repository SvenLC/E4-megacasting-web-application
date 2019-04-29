import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class ReferentialList extends React.Component {
    state = {
        open: true,
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <ListItem button divider onClick={this.handleClick}>
                    <ListItemText primary="Référentiels" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="Contrat" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="Domaine de métiers" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="Métiers" />
                        </ListItem>
                    </List>
                </Collapse>
            </React.Fragment>
        );
    };



}

export default withStyles(styles)(ReferentialList);