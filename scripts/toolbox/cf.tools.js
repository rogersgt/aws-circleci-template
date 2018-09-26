const fs = require('fs');
const { CloudFormation } = require('aws-sdk');
const { templates:paramMappings } = require('../../cloudformation/parameters.map');

const cf = new CloudFormation();
const TEMPLATE_DIR = `${__dirname}/../../cloudformation/templates`;

module.exports.createStack = async (stackName, params=[], templateName) => {
  const createResp = await cf.createStack({
    TemplateBody: fs.readFileSync(`${TEMPLATE_DIR}/${templateName}`, 'utf-8'),
    StackName: stackName,
    Parameters: params,
    Capabilities: ['CAPABILITY_NAMED_IAM', 'CAPABILITY_IAM']
  }).promise();
  console.log(createResp);
  await cf.waitFor('stackExists', { StackName: stackName }).promise();
  console.log(`Finished creating: ${stackName}`);
};

module.exports.getParametersForTemplate = async (templateName='') => {
  const paramMap = paramMappings.find((m) => m.templateName === templateName);
  if (!!paramMap && paramMap.parameters.length > 0) {
    return paramMap;
  }
  return null;
};

module.exports.getStackNameFromTemplateName = (templateName='', env='') => {
  // Requires templates to be in the form <aws service>.<name>.yml
  const arr = templateName.split('.');
  return `${arr[0]}-${arr[1]}-${env}`;
};

module.exports.stackExists = async (stackName='') => {
  try {
    const params = { StackName: stackName };
    const { Stacks: stacks } = await cf.describeStacks(params).promise();
    return stacks.length > 0;
  } catch (error) {
    if (error && error.message) {
      if (error.message === `Stack with id ${stackName} does not exist`) {
        return false;
      }
      throw error;
    }
  }
};

module.exports.updateStack = async (stackName, params, templateName) => {
  try {
    const updateParams = {
      StackName: stackName,
      Parameters: params,
      TemplateBody: fs.readFileSync(`${TEMPLATE_DIR}/${templateName}`, 'utf-8'),
      Capabilities: ['CAPABILITY_NAMED_IAM', 'CAPABILITY_IAM']
    };
    const updateResp = await cf.updateStack(updateParams).promise();
    console.log(updateResp);
    await cf.waitFor('stackUpdateComplete', { StackName: stackName }).promise();
    console.log(`Finished updating: ${stackName}`);
  } catch (error) {
    if (error && error.message && error.message === 'No updates are to be performed.') {
      return true;
    }
    throw error;
  }
};
