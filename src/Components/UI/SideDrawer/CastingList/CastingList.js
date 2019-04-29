import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore} from '@material-ui/icons';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class CastingList extends Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <ListItem divider button onClick={this.handleClick}>
          <ListItemText primary="Casting" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" >
            <Link to='/offers' style={{ textDecoration: 'none' }}>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Offres" />
              </ListItem>
            </Link>
            <Link to='/clients' style={{ textDecoration: 'none' }}>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Clients" />
              </ListItem>
            </Link>
            <Link to='/partners' style={{ textDecoration: 'none' }}>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Partenaires" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </Fragment >
    );
  };
}

export default withStyles(styles)(CastingList);