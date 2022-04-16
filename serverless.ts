import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'cognito-lambda',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {
    signup: {
      handler: 'src/functions/signup.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'signup',
            cors: true,
          }
        }
      ]
    },
    login: {
      handler: 'src/functions/login.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'login',
            cors: true,
          }
        }
      ]
    },
    confirmRegistration: {
      handler: 'src/functions/confirmRegistration.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'confirmRegistration',
            cors: true,
          }
        }
      ]
    },
    resendConfirmationCode: {
      handler: 'src/functions/resendConfirmationCode.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'resendConfirmationCode',
            cors: true,
          }
        }
      ]
    },
    changePassword: {
      handler: 'src/functions/changePassword.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'changePassword',
            cors: true,
          }
        }
      ]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
