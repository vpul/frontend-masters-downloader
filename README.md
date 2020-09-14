## Frontend Masters Course Downloader
CLI app to download frontend masters course

![Screenshot](https://i.imgur.com/BujvJT2.png)

### Prerequisites

Make sure you have node and npm installed on your system by running the following in the terminal.

```sh
$ node -v && npm -v
```

If you don't have it already installed, you may download and install node from [https://nodejs.org](https://nodejs.org)

### Installation

1. Clone the repo

```sh
git clone https://github.com/vpul/frontend-masters-downloader
```

2. Change to the project directory

```sh
cd frontend-masters-downloader
```

3. Install NPM packages

```sh
npm install
```

### Usage
- Use [EditThisCookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=en) or something similar to export cookies to a plaintext file.
- Now, to download a course use the following command

```sh
node index.js --courseurl <course url to download> --cookiefile <path to your cookie file>
```

For example, 
```sh
node index.js --courseurl "https://frontendmasters.com/courses/serverless-aws" --cookiefile "cookie.txt"
```

- By default, 720p videos will be downloaded. You can use '--resolution' flag to specify other resolution.



Note: This script downloads only one video every 10 minutes to avoid rate-limit.