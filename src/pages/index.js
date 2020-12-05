import React from "react";
import axios from "axios";
import Intro from "pages-sections/Intro";
import withAuthentication from "hoc/AuthCheck";

function Index({ user, res }) {
  return (
    <React.Fragment>
      <Intro user={user} />
    </React.Fragment>
  );
}

export const getServerSideProps = async (ctx) => {
  const props = await withAuthentication.AuthCheck(3, ctx);
  try{
    const response = await axios.get('/rest/history/good', {
      headers: {
        Cookie: ctx.req.headers.cookie,
      },
    });
    // console.log(response.data)
    props.res = response.data;
  }
  catch(e){
    if(e.response.status >= 500){
      console.error(e);
    }
    ctx.res.redirect('/login')
  }
  return {
    props,
  };
};
export default withAuthentication(Index);
