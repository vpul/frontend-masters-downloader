const fs = require('fs');
const { argv } = require('yargs');
const { axiosSetCookie, limiter } = require('./utils/throttler');
// const getCookieByLoggingIn = require('./getCookieByLoggingIn');

// const cookieJSON = JSON.parse(fs.readFileSync('./cookie.json', 'utf-8'));
// const cookieParse = cookieJSON.filter(element => element.name=);
// console.log(cookieJSON);

// (async () => {
//   //check if cookies.txt exists
//   //if doesn't exist login and get cookies
//   //if exists try using that cookie
//   //if error get fresh cookie by login
// })();
// getCookieByLoggingIn(argv)
const cookie = fs.readFileSync(argv.cookiefile, 'utf8');
const resolution = argv.resolution || '720';

const axiosWrapper = axiosSetCookie(cookie); // create an axios wrapper with the provided cookie
const throttledAxios = limiter.wrap(axiosWrapper); // use the axios wrapper in the limiter to create throttled axios

const slug = argv.courseurl.split('/courses/')[1];

(async () => {
  const { data: course } = await throttledAxios(`https://api.frontendmasters.com/v1/kabuki/courses/${slug}`);
  if (!fs.existsSync(`./${course.title}`)) {
    fs.mkdirSync(`./${course.title}`);
  }

  const unit = {
    index: 0,
  };
  course.lessonElements.forEach(async element => {
    try {
      if (typeof (element) === 'string') {
        unit.name = element;
        unit.index++;
        fs.mkdirSync(`./${course.title}/${unit.index}. ${unit.name}`);
      } else {
        const lessonHash = course.lessonHashes[element];
        console.log(lessonHash);
        const sourceURL = `https://api.frontendmasters.com/v1/kabuki/video/${lessonHash}/source?r=${resolution}&f=webm`;
        const videoURL = await throttledAxios(sourceURL);
        console.log(videoURL.data);
      }
    } catch (err) {
      console.error(err);
    }
  });
})();

// // axios.get('https://api.frontendmasters.com/v1/kabuki/courses/mongodb')
// axios.get('https://api.frontendmasters.com/v1/kabuki/video/HEjgFFooHO/source?r=1080&f=webm')
//   .then((res) => {
//     console.log(res.data);
//   }).catch((err) => {
//     console.log(err);
//   });

// // https://api.frontendmasters.com/v1/kabuki/video/NCrWTwSgDw/source?r=1080&f=webm

