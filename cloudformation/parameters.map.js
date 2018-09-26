const { generate } = require('generate-password');

module.exports = {
  templates: [
    {
      templateName: 'rds.cluster.yml',
      parameters: [
        {
          ParameterKey: 'Env',
          ParameterValue: process.env.CIRCLE_BRANCH || 'local'
        },
        {
          ParameterKey: 'Usename',
          ParameterValue: process.env.DB_MASTER_USERNAME || generate({ length: 10, numbers: true })
        },
        {
          ParameterKey: 'Password',
          ParameterValue: process.env.DB_MASTER_PASSWORD || generate({ length: 10, numbers: true })
        }
      ]
    }
  ]
};
