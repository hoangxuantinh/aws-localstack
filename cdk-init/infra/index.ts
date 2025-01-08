import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Cors, LambdaRestApi, RestApi } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class FirstStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // example resource
    const bucket = new s3.Bucket(this, "MyFirstBucket", {
      bucketName: "upload",
    });

    const lambda = new NodejsFunction(this, 'MyFunction', {
      entry: '../app/server.js',
      handler: 'handle', 
    });

    const api = new LambdaRestApi(this, 'MyApi', {
      handler: lambda,
      proxy: true,
    });

    new cdk.CfnOutput(this, "BucketNameOutput", {
      value: bucket.bucketName,
    });
  }
}

const app = new cdk.App();

new FirstStack(app, "firstStack", {});
