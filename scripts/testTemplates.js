require('../env');
const fs = require('fs');
const { CloudFormation } = require('aws-sdk');

const cf = new CloudFormation();

const TEMPLATE_DIR = `${__dirname}/../cloudformation/templates`;

(async function testTemplates() {
  try {
    const templates = fs.readdirSync(TEMPLATE_DIR);

    for (const template of templates) {
      const FULL_PATH = `${TEMPLATE_DIR}/${template}`;
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
