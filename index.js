const fs = require('fs');
const { argv } = require('yargs');
const { axiosSetCookie, limiter } = require('./utils/throttler');
const makeDirectory = require('./utils/makeDirectory');
const sanitizeFilename = require('./utils/filenameSanitizer');
const download = require('./utils/downloader');

const cookie = fs.readFileSync(argv.cookiefile, 'utf8');
const resolution = argv.resolution || '720';

const axiosWrapper = axiosSetCookie(cookie); // create an axios wrapper with the provided cookie
const throttledAxios = limiter.wrap(axiosWrapper); // use the axios wrapper in the limiter to create throttled axios

const slug = argv.courseurl.split('/courses/')[1];

(async () => {
  const { data: course } = await throttledAxios(`https://api.frontendmasters.com/v1/kabuki/courses/${slug}`);
  course.title = sanitizeFilename(course.title);
  makeDirectory(course.title);
  const unit = {
    index: 0,
  };

  const lesson = {};
  for (let element of course.lessonElements) {
    try {
      if (typeof (element) === 'string') {
        unit.name = sanitizeFilename(element);
        unit.index++;
        lesson.index = 0;
        lesson.directory = `${course.title}/${unit.index}. ${unit.name}`;
        makeDirectory(lesson.directory);
      } else {
        lesson.index++;
        const lessonHash = course.lessonHashes[element];
        const sourceURL = `https://api.frontendmasters.com/v1/kabuki/video/${lessonHash}/source?r=${resolution}&f=webm`;
        const { data: videoSource } = await throttledAxios(sourceURL);
        lesson.title = sanitizeFilename(course.lessonData[lessonHash].title);
        lesson.fileName = `${unit.index}.${lesson.index} ${lesson.title}`;
        download(videoSource.url, `${lesson.directory}/${lesson.fileName}.webm`, throttledAxios);
      }
    } catch (err) {
      console.error(err);
    }
  }
})();
