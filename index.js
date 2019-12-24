const fs = require('fs');
const { argv } = require('yargs');
const { axiosSetCookie, limiter } = require('./utils/throttler');
const makeDirectory = require('./utils/makeDirectory');

const cookie = fs.readFileSync(argv.cookiefile, 'utf8');
const resolution = argv.resolution || '720';

const axiosWrapper = axiosSetCookie(cookie); // create an axios wrapper with the provided cookie
const throttledAxios = limiter.wrap(axiosWrapper); // use the axios wrapper in the limiter to create throttled axios

const slug = argv.courseurl.split('/courses/')[1];

(async () => {
  const { data: course } = await throttledAxios(`https://api.frontendmasters.com/v1/kabuki/courses/${slug}`);
  makeDirectory(course.title);
  const unit = {
    index: 0,
  };
  course.lessonElements.forEach(async element => {
    try {
      if (typeof (element) === 'string') {
        unit.name = element;
        unit.index++;
        makeDirectory(`${course.title}/${unit.index}. ${unit.name}`);
      } else {
        const lessonHash = course.lessonHashes[element];
        const sourceURL = `https://api.frontendmasters.com/v1/kabuki/video/${lessonHash}/source?r=${resolution}&f=webm`;
        const videoURL = await throttledAxios(sourceURL);
        console.log(videoURL.data);
      }
    } catch (err) {
      console.error(err);
    }
  });
})();
