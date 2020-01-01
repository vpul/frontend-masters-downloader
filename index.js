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

// read download.log and return download session
const readDownloadLog = () => {
  try {
    if (fs.existsSync(`${__dirname}/download.log`)) {
      const downloadSession = fs.readFileSync(`${__dirname}/download.log`, 'utf8');
      return JSON.parse(downloadSession);
    }
    return {};
  } catch (err) {
    console.error('Error reading \'download.log\' file\n' + err);
  }

};

(async () => {
  const downloadSession = readDownloadLog();
  if (downloadSession[slug] === undefined) downloadSession[slug] = [];
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
        lesson.title = sanitizeFilename(course.lessonData[lessonHash].title);
        lesson.fileName = `${unit.index}.${lesson.index} ${lesson.title}`;
        // if video file already exists and download.log contains the video hash, skip download
        const videoFileExists = fs.existsSync(`${__dirname}/${lesson.directory}/${lesson.fileName}.webm`);
        if (downloadSession[slug].includes(lessonHash) && videoFileExists) continue;
        const sourceURL = `https://api.frontendmasters.com/v1/kabuki/video/${lessonHash}/source?r=${resolution}&f=webm`;
        const { data: videoSource } = await throttledAxios(sourceURL);
        await download(videoSource.url, `${lesson.directory}/${lesson.fileName}.webm`, throttledAxios);
        downloadSession[slug].push(lessonHash);
        fs.writeFileSync('download.log', JSON.stringify(downloadSession));
      }
    } catch (err) {
      console.error(err);
    }
  }
})();
