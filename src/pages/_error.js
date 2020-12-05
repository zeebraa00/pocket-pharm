import Router from 'next/router';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const _error = (props) => {
  console.log(props);
  return <div></div>;
};

// _error.getInitialProps = ({ res, err }) => {
//   /*
//   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//   return { statusCode };
//   */
//   if (res) { // server
//     res.writeHead(302, {
//       Location: '/'
//     });
//     res.end();
//   } else { // client
//     Router.push('/');
//   }
// };

export default _error;
