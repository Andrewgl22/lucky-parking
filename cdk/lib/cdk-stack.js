const cdk = require('aws-cdk-lib');
const eb = require('aws-cdk-lib/aws-elasticbeanstalk');
const assets = require('@aws-cdk/aws-ecr-assets');

class MyEbStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        // Docker image that encapsulates both frontend and server
        const unifiedDockerAsset = new assets.DockerImageAsset(this, 'UnifiedDockerImage', {
            directory: '../../', // this directory should contain a Dockerfile that sets up both frontend and server
        });

        // EB environment for the unified application
        const unifiedEbEnv = new eb.CfnEnvironment(this, 'UnifiedEnvironment', {
            applicationName: 'LP-EB-app',
            solutionStackName: '64bit Amazon Linux 2 v3.4.4 running Docker',
            versionLabel: unifiedDockerAsset.imageUri,
        });
    }
}

module.exports = { MyEbStack };
