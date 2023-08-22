const cdk = require('aws-cdk-lib');
const eb = require('aws-cdk-lib/aws-elasticbeanstalk');
const assets = require('aws-cdk-lib/aws-ecr-assets');
const path = require('path');

class MyEbStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        // Docker image that encapsulates both frontend and server
        const unifiedDockerAsset = new assets.DockerImageAsset(this, 'UnifiedDockerImage', {
            directory: '../../lucky-parking',
        });

        // Create Elastic Beanstalk Application
        const ebApp = new eb.CfnApplication(this, 'MyEBApplication', {
            applicationName: 'LP-EB-app'
        });

        const ebAppVersion = new eb.CfnApplicationVersion(this, 'AppVersion', {
            applicationName: ebApp.applicationName,
            sourceBundle: {
                s3Bucket: unifiedDockerAsset.s3BucketName,
                s3Key: unifiedDockerAsset.s3ObjectKey
            },
            versionLabel: '1.0.0',
        });

        // Create Elastic Beanstalk Environment
        const unifiedEbEnv = new eb.CfnEnvironment(this, 'UnifiedEnvironment', {
            applicationName: ebApp.applicationName,
            dependsOn: [ebApp, ebAppVersion],
            solutionStackName: '64bit Amazon Linux 2 v3.6.0 running Docker',
            versionLabel: '1.0.0',
        });
    }
}

module.exports = { MyEbStack };
