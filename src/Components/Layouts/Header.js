import React, { Fragment } from "react";
import { Grid } from '@material-ui/core';

// import AppBar from '../components/UI/AppBar/AppBar';
// import SideDrawer from "../components/UI/SideDrawer/SideDrawer";
import Dashboard from '../UI/Dashboard/Dashboard'

const Layout = (props) => {
    return (
        <Fragment>
            {/* <AppBar /> */}
            <Grid container>
                <Grid item xs={2}>
                    {/* <SideDrawer /> */}
                </Grid>
                <Grid item xs={10} >
                    <Dashboard>
                        {props.children}
                    </Dashboard>
                </Grid>
            </Grid>
        </Fragment >
    )
};


export default Layout;