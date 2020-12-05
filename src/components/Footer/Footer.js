/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

import styles from "assets/jss/nextjs-material-kit/components/footerStyle.js";
import logo from "assets/img/logo.png"

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div style={{margin: "auto"}}>
        <img src={logo} style={{height: "auto", maxWidth: "3rem"}} alt="logo"/>
        </div>
        <div className={classes.info}>
          <p stype={{fontWeight: "bold"}} className={classes.p}><small>2020년 2학기 종합설계프로젝트 (조형민 교수님)</small></p>
          <p style={{fontWeight: "bold"}} className={classes.p}><small>12조 - 포켓약국 프로젝트</small></p>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
