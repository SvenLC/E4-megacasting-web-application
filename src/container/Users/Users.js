import React, { Component, Fragment } from 'react';
import axios from '../../axios-request';
import { withStyles, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import shortid from 'shortid'

import ToolBar from '../../Components/Tables/ToolBar/ToolBar';
import TableHead from '../../Components/Tables/TableHead/TableHead';



const styles = theme => ({
    table: {
        minWidth: 700,
    },
    input: {
        display: 'none',
    },
});

const userFields = {
    ref: 'Référence',
    login: 'Identifiant',
    mdp: 'Mot de passe'
}

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        axios.get('/users')
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(() => { });
    }

    userClickHandler = (user) => {
        this.setState({ user: user });
        this.props.history.push({ pathname: '/user/' + user._id });
    }

    newUserClickHandler = () => {
        this.props.history.push({ pathname: '/user/new' });
    }

    formatData = (data, fieldsName) => {
        const arrayFieldsName = Object.keys(fieldsName)
        let formatedData = {};

        for (let fields of arrayFieldsName) {
            formatedData[fields] = data[fields]
        }
        return formatedData;
    }

    formatId = (list) => {
        list.forEach(element => {
            if (element._id) {
                element['ref'] = element._id.substr(-8);
            }
        });
        return list;
    }

    render() {
        const { classes } = this.props;
        this.formatId(this.state.users);

        return (
            <Fragment>
                <ToolBar name={'Utilisateur'} newElement={this.newUserClickHandler} />
                <Table className={classes.table}>
                    <TableHead fields={userFields} />
                    <TableBody>
                        {this.state.users.map(user => (
                            <TableRow hover key={user._id} onClick={() => this.userClickHandler(user)}>
                                {Object.values(this.formatData(user, userFields)).map(field => (
                                    <TableCell key={shortid.generate()} data={this.formatData(user, userFields)}>{field}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment >

        );

    }


}


export default withStyles(styles)(Users);