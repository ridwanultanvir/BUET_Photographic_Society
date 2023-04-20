import React from 'react';
import { Grid } from '@mui/material';
import {FormLabel,FormControl,FormGroup, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import { makeStyles, styled, alpha } from '@material-ui/core/styles';
import {InputBase, InputLabel, Select} from '@mui/material';
import {TextField,Box, Menu, MenuItem} from '@material-ui/core'
import SearchIcon from '@mui/icons-material/Search';

import Top from './Top';
import Header from '../../Static/Header';
// import DiscoverContent from './Discover_Content';
import DiscoverContent from './DiscoverContent';
import FilterDrawer from './Drawer_Filter';
import Options from './Options';
import {Divider, Button} from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CameraEnhanceTwoToneIcon from '@mui/icons-material/CameraEnhanceTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone';

import {useState, useEffect} from "react";
import RadioButton from './RadioButton';
import CheckboxesGroup from './CheckBoxes';
import './Style.css';
  


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

  


const Explore  = () => {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const [allPost, setAllPost] = useState([]);
    const [checkList, setCheckList] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [sortOption, setSortOption] = useState();
    
    const open = Boolean(anchorEl);
    // const handleOptionClick = (event) => {
    //     console.log(event);
    //     setAnchorEl(event.currentTarget);
        
    // };
    // const handleOptionClose = (e) => {
        
    //     setAnchorEl(null);
    // };
        

    let  namess = [];
    // get array of category names
    const getCategoryName = (source) => {
       const { name  } = source;
       namess.push(name);
       
   }

   useEffect(() => {
    fetch("http://localhost:8000/api/categories",
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
            console.log("cats: ");
            console.log(result);
            result.map(getCategoryName);
            setCheckList(namess);
            


        },
        
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
        )
    }, [])
    

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()

   
    useEffect(() => {
        // fetch(checkList.length > 0 ? "http://localhost:8000/discover/posts_by_cat/Panaroma"  : "http://localhost:8000/api/post_detail")
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
            setPostList(result);
            setAllPost(result);
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

    const updatePostList = (catList) => {
        fetch( "http://localhost:8000/discover/posts_by_catlist/"+catList.toString(),
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
            setPostList(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
        )
      }

    const [checked, setChecked] = useState([]);
    const [clicked, setClicked] = useState(true);
    const [searchKey, setSearchKey] = useState("");
    const [optionKey, setOptionKey] = useState("");

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }

        setChecked(updatedList);
        updatePostList(updatedList);
        // print in terminal

        // console.log("api should be: "+updatedList.toString());
       
        setClicked(!clicked);
  
        // window.location.href = "/discover/filtered/" + updatedList.toString();
  
  
      //   onClick(checkedItems);
      };
      
      const sortBydate = (posts) => {
        posts.sort(function(a, b) {
            return new Date(b.post_date) - new Date(a.post_date);
        }).reverse();
        return posts;

      }

      const sortPosts = (option) => {

        console.log("before sorted by newest:");
            console.log(postList);
           let searchString = optionKey+"&"+searchKey+"&"+"newest";
        if (option === "newest") {
           
            fetch("http://localhost:8000/discover/search/"+searchString)
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result);
            },
            
            );

            // postList.sort(function (a, b) {
            //     var dateA = new Date(a.post_date), dateB = new Date(b.post_date)
            //     return dateA - dateB
            // });

            // sort postList by post_date
            // postList Contains all posts
            // postList.sort(function(a, b) {
            //     return new Date(b.post_date) - new Date(a.post_date);
            // });

            // setPostList(postList);
            console.log("sorted by newest:");
            console.log(postList);
            console.log("searchkey:");
            console.log(searchKey);

            

        }

        if (option === "likes") {
            console.log("likes sorted");
            // sort.sort(function(a, b) {
            //     return b.likes - a.likes;
            // }).reverse();

            // setPostList(sort);
            // setPostList(postList.sort((a, b) => (a.created_at < b.created_at ? -1 : 1)));
        }
      }

      const handleRadioClick = (event) => {
    
        console.log(event.target.value);
        sortPosts(event.target.value);

      }



      const handleSubmit = (event) => {
        event.preventDefault();
        console.log("searching for: "+searchKey);
        let searchString = optionKey + "&" + searchKey;
        console.log(searchString);
        fetch("http://localhost:8000/discover/search/"+searchString,
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
            setPostList(result);
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        ,
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
        )
    

       
      }
      const handleoptionClick = (event) => {
        console.log(event.target.value);
        setOptionKey(event.target.value);
      }

      useEffect(() => {
            if(sortOption){
                if( sortOption === "newest") {
                    // modify postList to be sorted by date
                    console.log("before sorted by newest", postList);
                    postList.sort(function(a, b) {
                        return new Date(b.post_date) - new Date(a.post_date);
                    }
                    );

                    console.log("after sorted by newest", postList);
                    setPostList(postList);
                    

                }
            }
      }, [sortOption])
        

     

      const checkedItems = checked.length
      ? checked.reduce((total, item) => {
          return total + ", " + item;
        })
      : "";
      var isChecked = (item) =>
      checked.includes(item) ? "checked-item" : "not-checked-item";

        return (
            <div>
                
            <Grid container direction="column">
                <Grid item >
                <Header />
                </Grid>
                <Grid item>
                    <h2> </h2>
                </Grid>
                <Grid item container >
                    <Grid item xs = {0} sm = {2}>
                    <h1>Discover</h1>
                    </Grid>
                    <Grid item xs = {0} sm = {2}>
                      <Box sx={{ minWidth: 60 }}>
                          <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }} >
                            {/* <InputLabel  id="demo-simple-select-label">Options</InputLabel> */}
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"

                              defaultValue={20}
                              value={optionKey}
                              label="Options"
                              onChange={handleoptionClick}
                            >
                              <MenuItem value="location">
                                  <LocationOnTwoToneIcon />
                                  Location
                              </MenuItem>

                              <MenuItem value="tag">
                              <TagTwoToneIcon />
                                  Tag
                              </MenuItem>
                                
                              <MenuItem value="photographer"><CameraEnhanceTwoToneIcon />
                                  Photographer</MenuItem>
                            </Select>
                          </FormControl>
                      </Box>
                        {/* <Options/> */}

                    </Grid>
                    <Grid item xs = {12} sm = {8} container >
                             {/* <TextField
                            onChange={() => console.log("onChange")}
                            onRequestSearch={() => console.log("onRequestSearch")}
                            style={{
                            margin: "0 auto",
                            maxWidth: 800
                            }}
                            /> */}
                            {/* <FormControl > */}
                                  <Grid item xs = {12} sm={5}>
                                        <Box
                                          
                                          sx={{
                                              width: 500,
                                              maxWidth: '100%',
                                          }}
                                          >
                                          <TextField onInput={e=>setSearchKey(e.target.value)} fullWidth label="Search" id="search" placeholder='i.e Rain'/>
                                          
                                          
                                          </Box>
                                  </Grid>
                                  <Grid item sm={0.5}/>

                                  <Grid item xs = {12} sm={6.5}>
                                          <Button type='submit' variant='contained' onClick={handleSubmit}>Search</Button>
                                    </Grid>
                            {/* </FormControl> */}
                            
                           

                    </Grid>
                    {/* <Divider/> */}
                </Grid>
                <Grid item container>
                    <Grid item xs={0} sm={2}>
                    <Grid container direction = "column">
                        <Grid item xs = {0} sm={2}>
                        {/* make the text nice */}
                        <b>Sort</b>
                        </Grid>
                        <Grid item container direction="row">
                          <Grid item sm={2}>
                            
                            </Grid>
                                <Grid item sm={8}>
                                    
                                    {/* Radio Button */}
                                    <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                // defaultValue="likes"
                                                name="radio-buttons-group"
                                            > 
                                                <Grid item  sm={8}>
                                                    <FormControlLabel value="newest" control={<Radio />} label="Newest" onClick={(e)=>{
                                                        setSortOption(e.target.value);
                                                        console.log(e.target.value);
                                                    }} />
                                                    <FormControlLabel value="likes" control={<Radio />} label="Likes" onClick={(e)=>{
                                                        setSortOption(e.target.value);
                                                        console.log(e.target.value);
                                                        
                                                    }} />
                                                </Grid>
                                                {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                                            </RadioGroup>
                                        </FormControl>

                                </Grid>
                            <Grid item sm={2}/>

                        </Grid>
                      
                        
                        <Divider/>
                        <Divider/>
                        <Grid item xs = {0} sm={2}>
                          <b>Categories</b> 
                        </Grid>
                        
                        <Grid item container direction="row">
                          
                        <Grid item sm={2}>
                            
                            </Grid>
                            
                            <Grid item sm={8} style={{maxHeight:600,overflow:'auto'}}>
                                
                                <div className={classes.root}>  
                                <FormControl component="fieldset" className={classes.formControl}>
                                    {checkList.map((item,index) => (
                                            <div key={index}>
                                                <input value={item} type="checkbox" id={item} name={item} onChange={handleCheck}  />
                                                <span className={isChecked(item)}>
                                                    {item}
                                                </span>
                                            </div>
                                    ))}
                                </FormControl>
                                </div>
                                {/* <h1>Selected: {checkedItems.toString()}</h1> */}
                                
                            
                            </Grid>
                        <Grid item sm={2}/>
                    </Grid>
                        
                    </Grid>
                        {/* <FilterDrawer />                       */}
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <DiscoverContent postlist={postList} />

                    </Grid>

                </Grid>
            </Grid>
            </div>
        );
    }


export default Explore;