const cdk = require('aws-cdk-lib');
const eb = require('aws-cdk-lib/aws-elasticbeanstalk');
const ecr = require('aws-cdk-lib/aws-ecr');
const assets = require('aws-cdk-lib/aws-ecr-assets');

class MyEbStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Docker image asset
    const dockerAsset = new assets.DockerImageAsset(this, 'MyDockerImageAsset', {
      directory: '../../lucky-parking',
    });

    // Elastic Beanstalk application
    const ebApp = new eb.CfnApplication(this, 'MyEBApplication', {
      applicationName: 'MyEBApp',
    });

    const ebEnv = new eb.CfnEnvironment(this, 'MyEBEnvironment', {
        applicationName: ebApp.applicationName,
        solutionStackName: '64bit Amazon Linux 2 v3.6.0 running Docker',
        optionSettings: [
          {
            namespace: 'aws:elasticbeanstalk:application:environment',
            optionName: 'DOCKER_IMAGE_URI',
            value: dockerAsset.imageUri,
          },
        ],
      });
  }
}

module.exports = { MyEbStack };
