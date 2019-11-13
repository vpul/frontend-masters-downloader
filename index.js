const axios = require('axios');
const { argv } = require('yargs');
const getCookieByLoggingIn = require('./getCookieByLoggingIn');


// cookie = 'intercom-id-w1ukcwje=0302ec84-f0dc-456d-bb9e-36d23cd53215; __stripe_mid=d1b184d7-862b-4409-b814-d67d7ae8f9f4; ajs_user_id=%2240494%22; ajs_group_id=null; ajs_anonymous_id=%22ea4dda62-81a3-4b28-919e-3d5f8dc6ce79%22; intercom-session-w1ukcwje=VmE2WVFZamt1bXh4OXF3SGU2d1dDeDlvTnJzNUR4WHRDTy81WFF3RDY2WHRPWlloMUpFdmJac1JzWTBOK0RkZi0tUVBxbnVtc1QrUSsvZXYvQXpUb1hxZz09--d87e51ca321da3ffdab021d94e817abf09de1be2; edd_wp_session=e29c14d0f16f5a062ad4ad296c0c1c5d%7C%7C1571891177%7C%7C1571889377; wordpress_logged_in_323a64690667409e18476e5932ed231e=vpul.chaudhary_gmail.com%7C1573057577%7CQFGGlj5Plx7ccMhrW79EEFEbVutmLnab9RPWvAHmShO%7C527639494cc596c9d57225ffb89a00fa9cfc693f5f9d7dca5baae820db0e5e34'
getCookieByLoggingIn()





// axios.defaults.headers.cookie = argv.cookie;
// axios.defaults.headers.referer = 'https://frontendmasters.com';

// const slug = argv.courseurl.split('/courses/')[1];

// axios.get(`https://api.frontendmasters.com/v1/kabuki/courses/${slug}`)
//   .then((res) => {
//     console.log(res.data);
//   }).catch((err) => {
//     console.log(err);
//   });

// // axios.get('https://api.frontendmasters.com/v1/kabuki/courses/mongodb')
// // axios.get('https://api.frontendmasters.com/v1/kabuki/video/NCrWTwSgDw/source?r=1080&f=webm')
// //   .then((res) => {
// //     console.log(res.data);
// //   }).catch((err) => {
// //     console.log(err);
// //   });

// // https://api.frontendmasters.com/v1/kabuki/video/NCrWTwSgDw/source?r=1080&f=webm

