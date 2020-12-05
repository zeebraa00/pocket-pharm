import React from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Fade from "@material-ui/core/Fade";
import Alert from '@material-ui/lab/Alert';
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";
import image from "assets/img/IMG_6349.jpg";
import axios from "axios";
import crypto from "crypto";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  // loginPage.js의 cardHidden class로 애니메이션 적용한 뒤 0.5초 후에 해제 
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const router = useRouter();

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;
  
  const isUser = async () => {
    const res = await axios.get('/rest/product');
    if (res.data.error) {
      return;
    }
    router.push('/');
  }
  isUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target); 
    const response = await axios.post('/rest/user/login', {
      uid: data.get("uid"),
      pw: crypto.createHash("sha512").update(data.get("pw")).digest("hex")
    });
    // console.log(data)
    if(response.data.result == true)
      router.replace('/');
    else {
      setAlertOpen(true);
      setTimeout(() => { setAlertOpen(false); }, 3000);
    }
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="포켓 약국"
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} lg={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h4 style={{fontWeight:"bold"}}>포켓약국</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="아이디"
                      id="uid"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        required: true,
                        name: "uid",
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              assignment_ind_outline
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="비밀번호"
                      id="pw"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        required: true,
                        name: "pw",
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="success" size="md">
                      <Link href="/register">
                        회원가입
                      </Link>
                    </Button>
                    <Button type="submit" color="success" size="md" style={{fontWeight:"bold"}}>
                      로그인
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              <Fade in={alertOpen}>
                <Alert severity="error" elevation={6} variant="filled">
                  아이디 또는 비밀번호가 잘못되었습니다.
                </Alert>
              </Fade>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont style={{marinTop:"-50px"}} />
      </div>
    </div>
  );
}
