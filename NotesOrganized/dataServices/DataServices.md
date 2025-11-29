# Data Services
Web applications commonly nee to store application and user data persistently. The data can be many things, but it is usally representation of complex interralated object. This includes things like a user profiel, organizational structure, gameplay information, usage history, billing information, peer relationship, library catalog, and so forth. 

Historically, SQL databases have served as the general pupose data service solution, but starting around 2010, specialty data services that better support documetn, graph, json, time, sequence, and key value pair data began to take significant roles in applications from major companies. These data services are often called nosql solutions becase they do not use the general pupose relational database paradigms popularized by sql databases. howwever they all have very different underlying data structures, strengths, and weaknesses. That means that you should not simply split all of the possible data services into two narrowly defined boxes, sql and no sql when you are considering the right data service for yourapp,


### MongoDB
For the projects in this course that require data services, we will use mongoDB. Mongo increases developer productivity by using json objects as its core data model. This makes it easy to have an app that uses json from the top to the bottom of the technology stack. a mongo database is made up of one or more collections that each contain json documents. you can think of a collection as a large array of javascript objects, each with a unique id. The following is a sample of a collection of houses that are for rent. 

Unlinke relational databases that require a rigid table definition where each column must be strictly typed and defined before hand, mongo has no strict schema requirements. Each document in the collection usually follows a similar scheme, but each document may have speciaized fields that are present and coomon fields that re missing. This allows the schema of a collection to morph organically as the data model doesnt match the query criteria when the field is referenced. 

The query syntax for mongo also follow a javascript inspired flavor. consider the following queries on the houses for rent collection that was shown above. 

```js
// find all houses
db.house.find()

// find houses with two or more bedrooms
db.house.find({ beds: {$gte: 2} });

// find houses that are available with less than three beds
db.house.find({ status: 'available', beds: { $lt: 3 } });

// find houses with either less than three beds or less than $1000 a night
db.house.find({ $or: [(beds: { $lt: 3 }), (price: { $lt: 1000})] });

//find house with the text 'modern' or 'beach' in the summary
db.house.find({ summary: /(modern|beach)/i });
```
### Mongo DB Atlas
All of the major cloud providers offer multiple data services. For this class we will use the data service provided by mongodb called atlas. no credit card or payment is required to set up and use atlas as long s you stick to the shared cluster environment. 
1. Create your account
2. create a database cluster
3. create your root database user credentials. Remember these for later use.
4. Set network access to your database to be available from anywhere. 
5. Copy the connection string and use the information in your code
6. save the connection and credential info in your production and dev environment as instructed above. 

you can always find the connection string to your atlas cluster by pressing the connect button from your database > dataservices view.

### Keeping your keys out of your code
you need to protect your credentials for connecting to your mongo database. one common mistake is to check them into your code and then post it to a public GitHub repository. Instead you can load your credentials when the application executes. once common way to do that is to have a json configuration file that contains the credentialls that you dynamically load into the javascritp that makes the database connection. you then use the config file in your dev environment and deploy it ot your production environment, but you never commit it to github.

In order to accomplish this do the following
1. Create a file named dbConfig.json in the same directory as the database javasript that you use to make database requests. 
2. insert your mongo db credentials into the dbconfig file in json format using the following example

```json
{
    "hostname": "cs260.abcdefg.mongodb.net",
    "userName":"myMongoUserName",
    "password": "toomanysecrets"
}
```

make sure you include dbconfig.json in your .gitignore file so that it does not get pushed up to github. 








