
import React, { Component } from 'react'
import { Grid,TextField,Button,MenuItem,InputLabel,Select,FormControl,Box} from "@mui/material";
import Header from '../../Static/Header';
import {useState, useEffect} from "react";


const  TestForm=()=>{
    const [CategoryList, setCategoryList] = useState([]);
    const [Category, setCategory] = useState('');
    const [post_title, setPostTitle] = useState('');
    const [PostDesc, setPostDesc] = useState('');
    const [Area, setArea] = useState('');
    const [City, setCity] = useState('');
    const [Country, setCountry] = useState('');
    const [photo_url, setPhotoUrl] = useState('');

    const getCategory=category=>{
        return(
            <MenuItem value={category.id}>{category.name}</MenuItem>
        )
    }

    const submitPost=(e)=>
    {   
      
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            //   "comment_txt": commentTxt,
            //   "user": uid,
            //   "post": id
            })
          };
          fetch("http://localhost:8000/api/comment_insert", requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            // setcomments(data);
          
          }
          )
          .catch(error => console.log('error', error));
    }


    useEffect(() => {
        fetch("http://localhost:8000/api/categories")
          .then(res => res.json())
          .then(
            (result) => {
              setCategoryList(result);
            }
            // 
          )
      }, []);
    
    return ( //flexGrow={1} display="flex"
    <div>
    <Header/>
      <Grid container>
        <Grid item container xs={6} >
            <TextField
                        id="PhotoUrl"
                        label="Photo Url"
                        sx={{
                            marginBottom:4,
                            marginLeft:4,
                            // marginRight:4,
                            
                        }}
                        />
        </Grid>

            <Grid item container xs={6} direction="column" >
                
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        // value={Category}
                        label="Category"
                        onChange={e => setCategory(e.target.value)}
                        >
                        <MenuItem value="">
                                    <em>None</em>
                        </MenuItem>
                        {CategoryList.map(category=>getCategory(category))}
                    </Select>
                </FormControl>

                <Button variant="outlined" 
                        sx={{
                            marginTop:4,
                            marginBottom:4,
                            marginLeft:4,
                            marginRight:4,
                        }}
                        onClick={submitPost}
                        > Post </Button>

                          
            </Grid>


      </Grid>
      </div>
    )
  }


export default TestForm