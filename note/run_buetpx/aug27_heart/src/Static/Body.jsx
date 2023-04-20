import React, { Component } from "react";
import Card from "./Card";
import { Grid } from "@mui/material";
// import photoList from "./Constants";

class Body extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        //   photoList: photoList
        photoList :[]
        };
      }

      componentDidMount() {
        fetch("http://127.0.0.1:8000/api/posts",
        {
            method: "GET", // *Type of request GET, POST, PUT, DELETE
            mode: "cors", // Type of mode of the request
            cache: "no-cache", // options like default, no-cache, reload, force-cache
            credentials: "same-origin", // options like include, *same-origin, omit
            headers: {
              "Content-Type": "application/json" // request content type,
              ,
              "Authorization": 'Token ' + localStorage.getItem('token')
              
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
        }

        )
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                photoList: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
        }

        getPhotoCard = (photoObj) => {
            return (
                <Grid item 
               xs={12} sm={6} md={6} lg={4}
                >
                <Card {...photoObj} />
                </Grid>
            );
        }

        render()
        {
            return (
                      <Grid container spacing={2}>
                        {console.log('here')}
                        {/* <Grid item>
                          <h1>Hello</h1>
                        </Grid> */}
                        {this.state.photoList.map(photoObj => this.getPhotoCard(photoObj))}
                      </Grid>
                    );
        }


}
  export default Body;