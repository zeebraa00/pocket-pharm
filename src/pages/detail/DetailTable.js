import React, {useState, useEffect} from "react";
import axios from "axios";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider ,createMuiTheme } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";

import imageNone from "assets/img/no_image.png";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  pagenation: {
    'marginTop':'20px',
    '& > *':{
      'justify-content' : 'center'
    },
  }
});

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Do Hyeon",
      "sans-serif"
    ]
  },
});

function SearchTable({data}) {
    const tableClasses = useRowStyles();

    function getBase64(url, cb) {
      axios.get(url).then(result => cb(result.data));
    }

    // let imageLink = null;
    const [imageLink, setImageLink] = useState(null);
    useEffect(() => {
      if (data.img_link=='no_image') {
        setImageLink(<TableCell align="center"><img src={imageNone} style={{maxWidth:"100%"}} alt="no image" /></TableCell>)
      }
      else {
        const type = data.img_link.slice(0,-2).match(/(jpg|png|jpeg|gif|webp)/)[1] || 'jpg';
        axios.get(`/rest/product/image?baseurl=${data.img_link.slice(0,-2)}`)
        .then(result => {
          console.log(result.data.slice(0,50))
          setImageLink(<TableCell align="center"><img src={`data:image/${type};base64,${result.data}`} style={{maxWidth:"100%"}} /></TableCell>)
        })
      }
    }, []);

    return (
        <React.Fragment style={{width:"100%"}}>
            <GridContainer style={{marginBottom:"10px",width:"100%"}}>
                <GridItem>
                    <ThemeProvider theme={theme}>
                        <Typography style={{fontSize:"40px"}}>상세 정보 💊</Typography>
                    </ThemeProvider>
                </GridItem>
            </GridContainer>
            <Table style={{borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
                <TableHead>
                <TableRow className = {tableClasses.root} style={{backgroundColor:"#4caf50",borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
                        <TableCell align="center"><p style={{fontSize:"20px",color:"white"}}>{data.name}</p></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className = {tableClasses.root} key={data.id} style={{borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
                      <TableCell align="center"><p style={{fontSize:"20px"}}>{data.category.split(" > ")[data.category.split(" > ").length - 1]}</p></TableCell>
                    </TableRow>
                    <TableRow className = {tableClasses.root} key={data.id} style={{borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
                      <TableCell align="center"><p style={{fontSize:"20px"}}>{data.element}</p></TableCell>
                    </TableRow>
                    <TableRow className = {tableClasses.root} key={data.id} style={{borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>    
                      <TableCell align="center"><p style={{fontSize:"20px"}}>{data.effect}</p></TableCell>
                    </TableRow>
                    <TableRow className = {tableClasses.root} key={data.id} style={{borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>  
                      {imageLink}
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default SearchTable;