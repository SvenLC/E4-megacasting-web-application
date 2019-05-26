import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const styles = theme => ({

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
                    <Link to='/contracts' style={{ textDecoration: 'none' }}>
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="Contrat" />
                        </ListItem>
                        </Link>
                        <Link to='/jobs' style={{ textDecoration: 'none' }}>
                            <ListItem button className={classes.nested}>                        
                                <ListItemText primary="Métiers" />                            
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>
            </React.Fragment>
        );
    };



}

export default withStyles(styles)(ReferentialList);