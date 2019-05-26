import React, { Component, Fragment } from 'react';

import axios from '../../axios-request';
import { withStyles, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import shortid from 'shortid';

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

const articleFields = {
    ref: 'Référence',
    title: 'Nom',
    formatedContent: 'Contenu'
}



class Articles extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        axios.get('/articles', )
            .then(res => {
                this.setState({ articles: res.data });

            })
            .catch(() => {

            });
    }

    articleClickHandler = (article) => {
        this.setState({ article: article });
        this.props.history.push({ pathname: '/article/' + article._id });

    }

    newArticleClickHandler = () => {
        this.props.history.push({ pathname: '/article/new' });
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

    formatContent = (list) => {

        list.forEach(element => {
            if (element.content) {
                element['formatedContent'] = element.content.substr(0, 200) + ' ...';
            }
        });
        return list;
    }

    render() {
        const { classes } = this.props;
        this.formatId(this.state.articles);
        this.formatContent(this.state.articles);

        return (
            <Fragment>
                <ToolBar name={'Articles'} newElement={this.newArticleClickHandler} />
                <Table className={classes.table}>
                    <TableHead fields={articleFields} />
                    <TableBody>
                        {this.state.articles.map(article => (
                            <TableRow hover key={article._id} onClick={() => this.articleClickHandler(article)}>
                                {Object.values(this.formatData(article, articleFields)).map(field => (
                                    <TableCell key={shortid.generate()} data={this.formatData(article, articleFields)}>{field}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment >

        );

    }


}


export default withStyles(styles)(Articles);