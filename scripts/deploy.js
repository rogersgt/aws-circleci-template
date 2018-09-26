require('../env');
const fs = require('fs');
const {
  getParametersForTemplate,
  getStackNameFromTemplateName,
  stackExists,
  createStack,
  updateStack
} = require('./toolbox/cf.tools');


const ENVIRONMENT = process.env.CIRCLE_BRANCH || 'local';

(async function deploy() {
  try {
    const templates = fs.readdirSync(`${__dirname}/../cloudformation/templates`);

    for (const template of templates) {
      const stackName = getStackNameFromTemplateName(template, ENVIRONMENT);
      const params = getParametersForTemplate(template);
      const exists = await stackExists(stackName);
    
      if (exists) {
        await updateStack(stackName, params, template);
      } else {
        await createStack(stackName, params, template);
      }
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
