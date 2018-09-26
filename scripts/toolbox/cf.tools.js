const YAML = require('yamljs');
const { CloudFormation } = require('aws-sdk');

const cf = new CloudFormation();

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

module.exports.getParametersForTemplate = async (templateName='') => {

};
