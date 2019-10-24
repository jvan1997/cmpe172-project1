## jonathan-van.com aka, my project 1 for cmpe172

This project is hosted from an S3 Bucket, sped up by CloudFront, and uses the S3 Bucket to host files, AWS Cognito for user management and DynamoDb to link users to file upload.
The domain is managed on Route53, Logged by CloudFront, and uses a Serverless Stack with Lambda functions to perform calls. (Ec2 didn't work for me)
### Video Demo of the application

(Link to Video: TBD )


## Running the application

Navigate to www.jonathan-van.com or jonathan-van.com

## Code Structure

### Top level File layout

    .
    ├── build                           # Build to deploy to S3
    ├── node_modules                    # The node module dependencies
    ├── public                          # Public files
    ├── netlify.toml                    # To deploy the front end to netlfify for testing
    ├── src                             # Source files
    ├── tailwind.js                     # Tailwind js used to create tailwind.css/index.css
    ├── package.json                    # List of dependencies
    ├── LICENSE
    └── README.md

### src Folder layout

    .
    ├── ...
    ├── src                             
    │   ├── components                   # Contains Files
    │   ├── Styles                       # Contains CSS
    └── ...

### Important Files
    .
    ├── ...
    ├── src  
    │    ├── components 
    │    │    │   ├── App.js                        # Routing for all the pages + Bar
    │    │    │   ├── create-post.js                # Create and upload a post
    │    │    │   ├── error.js                      # Error page
    │    │    │   ├── load-posts.js                 # Loads all the posts of the user or admin
    │    │    │   ├── register-user.js              # Registers the user
    │    │    │   ├── view-posts.js                 # View a specific post
    └────────────────────── ...

### User Registration
User registration is managed by AWS Cognito, and requires the user to input an email, password, first name, last name, and if they want to be an administrator, an administrator password.
### Custom Login
User Login is managed by AWS Cognito S.T. it will verify the user and return a session token, as well as the current Cognito User.
### FB, Google Login
Did not add this due to being unable to retrieve the user's name, even after getting it back from a promise, it kept saying the Window.FB object did not exist even though... it should've rendered?
### File Upload
When a user creates a posting, they will have the ability to upload a file as well. The file uploading will happen first, and it gets back a key which will be stored with this post's information in DynamoDB so it will be referenced for later.
### File Download
When a user wants to view their own files/the administrator wants to view their files, they can open the listing and then download the file. This uses cloudfront to download the file.
### Database Updates
When a user wants to edit their posting, or creates a new posting, they will have the information either inserted, deleted or edited into the DynamoDB.
### File Edit
When a user wants to edit their posting, they can choose to edit. Admin cannot edit, only view and delete. Anyway, they can change the name, title, lastname, description, and the file that is attached 
### File Delete
When a user wants to delete their posting they own, they can select and delete it.
### R53
The static website is processed via cloudfront, to which it has access to WWW, and that cloudfront is given a domain name jonathan-van.com which I paid 12 dollars for.
### ELB
### S3, CF
I run a static website on S3 that uses cloud front to host make it faster, as well as cloudfront to download the files
### Lambda
All the CRUD functionalities I have are lambda functions, each with their own cloud watch, so if I attach a console.log() to them, it'll show on the logs.
### SNS, Cloudwatch
Cloud Watch is implemented for the lambda functions
### DR Measures
There are backups in case for version control, and I attempted to do multiple regions for this, but I'm not sure how to do it for lambda.
### Highly Available Solution (Multi AZ Replication)
They exist (different api lambdas for another region us-east-1) but they do not work. If I were to be able to implement this, I will would multiple lambda functions in different regions, with supporting S3, DynamoDB, Cognitos that sync up with each other. I did attempt to create other regional versions of the databases, buckets, and apis.
### Highly Scalable (Autoscale Group)
I set it so that the database
### GitHub, AWS Codestar, Code commit, others
10.0 pts
### CI/CD
Okay so it's weird, I've been testing and deploying the front end to netlify at first, but since I'm doing it on bucket, I guess what I could do is have the entire netlify to be the development stage, and then afterwards just put it on the S3 with version control so I can revert whenever I want.
For backend, similar thing, I'm using Seed to deploy and update the lambda functions, they have a testing and production setting too.
### Admin Panel
I have an administrative login which will see the list of all files, choose and be redirected to a page containing them,
### UI, Documentation, Video, AWS Resoucre Config
I did not bother doing UI, this is the bare minimum for me. This README.md is my attempt at documentation.
### Configuration Explanation 
I did everything on the website so..

#### S3: 
I made it private when users upload their files, so only they can access it. Except for the Admin, they use a CloudFront access to view any image/file.

#### DynamoDB: 
Has a userId and fileId as the primary and sort keys. It has other columns like createdAt, updatedAt, firstname,lastname,title,content,attachment.

#### Lambda: 
##### Each lambda function does either: 
######   read a file as a user, 
######   list all the files as user,
######   create files as a user,
######   edit files as user,
######   delete files as user,
######   read a file as an admin, or
######   list all files as an admin.

#### Cognito: 
I use cognito as the user managment system, they have other attributes like firstname, familyname and profile (which I use to discern users from admins).
#### CloudWatch:
Each Lambda Function in the API has their own cloud watch.

#### R53:
Connected the CloudFront URL from the S3 to the Domain that we got with R53.

#### CloudFront:
Used to get files, speed up the website/bucket, and use an agent to retrieve files regardless of privacy because we gave it origin access permissions.

