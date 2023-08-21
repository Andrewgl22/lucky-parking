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
            directory: '../../lucky-parking', // this directory should contain a Dockerfile that sets up both frontend and server
        });

        // EB environment for the unified application
        const unifiedEbEnv = new eb.CfnEnvironment(this, 'UnifiedEnvironment', {
            applicationName: 'LP-EB-app',
            solutionStackName: '64bit Amazon Linux 2 v3.6.0 running Docker',
            versionLabel: '1.0.0',
        });
    }
}

module.exports = { MyEbStack };
