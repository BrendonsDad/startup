# Storage Services
Web applications commonly need to store fiels associated with the application or the user of the appliaction. This includes files such as images, user uploads, documents, and movies. Files usually have an ID, some metadata, and and the bytes representing the file itself. These can be stored using a database service but usually that is overkill and a simpler solutionwill be cheaper. 

It might be tempting to store files directly on your server. This is usally a bad idea for several reasons.

1. Your server has limited drive space. If your server runs out of drive space your entire application will fail. 
2. You should consider your server as being ephemeral, or temporary. It can be thrown away and replaced by a copy at any time. If you start storing fiels on the server, then your server has state that cannot be easily replaced. 
3. You need backup compies of your application and user files. if you only have one copy of your files on your server, then they will disappear when your server disappears, and you must always assume that your server will disappear. 

Here is a table of major cloud storage providers that offer programmatic access, including links to their documentation, information about their friee tiers and the ammount of storage.

amazon s3 - 5 gb for 12 months
google cloud storage 5gb
microsoft azure storage 5gb for 12 months


### AWS S3
Since we are already using AWS for this course, lets take a closer look at AWS S3. S3 provides the following advantages.
1. It has unlimited capacity
2. You only pay for the storage that you use
3. it is optimized for global access
4. it keeps multiploe redundant copies of every file
5. you can version the files
6. it is performant
7. it supports metadata tags
8. youcan make your files publicly available directly from s3
9. you can keep your fiels private and only accessible to your application. 

Generally the steps you need to take include
1. Creating a S3 bucket to store your data in
2. getting credentials so that your application can access the bucket.
3. Using the credentials in your application
4. Using sdk to write, list, read, and delete fiels from the bucket. 


#### Example S3 usage
As a simple example that uses S3, you first need to install the AWS packages

```bash
npm install @aws-sdk/client-s3 @aws-sdk/credential-providers
```

##### Getting credentials
next you need to obtain your aws credentials that allow you to access S3. When you are running in your production environment, you can change the role that your s3 server is runing under to allow s3 access. When you are running from your developmetn environment, you need to obtain aws access keys and store them in the ~/.aws/credentials files. you can write values to the credentials fiel using the aws cli with the following command

```bash
aws configure
```

