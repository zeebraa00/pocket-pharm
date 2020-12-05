import React, { useState } from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Fade from "@material-ui/core/Fade";
import Alert from "@material-ui/lab/Alert";
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

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  // loginPage.js의 cardHidden class로 애니메이션 적용한 뒤 0.5초 후에 해제
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [alert, setAlert] = useState(null);
  const [warning, setWarning] = useState(null);

  const [uid, setUid] = useState();
  const [pw, setPw] = useState();
  const [email, setEmail] = useState();

  const regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("/rest/user/register", {
      uid,
      pw,
      email,
    });

    if (response.data.result == true) {
      Router.push("/login");
    } else {
      // 일단 학번 중복 아니면 일괄적으로 취급
      if (response.data.duplicate) setAlert("동일한 아이디로 이미 가입되어 있습니다.");
      else setAlert("처리 도중 오류가 발생했습니다.");

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="포켓약국"
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} lg={4}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Card className={classes[cardAnimaton]}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h4 style={{fontWeight:"bold"}}>포켓약국 회원가입</h4>
                  </CardHeader>
                  <CardBody>
                    {warning && <Alert severity="warning">{warning}</Alert>}
                    <CustomInput
                      labelText="아이디"
                      id="uid"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        name: "uid",
                        type: "text",
                        onChange: (e) => setUid(e.target.value),
                        endAdornment: (
                          <InputAdornment>
                            <Icon className={classes.inputIconsColor}>assignment_ind_outline</Icon>
                          </InputAdornment>
                        ),
                      }}
                      error={uid && uid.length < 5}
                      helperText="5자리 이상 입력해 주세요"
                    />
                    <CustomInput
                      labelText="비밀번호"
                      id="pw"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        name: "pw",
                        type: "password",
                        onChange: (e) => setPw(e.target.value),
                        endAdornment: (
                          <InputAdornment>
                            <Icon className={classes.inputIconsColor}>lock</Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                      error={pw && pw.length < 8}
                      helperText="8자리 이상 입력해 주세요"
                    />
                    <CustomInput
                      labelText="이메일"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        name: "email",
                        type: "email",
                        onChange: (e) => setEmail(e.target.value),
                        endAdornment: (
                          <InputAdornment>
                            <Icon className={classes.inputIconsColor}>email_outline</Icon>
                          </InputAdornment>
                        ),
                      }}
                      error={email && !regExpEmail.test(email)}
                      helperText="이메일 형식을 확인해주세요"
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button className={classes.submitButton} type="submit" color="success" size="md" style={{fontWeight:"bold"}}>
                      회원가입
                    </Button>
                  </CardFooter>
                </Card>
              </form>
              <Fade in={alert}>
                <Alert severity="error" elevation={6} variant="filled">
                  {alert}
                </Alert>
              </Fade>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
