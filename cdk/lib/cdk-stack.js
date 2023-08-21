const cdk = require('aws-cdk-lib');
const eb = require('aws-cdk-lib/aws-elasticbeanstalk');
const assets = require('aws-cdk-lib/aws-ecr-assets');
const path = require('path');

class MyEbStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        console.log('Resolved Path:', path.resolve('../../'));

        // Docker image that encapsulates both frontend and server
        const unifiedDockerAsset = new assets.DockerImageAsset(this, 'UnifiedDockerImage', {
            directory: '../../lucky-parking',
        });

        // Create Elastic Beanstalk Application
        const ebApp = new eb.CfnApplication(this, 'MyEBApplication', {
            applicationName: 'LP-EB-app'
        });

        // Add Docker Image as an application version in Elastic Beanstalk
        const ebAppVersion = new eb.CfnApplicationVersion(this, 'AppVersion', {
            applicationName: ebApp.applicationName,
            sourceBundle: {
                s3Bucket: unifiedDockerAsset.imageUri.split(':')[0],
                s3Key: unifiedDockerAsset.imageUri.split(':')[1]
            },
            versionLabel: '1.0.0',
        });

        // Create Elastic Beanstalk Environment
        const unifiedEbEnv = new eb.CfnEnvironment(this, 'UnifiedEnvironment', {
            applicationName: ebApp.applicationName,
            dependsOn: [ebApp],
            solutionStackName: '64bit Amazon Linux 2 v3.6.0 running Docker',
            versionLabel: '1.0.0',
        });
    }
}

module.exports = { MyEbStack };
