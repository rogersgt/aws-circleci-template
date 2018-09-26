require('../env');
const fs = require('fs');
const { CloudFormation } = require('aws-sdk');

const cf = new CloudFormation();

(async function testTemplates() {
  try {
    const templates = fs.readdirSync(`${__dirname}/../cloudformation/templates`);

    for (const template of templates) {
      const FULL_PATH = `${__dirname}/../cloudformation/${template}`;
      const validateParams = {
        TemplateBody: fs.readFileSync(FULL_PATH, 'utf-8')
      };
      await cf.validateTemplate(validateParams).promise();
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
