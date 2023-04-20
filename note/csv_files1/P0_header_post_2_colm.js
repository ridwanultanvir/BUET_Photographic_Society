import '../App.css';
import React from 'react';
import {Grid} from "@mui/material";
import {Paper} from "@mui/material";
import Header from '../Contents/Header';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import {IconButton} from '@mui/material';
import { TextField } from '@mui/material';
import { Chip } from '@mui/material';
import { Box } from '@mui/material';
import Content from './post_content';
import post_info from "./post_info";
import Button from '@mui/material/Button';
import FontPost from "./font"; 
import {Typography} from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/styles';
import CommentList from './CommentList'; 

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.primary,
}));

function Post(props) {
  const {id,post_title,post_date,photo_url,owner,category,place,tags}=props
  const getTag = tag => {
    return (

        <Button variant="outlined" color="primary" >   {tag} </Button>
     

    );
  };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // };
  const getComment = comment => {
    return (
      <Grid item xs={8}>
        <Item>  {comment.comment_txt} By {comment.user} </Item>

        
      </Grid>

     

    );
  };
  return (
    <Grid container direction='column' spacing={2}>
        <Grid item>
          <Header/>
        </Grid>
        <Grid item>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </Grid>
    {/* etar baire header contianer */}
        <Grid container spacing={2} marginLeft={4} >

            {/* 1st Column  */}
            <Grid container item xs={6} direction="row" >
              <Grid item xs={12}>
              <h1> Header</h1>
              </Grid>
              <Grid item xs={12}>
                  <ButtonBase sx={{ width: 500, height: 300 }}>
                    <Img src={photo_url} alt='1.jpg'/>
                  </ButtonBase>
              </Grid>
              {/* 2ND ROW  */}
              <Grid item container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}> <IconButton size="small"><ThumbUpIcon/></IconButton> </Grid>    
              </Grid>
              {/* 3rd ROW  */}
              <Grid item xs={2} >
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'revert-layer',
                        fontWeight: 600,
                        // letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      Category
                    </Typography>

              </Grid>
              <Grid item xs={10}><Button variant="outlined" color="secondary">   {category} </Button> </Grid>

              {/* 4th row */}
              <Grid item xs={2} >
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'revert-layer',
                        fontWeight: 600,
                        // letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      Tags
                    </Typography>

              </Grid>
              <Grid item xs={10} >{post_info[0].tags.map(tag => getTag(tag))}</Grid>
              
              <Grid item xs={12}>
              {/* <h1> Hello 1234</h1> */}
              </Grid>
              
            </Grid>


            {/* 2nd Column */}
            <Grid container item xs={6} direction="row" >
            <Grid item xs={8}>
              <h1> Header </h1>
              </Grid>
            <Grid item xs={10}>
              <TextField 
                    // sx={{width: 10}}
                    id="filled-multiline-static"
                    label="Add a Comment"
                    multiline
                    // rows={4}
                    defaultValue=""
                    variant="outlined"
                    />
              </Grid>
              
              
              {CommentList.map(comment => getComment(comment))}
              
              <Grid item xs={8}>
              {/* <h1> Hello 1234</h1> */}
              </Grid>
              
            </Grid>
        </Grid>

    {/* etar baire header contianer */}
    </Grid>  
                      
  
  );
}

export default Post;