const cdk = require('@aws-cdk/core');
const eb = require('@aws-cdk/aws-elasticbeanstalk');
const assets = require('@aws-cdk/aws-s3-assets');

class MyEbStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        // connects to our dockerfile and 
        // deploys to ECR for us. If no
        // ECR repo exists, CDK will create one
        const dockerAsset = new assets.DockerImageAsset(this, 'MyDockerImage', {
            // The path to your Dockerfile
            directory: '../../Dockerfile',  
        });

        const ebEnv = new eb.CfnEnvironment(this, 'Environment', {
            applicationName: 'YourAppName',
            solutionStackName: '64bit Amazon Linux 2 v3.4.4 running Docker',
            versionLabel: dockerAsset.imageUri,
        });
    }
}

module.exports = { MyEbStack };
