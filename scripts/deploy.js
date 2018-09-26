require('../env');
const fs = require('fs');
const { CloudFormation } = require('aws-sdk');
const { getStackNameFromTemplateName, stackExists } = require('./toolbox/cf.tools');

const cf = new CloudFormation();

const ENVIRONMENT = process.env.CIRCLE_BRANCH || 'local';

(async function deploy() {
  const templates = fs.readdirSync(`${__dirname}/../cloudformation/templates`);

  for (const template of templates) {
    const stackName = getStackNameFromTemplateName(template, ENVIRONMENT);
    const exists = await stackExists(stackName);
    
    if (exists) {
      // update existing stack
    } else {
      // create stack
    }
  }
})();
