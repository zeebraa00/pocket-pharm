const withAuthentication = (WrappedComponent) =>{
  return (props) =>{
    return <WrappedComponent {...props} />
  }
}

withAuthentication.AuthCheck = async(level,ctx) => {
  const res = {
    user: {},
  };

  if (ctx.req.session.user) {
    res.user.result = true;
    res.user.level = ctx.req.session.user.level;
    
    if(ctx.req.session.user.level > level){
      //권한이 더 낮은 경우
      ctx.res.redirect('/');
    } 
  } else {
    ctx.res.redirect('/login');
  }

  return res
}

export default withAuthentication