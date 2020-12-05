import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";
import { useRouter } from "next/router";
import axios from 'axios';

const useStyles = makeStyles(styles);

export default function IntroHeaderLink({auth}) {
  const classes = useStyles();
  const router = useRouter()
  
  const logOut = () => {
    axios.post('/rest/user/logout');
    router.push('/');
  }
  return (
    <List className={classes.list}>
        <ListItem className={classes.listItem}>
        { !auth ? 
        <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
        > 
            <Link href="/login">Login</Link> 
        </Button> : 
        <Button
        color="transparent"
        target="_blank"
        className={classes.navLink}
        onClick={logOut}
        > 
            Logout
        </Button>  
        }
        </ListItem>
    </List>
  );
}
