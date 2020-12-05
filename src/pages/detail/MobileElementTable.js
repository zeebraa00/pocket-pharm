import React from "react";
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

export default function SearchTable({list}) {
    const tableClasses = useRowStyles();

    let Bwidth = window.innerWidth;

    const searchList = Array.isArray(list) && list.length > 0  ? (list.map((drug) => 
        <TableRow className = {tableClasses.root} key={drug.id} style={{borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
            <TableCell align="center"><p style={{marginRight:"auto",marginLeft:"auto",textOverflow:"ellipsis",whiteSpace:"nowrap",wordWrap:"normal",width:Bwidth/1.5,overflow:"hidden",align:"center",fontSize:"20px"}}>{drug.name}</p></TableCell>
            {/* <TableCell align="center"><p style={{marginRight:"auto",marginLeft:"auto",textOverflow:"ellipsis",whiteSpace:"nowrap",wordWrap:"normal",width:Bwidth/1.5,overflow:"hidden",align:"center",fontSize:"20px"}}>{drug.category.split(" > ")[drug.category.split(" > ").length - 1]}</p></TableCell> */}
        </TableRow>
    )) : null;
    
    return (
        <React.Fragment style={{width:"100%"}}>
            <GridContainer style={{marginBottom:"10px",width:"100%"}}>
                <GridItem>
                    <ThemeProvider theme={theme}>
                        <Typography style={{fontSize:"30px"}}>대체 가능한 약 👩🏻‍⚕️</Typography>
                    </ThemeProvider>
                </GridItem>
            </GridContainer>
            <Table style={{borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
                <TableHead>
                <TableRow className = {tableClasses.root} style={{backgroundColor:"#4caf50",borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
                        <TableCell align="center"><p style={{fontSize:"20px",color:"white"}}>약품명</p></TableCell>
                        {/* <TableCell align="center"><p style={{fontSize:"20px",color:"white"}}>카테고리</p></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchList}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}