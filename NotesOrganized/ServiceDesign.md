# Service Design
Web services  provide the interactive functionality of your web application. They commonly authenticate users, track their session state, provide, store and analyze data, connect peers, and aggregate user information. Making your web service easy to use, performant, and extensible are factors that determine the success of your app. 

## Model and sequence diagrams
When first considereing your service design it is helpful to model the applications primary objects and the interactions of the objects. You should attempt to stay as close to the model that is in your user's mind as possible. Avoid introducing a model that focuses on programming constructs and infrastructure. For example, a chat program should model participants, conversations, and messages. It should not model user devices, network connections, and data blobs. 

Once you have defined your primary objects you can create sequence diagrams that show how the object interact with each other. This will help clarify your model and define the necessary endpoints.

## Leveraging HTTP
Web services are usually provided over HTTP, and so HTTP greatly influences the design of the service. The HTTP verbs such as GET, POST, PUT and DELETE often mirror the designed actions of a web service. For example a web service for managing comments might list the comments (GET), create a comment (POST), update a comment (PUT), and delete a comment (DELETE). Likewise the MIME content types defined by IANA are a natural fit for defineing the types of content that you want to provide. The goal is to leverage those technologies as much as possible so that you dont have eto recreate the functionaltuy they provide and instaed take advantage of the significant networking infrastructure built up around HTTP. This includes caching servers that increase your performance, edge servers that bring your content closer, and replication servers that provide reduncat copies ofyour content and make your application more resilient to network failures. 

## Endpoints
A web service is usually divided up into multiple service endpoints. Each endpoint provides a single functional purpose. All of the criteria that you would apply to create a well designed code functions also applies wen exposing service endpoints. 

Note that service endpoints are often called an application programming interface (API). This is a throwback to old desktop applications and the programming interfaces that they exposed. 
As you expose resources that contain other resources you can provide the endponits for the aggregated resources. This makes it so someone using your endpoints only needs to remember the top level endpoint and then they can discover everything else. 

Example

GET /store/provo/ HTTP/2

{
    "id": "provo",
    "address": "Cougar blvd",
    "orders": "https://cs260.click/store/provo/orders"
    "employees": "https://cs260.click/store/provo/employees"
}