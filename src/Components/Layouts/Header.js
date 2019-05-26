import React, { Fragment } from "react";
import { Grid } from '@material-ui/core';

import AppBar from '../UI/AppBar/AppBar';
import SideDrawer from '../UI/SideDrawer/SideDrawer';
import Dashboard from '../UI/Dashboard/Dashboard';

const Layout = (props) => {
    let sideDrawer = <SideDrawer />;
    let width = 'auto';   

    if(window.location.pathname === '/') {
        sideDrawer = null;
        width = 350;
    }


    return (
        <Fragment>
            <AppBar />
            <div style={{ margin: '0 auto', width: width}}>
                <Grid container>
                    <Grid item xs={2}>
                        {sideDrawer}
                    </Grid>
                    <Grid item xs={10} >
                        <Dashboard>
                            {props.children}
                        </Dashboard>
                    </Grid>
                </Grid>
            </div>
        </Fragment >
    )
};


export default Layout;