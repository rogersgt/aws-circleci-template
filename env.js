const fs = require('fs');
const dotenv = require('dotenv');

const LOCAL_DEV_FILE = `${__dirname}/.env`;

const loadEnvFile = (fs.existsSync(LOCAL_DEV_FILE) && process.env.NODE_ENV !== 'production');

if (loadEnvFile) {
  dotenv.config({ path: LOCAL_DEV_FILE });
}

