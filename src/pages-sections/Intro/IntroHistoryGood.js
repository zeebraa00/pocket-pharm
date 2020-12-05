import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/typographyStyle.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ThemeProvider ,createMuiTheme } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import axios from 'axios';

const useStyles = makeStyles(styles);

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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function IntroHistory({ user, lectures }) {
  const tableClasses = useRowStyles();
  const classes = useStyles();

  const router = useRouter();

  const pageNum = 8;
  
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const deleteDrug = async (id) => {
    try {
      await axios.delete(`/rest/history/${id}`)
      alert('삭제되었습니다.');
      window.location.reload(true);
    } catch (e) {
      alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
    }
  }

  let max = maxPage;
  let Bwidth = window.innerWidth;

  useEffect(()=>{
    setMaxPage(parseInt(Math.ceil(lectures.length/pageNum)));
  }, [lectures])

  return (
    <React.Fragment>
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="history">
          <div className={classes.title}>
            <React.Fragment style={{width:"100%"}}>
              <GridContainer style={{marginBottom:"10px",width:"100%"}}>
                <GridItem>
                  <ThemeProvider theme={theme}>
                    <Typography style={{fontSize:"30px"}}>나에게 잘 맞는 약 😊</Typography>
                  </ThemeProvider>
                </GridItem>
              </GridContainer>
              <Table style={{borderStyle:"solid",borderWidth:"0.1px",borderColor:"#DBDBDB",width:"100%"}}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">약종류</StyledTableCell>
                    <StyledTableCell align="center">약품명</StyledTableCell>
                    {/* <StyledTableCell align="center">제약회사</StyledTableCell> */}
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { lectures.map(
                  (lec, index, arr) => {
                    if(index===arr.length-1) max = arr.length;
                    const category_split = lec.product.category.split(" > ");
                    const category_content = category_split[category_split.length - 1];
                    return( <TableRow key={lec.id} className = {tableClasses.root} style={{backgroundColor:"#FFFFFF"}}>
                              <TableCell align="center"> <p style={{textOverflow:"ellipsis",whiteSpace:"nowrap",wordWrap:"normal",width:Bwidth/15 ,overflow:"hidden"}}>{category_content}</p> </TableCell>
                              <TableCell align="center"> <p style={{textOverflow:"ellipsis",whiteSpace:"nowrap",wordWrap:"normal",width:Bwidth/15,overflow:"hidden"}}>{lec.product.name}</p> </TableCell>
                              {/* <TableCell align="center"> {lec.product.company} </TableCell> */}
                              <TableCell align="center"> 
                                <Button style={{marginRight:"0px"}} color="primary" variant="outlined" onClick={ () => router.push(`/detail/${lec.product.id}`)}>상세</Button>
                              </TableCell>
                              <TableCell align="center"> 
                                <Button style={{marginRight:"0px"}} color="secondary" variant="outlined" onClick={() => { deleteDrug(lec.id) }}>삭제</Button>
                              </TableCell>
                            </TableRow> )}).slice(pageNum*(page-1), pageNum*page) }
                </TableBody>
              </Table>
            </React.Fragment>
          </div>
        </div>
        <div className={classes.space50} />
      </div>
    </div>
    </React.Fragment>
  );
}
