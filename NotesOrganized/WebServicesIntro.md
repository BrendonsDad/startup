# Web Services Introduction
Up to this point, your entire application is loaded from your web server and rusn on the user's browser. It starts when the browser requests th eindex.html file from the web server. The index.html in turn references other HTML CSS JavaScript or image files. All of these fiels, that raee running on the browser, comprise the frontend of your application. 
Notice that when the frontend request the application filesfrom the web server it is using the HTTPS protocol. All programming request between devices use HTTPS to exchange data.

web browser -> EC2 web server (static files: index.html, main.js, main.css)

from our frontend JavaScript we can make requests to external services running anywhere in the world. This allwos us to get external data, such as an inspirational quote, that we then inject into the DOM for the user to read. To make a web service request, we supply the URL of the web service to the fetch function that is built into the browser.

web broswer -> pulls from _> EC2 web server -> and requests a quote using https

The next step of full stack web application is to create our own web service. Our web service will provide the static frontend files along with functions to handle fetch requests for things like stoging data persistently, provideing security, running tasks, executing application logic that you dont want your user to be able to see, and communicating with other users. The functionality provided by yyour web service represents the backeend of your application. 

Generally, the functions provided by a web service are called endpoints, or sometimes APIs. You access the web service endpoints from your frontend JavaScript with the fetch function. In the picture below, the backend web service is not only providing the static files that make up the front end, but also provideing the web service endpoints that the frontend calls to do things like get a user, create a user, or get high scores.

EC2
- Static files
    - index.html
    - main.js
    - main.css

- endpoints
    - [POST] /user
    - [GET] /user
    - [GET] /scores
    - [GET] /user/route

The backedn web service can also use fetch to make requests to other web services. For example, the frontend uses fetch to request the users data from the backend web service. The backend then uses fetch to call two other web services, one to get the users data from the database and the other to request subway routes that are newar the users homw. Theat data is then combined together by the backend and returned to the frontend for display in the browser. 

The following instruction will discuss how to use fetch , HTTP, and URLs and build a web service using the Node.js application. With all of this in place your application will  be a full stack application comprised of both a frontend and a backend. 
