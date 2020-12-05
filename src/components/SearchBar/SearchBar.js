import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
// @material-ui/core components
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import MobileCustomInput from "components/CustomInput/MobileCustomInput.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle.js";
import Hidden from '@material-ui/core/Hidden';
import axios from "axios";
import { useRouter } from 'next/router'

const useStyles = makeStyles(styles);

export default function CustomizedInputBase() {
  const classes = useStyles();
  const router = useRouter();

  let search;

  const handleChange = e => {
    search=e.target.value;
  }
  return (
    <Paper variant="outlined" style={{alignItems: 'center'}}>
      <Hidden smDown>
      <div style={{alignItems:"center", width:"100%",marginLeft:"20px"}}>
          <CustomInput
            black
            inputRootCustomClasses={classes.inputRootCustomClasses}
            formControlProps={{
              className: classes.formControl
            }}
            inputProps={{
              onChange : (event) => handleChange(event),
              onKeyPress : (ev) => { if (ev.key === 'Enter') {router.push("/search/"+search)}},
              placeholder: "의약품 검색",
              type : "text",
              inputProps: {
                "aria-label": "Search",
                className: classes.searchInput,
              }
            }}
          />
      <Button justIcon round color="white" onClick={ () => { router.push("/search/"+search) }}>
        <Search className={classes.searchIcon} />
      </Button>
      </div>
      </Hidden>
      <Hidden mdUp>
      <div style={{alignItems:"center", width:"100%"}}>
          <MobileCustomInput
            black
            inputRootCustomClasses={classes.inputRootCustomClasses}
            formControlProps={{
              className: classes.formControl
            }}
            inputProps={{
              onChange : (event) => handleChange(event),
              onKeyPress : (ev) => { if (ev.key === 'Enter') {router.push("/search/"+search)}},
              placeholder: "의약품 검색",
              type : "text",
              inputProps: {
                "aria-label": "Search",
                className: classes.searchInput
              }
            }}
          />
      <Button justIcon round color="white" onClick={ () => { router.push("/search/"+search) }}>
        <Search className={classes.searchIcon} />
      </Button>
      </div>
      </Hidden>
    </Paper>
  );
}