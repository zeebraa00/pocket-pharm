import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import Hidden from '@material-ui/core/Hidden';
import MobileElementTable from 'pages/detail/MobileElementTable.js';
import ElementTable from 'pages/detail/ElementTable.js';
import MobileDetailTable from 'pages/detail/MobileDetailTable.js';
import DetailTable from 'pages/detail/DetailTable.js';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(styles);

export default function Detail(props) {
    const router = useRouter();
    const { user, detailData, initialData, ...rest } = props;
    const [list, setList] = useState(
        initialData
    );
    const [data, setData] = useState(
        detailData
    );

    return (
        <div>
            <React.Fragment>
                <Header
                    absolute
                    color="white"
                    rightLinks={<Button style={{marginRight:"0px"}} variant="text" onClick={()=>router.push('/')}>HOME</Button>}
                    brand="포켓약국"
                />
                <br /><br /><br /><br /><br />
                <Hidden smDown>
                    <GridContainer>
                        <GridItem xs={1} md={4}></GridItem>
                        <GridItem xs={10} md={4}>
                        <DetailTable data={data} />
                        </GridItem>
                        <GridItem xs={1} md={4}></GridItem>
                    </GridContainer>
                    <br />
                    <GridContainer>
                        <GridItem xs={1} md={4}></GridItem>
                        <GridItem xs={10} md={4}>
                        <ElementTable list={list} />
                        </GridItem>
                        <GridItem xs={1} md={4}></GridItem>
                    </GridContainer>
                </Hidden>
                <Hidden mdUp>
                    <GridContainer>
                        <GridItem xs={1} md={4}></GridItem>
                        <GridItem xs={10} md={4}>
                        <MobileDetailTable data={data} />
                        </GridItem>
                        <GridItem xs={1} md={4}></GridItem>
                    </GridContainer>
                    <br />
                    <GridContainer>
                        <GridItem xs={1} md={4}></GridItem>
                        <GridItem xs={10} md={4}>
                        <MobileElementTable list={list} />
                        </GridItem>
                        <GridItem xs={1} md={4}></GridItem>
                    </GridContainer>
                </Hidden>
                <br /><br />
                <Footer />
            </React.Fragment>
        </div>
    );
}
