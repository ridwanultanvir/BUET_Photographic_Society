import React from "react";
import { Grid } from "@mui/material";
import MyCard from "./Card";
import {useState, useEffect} from "react";
const Content = () => {

   const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setposts] = useState([]);
   
  

      useEffect(() => {
         fetch("http://localhost:8000/api/post_detail",
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
               setIsLoaded(true);
               setposts(result);
             },
             // Note: it's important to handle errors here
             // instead of a catch() block so that we don't swallow
             // exceptions from actual bugs in components.
             (error) => {
               setIsLoaded(true);
               setError(error);
             }
           )
       }, [])
      

      
    
   const getSourceData = (source) => {
     
      // const { post_title, post_date, photo_url, avatar_src } = source;
      return(
         <Grid item xs={12} sm={4}>
            <MyCard  {...source}/>
         </Grid>
      );
   };

    return (
       <Grid container spacing={1}>
         {/* <Grid item xs={12} sm={4}> */}
            {posts.map(source => getSourceData(source))}

            {/* <MyCard /> */}
         {/* </Grid> */}
         {/* <Grid item xs  = {12} sm = {4}>
            <MyCard/>
         </Grid>
         <Grid item xs ={12} sm = {4}>
            <MyCard/>
         </Grid>
         <Grid item xs ={12} sm = {4}>
            <MyCard/>
         </Grid>
         <Grid item xs ={12} sm = {4}>
            <MyCard/>
         </Grid>
         <Grid item xs ={12} sm = {4}>
            <MyCard/>
         </Grid>
         <Grid item xs ={12} sm = {4}>
            <MyCard/>
         </Grid>
         <Grid item xs ={12} sm = {4}>
            <MyCard/>
         </Grid> */}
       </Grid>
            
    );
};

export default Content;