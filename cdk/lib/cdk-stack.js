const cdk = require('@aws-cdk/core');
const eb = require('@aws-cdk/aws-elasticbeanstalk');
const assets = require('@aws-cdk/aws-s3-assets');

class MyEbStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        // Docker image for the server
        const serverDockerAsset = new assets.DockerImageAsset(this, 'ServerDockerImage', {
            directory: './server', 
        });

        // Docker image for React
        const reactDockerAsset = new assets.DockerImageAsset(this, 'ReactDockerImage', {
            directory: './client',
        });

        // EB environment for the server
        const serverEbEnv = new eb.CfnEnvironment(this, 'ServerEnvironment', {
            applicationName: 'YourServerAppName',
            solutionStackName: '64bit Amazon Linux 2 v3.4.4 running Docker',
            versionLabel: serverDockerAsset.imageUri,
        });

        // EB environment for React
        const reactEbEnv = new eb.CfnEnvironment(this, 'ReactEnvironment', {
            applicationName: 'YourReactAppName',
            solutionStackName: '64bit Amazon Linux 2 v3.4.4 running Docker',
            versionLabel: reactDockerAsset.imageUri,
        });
    }
}

module.exports = { MyEbStack };
