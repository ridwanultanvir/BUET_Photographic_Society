import React from 'react';
import { Grid } from '@mui/material';
import Top from './Top';
import Discover_Content from './Discover_Content';
import FilterDrawer from './Drawer_Filter';
import Options from './Options';
import Divider from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
class Discover extends React.Component {
    render() {
        return (
            <div>
                
            <Grid container direction="column">
                <Grid item >
                <Top />
                </Grid>
                <Grid item>
                    <h2> </h2>
                </Grid>
                <Grid item container >
                    <Grid item xs = {0} sm = {2}>
                    <h1>Discover</h1>
                    </Grid>
                    <Grid item xs = {0} sm = {2}>
                    <Options/>

                    </Grid>
                    <Grid item xs = {12} sm = {8}>
                        {/* Search AppBar */}

                    </Grid>
                    {/* <Divider/> */}
                </Grid>
                <Grid item container>
                    <Grid item xs={0} sm={2}>
                        <FilterDrawer />                      
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Discover_Content />

                    </Grid>

                </Grid>
            </Grid>
            </div>
        );
    }
}

export default Discover;