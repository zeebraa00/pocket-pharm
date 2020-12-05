import React from "react";
import {useRouter} from 'next/router';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { ThemeProvider ,createMuiTheme } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

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
    const router = useRouter();
    // console.log('list in SearchTable.js', list)
    const tableClasses = useRowStyles();
    
    const addGood = async (id) => {
        const fit = 1;
        const memo = "good";
        const productId = id;
        const response = await axios.post('/rest/history/create',{
            fit,
            memo,
            productId
        });

        if(response.data.result === true)
            alert('추가가 완료되었습니다.');
        else
            alert('처리 도중 오류가 발생했습니다.');
        router.push("/");
    }

    const addBad = async (id) => {
        const fit = 0;
        const memo = "bad";
        const productId = id;
        const response = await axios.post('/rest/history/create',{
            fit,
            memo,
            productId
        });

        if(response.data.result === true)
            alert('추가가 완료되었습니다.');
        else
            alert('처리 도중 오류가 발생했습니다.');
        router.push("/");
    }

    let Bwidth = window.innerWidth;

    const searchList = Array.isArray(list) && list.length > 0  ? (list.map((drug) => 
        <TableRow className = {tableClasses.root} key={drug.id} style={{borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
            <TableCell align="center"><p style={{marginRight:"auto",marginLeft:"auto",textOverflow:"ellipsis",whiteSpace:"nowrap",wordWrap:"normal",width:Bwidth/3,overflow:"hidden",align:"center",fontSize:"20px"}}>{drug.name}</p></TableCell>
            {/* <TableCell align="center"><p style={{marginRight:"auto",marginLeft:"auto",textOverflow:"ellipsis",whiteSpace:"nowrap",wordWrap:"normal",width:Bwidth/6,overflow:"hidden",align:"center",fontSize:"20px"}}>{drug.category.split(" > ")[drug.category.split(" > ").length - 1]}</p></TableCell> */}
            <TableCell align="center"><Button style={{marginRight:"0px"}} color="primary" variant="outlined" onClick={()=>addGood(drug.id)}>Good</Button></TableCell>
            <TableCell align="center"><Button style={{marginRight:"0px"}} color="secondary" variant="outlined" onClick={()=>addBad(drug.id)}>Bad</Button></TableCell>
        </TableRow>
    )) : null;
    return (
        <React.Fragment>
            <GridContainer style={{marginBottom:"10px",width:"100%"}}>
                <GridItem>
                    <ThemeProvider theme={theme}>
                        <Typography style={{fontSize:"40px"}}>의약품 검색결과 💊</Typography>
                    </ThemeProvider>
                </GridItem>
            </GridContainer>
            <Table style={{borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
                <TableHead>
                <TableRow className = {tableClasses.root} style={{backgroundColor:"#4caf50",borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
                    <TableCell align="center"><p style={{fontSize:"20px",color:"white"}}>약품명</p></TableCell>
                    {/* <TableCell align="center"><p style={{fontSize:"20px",color:"white"}}>카테고리</p></TableCell> */}
                    <TableCell align="center"></TableCell> 
                    <TableCell align="center"></TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                    {searchList}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}