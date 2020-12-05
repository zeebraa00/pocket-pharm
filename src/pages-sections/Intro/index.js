import React, {useState, useEffect} from "react";
import IntroHistoryGood from "pages-sections/Intro/IntroHistoryGood.js";
import IntroHistoryBad from "pages-sections/Intro/IntroHistoryBad.js";
import MobileIntroHistoryGood from "pages-sections/Intro/MobileIntroHistoryGood.js";
import MobileIntroHistoryBad from "pages-sections/Intro/MobileIntroHistoryBad.js";
import IntroHeaderLink from "pages-sections/Intro/IntroHeaderLink.js";
import Header from "components/Header/Header.js";
import Footer from 'components/Footer/Footer.js';
import SearchBar from 'components/SearchBar/SearchBar.js';
import Hidden from '@material-ui/core/Hidden';
import axios from "axios";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

export default function Intro(props) {
  const { user } = props;
  const [good, setGood] = useState([]);
  const [bad, setBad] = useState([]);
  
  const fetchData = async() => {
    const res = await axios.get(`/rest/history/good`);
    if(res){
      setGood(res.data);
    }
    const res1 = await axios.get(`/rest/history/bad`);
    if(res1){
      setBad(res1.data);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []); 

  return (
      <React.Fragment>
      <Header
        absolute
        rightLinks={<IntroHeaderLink auth={user.result}/>}
        color="white"
        brand="포켓약국"
      />
      <br /><br /><br /><br /><br />
      <GridContainer>
        <GridItem xs={1} md={2}></GridItem>
        <GridItem xs={10} md={8}>
          <SearchBar />
        </GridItem>
        <GridItem xs={1} md={2}></GridItem>
      </GridContainer>
      <Hidden smDown>
        <GridContainer style={{marginTop:"",marginBottom:"-80px"}}>
          <GridItem md={2}></GridItem>
          <GridItem md={4}>
            <div key="intro_history">
              <IntroHistoryGood user={user} lectures={good} style={{maxWidth:"100%"}}/>
            </div>
          </GridItem>
          <GridItem md={4}>
            <div key="intro_history">
              <IntroHistoryBad user={user} lectures={bad} style={{maxWidth:"100%"}}/>
              {/* <Hidden mdUp><IntroHistoryMobile user={user} lectures={lectures}/></Hidden> */}
            </div>
          </GridItem>
          <GridItem md={2}></GridItem>
        </GridContainer>        
      </Hidden>
      <Hidden mdUp>
        <GridContainer style={{marginTop:"",marginBottom:"-80px"}}>
          <GridItem sm={1}></GridItem>
          <GridItem sm={10}>
            <div key="intro_history">
              <MobileIntroHistoryGood user={user} lectures={good} style={{maxWidth:"100%"}}/>
            </div>
          </GridItem>
          <GridItem sm={1}></GridItem>
        </GridContainer>   
        <GridContainer style={{marginTop:"-80px",marginBottom:"-80px"}}>
          <GridItem sm={1}></GridItem>
          <GridItem sm={10}>
            <div key="intro_history">
              <MobileIntroHistoryBad user={user} lectures={bad} style={{maxWidth:"100%"}}/>
              {/* <Hidden mdUp><IntroHistoryMobile user={user} lectures={lectures}/></Hidden> */}
            </div>
          </GridItem>
          <GridItem sm={1}></GridItem>
        </GridContainer>        
      </Hidden>
      <br />
      <Footer />
      </React.Fragment>
  );
}