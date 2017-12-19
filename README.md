# Simple AWS SAM Sample

Super simple AWS SAM sample template. Call Lambda function through (public) Gateway API

## Install Command Line Tool

http://docs.aws.amazon.com/cli/latest/userguide/installing.html

If you use python version 2.6.6 earlier, you might have to install 2.7.x higher. 

If you don't have pip, also install it
https://pip.pypa.io/en/stable/installing/


## Set up AWS user
### Add a new user
1. Open https://console.aws.amazon.com/iam/home#/users
2. Add a new user, check 'Programmatic access' to use Access Key and Secret Key
3. Click 'Next: Review' button
4. Click 'Create user' button (ignore 'This user has no permission' warning, we'll add a inline poly later)
5. Get access key and secret key

### Add a new profile
1. Open aws command line tool config `open ~/aws/config`
2. Add your access key and secret key like the following (change your region)
```
[profile sam]
region = ap-northeast-1
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### Apply an inline policy to the AWS user
1. Open https://console.aws.amazon.com/iam/home#/users
2. Select AWS user you use
3. click 'Add inline policy' link at the right bottom side of screen
4. Select 'Custom Policy' radio box and push Select button
5. Add Policy Name as you like, copy policy document from role_policy.yaml and paste it
6. Click 'Attach policy' button

## Use SAM Template
### Create a new bucket for uploading SAM resource
```aws s3 mb s3://<bucket name> --profile sam```

You should change `<bucket name>` part to your bucket name. You have to use an unique bucket key in your region.

### Clone source code and Upload SAM resouces to S3
```
git clone git@github.com:memolog/simple-aws-sam-template.git
cd ./simple-aws-sam-template
aws cloudformation package --template-file template.yaml --output-template-file output-template.yaml --s3-bucket <bucket name> --profile sam
```

You also need to change `<bucket name>` part to your bucket name.
If you upload SAM resouce to S3 successfully, you can see `output-template.yaml` in the directory

### Deploy SAM
```
cd ./simple-aws-sam-template
aws cloudformation deploy --template-file output-template.yaml --stack-name simple-aws-sam --profile sam --capabilities CAPABILITY_IAM
```

You can see the newly created stack in https://ap-northeast-1.console.aws.amazon.com/cloudformation/home#/stacks?filter=active

### Test Lambda function
#### Test in Getway API console
1. Open https://ap-northeast-1.console.aws.amazon.com/cloudformation/home#/stacks?filter=active
2. Click the stack you created
3. Toggle Resources and click 'ServerlessRestApi' Phisical ID (like `19cwa16e8e`)
4. Click 'Resources' tab
5. Click 'GET' link in the Resouce tree
6. Click 'TEST' link in the Client box
7. Click 'Test' button at the right bottom side of screen

You can get 'Hello World' in the response body area

#### Test in public Gateway API
1. Open https://ap-northeast-1.console.aws.amazon.com/cloudformation/home#/stacks?filter=active
2. Click the stack you created
3. Toggle Resources and click 'ServerlessRestApi' Phisical ID (like `19cwa16e8e`)
4. Click 'Stages' tab
5. Open 'Prod' toggle, and click 'GET' link
6. Click 'Invoke URL' link

You can see 'Hello World' text in the page
