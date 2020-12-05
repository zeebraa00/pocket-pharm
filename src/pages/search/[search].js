import React, {useState, useEffect} from "react";
import {useRouter} from 'next/router';
import axios from "axios";
import Header from "components/Header/Header.js";
import Footer from 'components/Footer/Footer.js';
import SearchTable from 'pages/search/SearchTable.js' 
import MobileSearchTable from 'pages/search/MobileSearchTable.js' 
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import SearchBar from 'components/SearchBar/SearchBar.js';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

export default function Search() {
    const router = useRouter();
    const {search} = router.query;

    if (!search) {
        return null;
    }

    const [list, setList] = useState([]);

    const searchDrug = async () => {
        const res = await axios.get(`/rest/product/search/${search}`)
        return res.data
    }
    
    useEffect(()=> {
        const a = async () => {
            try {
                const Drugs = await searchDrug();
                setList(Drugs)
            } catch (e) {
                console.error(e)
            }
        }
        a();
    },[])

    return (
        <React.Fragment>
            <Header
                absolute
                color="white"
                rightLinks={<Button style={{marginRight:"0px"}} variant="text" onClick={()=>router.push('/')}>HOME</Button>}
                brand="포켓약국"
            />
            <br /><br /><br /><br /><br />
            <GridContainer>
                <GridItem xs={1} md={3}></GridItem>
                <GridItem xs={10} md={6}>
                <SearchBar />
                </GridItem>
                <GridItem xs={1} md={3}></GridItem>
            </GridContainer>
            <br />
            <Hidden smDown>
                <GridContainer>
                    <GridItem xs={1} md={3}></GridItem>
                    <GridItem xs={10} md={6}>
                    <SearchTable list={list} />
                    </GridItem>
                    <GridItem xs={1} md={3}></GridItem>
                </GridContainer>
            </Hidden>
            <Hidden mdUp>
                <GridContainer>
                    <GridItem xs={1} md={3}></GridItem>
                    <GridItem xs={10} md={6}>
                    <MobileSearchTable list={list} />
                    </GridItem>
                    <GridItem xs={1} md={3}></GridItem>
                </GridContainer>
            </Hidden>
            <br /><br />
            <Footer />
        </React.Fragment>
    )
}