# SOP and CORS
Security should always be on your mind when you are working with the web. The ability to provide services to a global audience makes the info on the web very valuable and therefore an attractive target for nefarious parties. When website architecture and browser clients were still in their infancy tey allowed javaScript to make requests from one domain while displaying a website from a didfferent domain. These were called cross origin requests. 

Consider the following example. An attacker sends out an email with a link to a hacker website (byu.instructure.com) that is similar to the real course website. If the hacker website could request anything from the real website then it could make itself appear and act just like the real education website. All it would have to do is request images, html, and login endpoints from the courses website and display the result on the hacker website. This would give the hacker access to everythign the user did. 

To combat this problem the Same Origin Policy (SOP) was created. Simply stated SOP only allows JavaScript to make requests to a domain if it is the same domain that the user is currently viewing. A request from byu.iinstructure.com for service endpoints that re made to byu.instrucute.com would fail becuase the domains do not match. This provides significant security, but also introduces complications when building web apps. For example, if you want to build a service that any web application can use it would also violate the SOP and fail. To address this, Cross Origin Resource Sharing (CORS) was invented. 

CORS allows the client (e.g. browser) to specify the origin of a request and then let the server respond with what origins are allowed. The server may say that ll origins are allowed, for example, if they are general pupose image provider, or only a specific origin is allowed, for example if they are a banks authentication service. 

If the server doesnt specify what origin is allowed then the browser assumes that it must be the same origin.

Going back to our hacker example, the http request from the hacker site to othe courses authentication service would look like 

GET /api/auth/login HTTP/2
Host: byu.instructure.com
Origin: https://byu.iinstructure.com

In response the course website would return
HTTP/2 200 OK
Access-Control-Allow-Origin: https://byu.instructure.com

The browser would then see that the actual origin of the request does not match the allowed origin and so the browser blocks the response and generates an error. 

Notice that with CORS, it is the browser that is protecting the user from accessing the course websites authentication endpoint from the wrong origin. CORS is only meant to alert the user that something nefarious is being attempted. A hacker can still proxy requests thorugh their own server to the course website and completly ignore the access-control-allow-origin header. Therefore the course website needs to implement its own precautions to stop a hacker from using its services inappropriately. 

### Using third party services
When you make requests to your own web services you are always on the same origin and so you will not violate the SOP. However, if you want to make requests to a different domain than the one your web application is hosted on, then you need to make sure that domain allows requests as defined by the access-control-allow-origin header it returns. For example, if i have javascript in my web app loaded from cs260.click that makes a fetch request for an image from the website i.picsum.photos the browser will fail the request with an http status code of 403 and an error message that CORS has blocked the request. 

This happens becuase i.picsum.photos does not return an access-control-allow-origin header. Without a header the browser assumes that all requests must be made from the same origin.

If your web app instead makes a service request to icanhazdadjoke.com to get a joke, that request will succeed becuase icanhazdadjoke.com returns an access-control-allow-origin header with a value of * meaning that any origin can make requests ot this service

This would have also succeeded if the http header had explicitly listed your web application domain. For example, if you make your request from the origin cs260.click the following response would also satisfy cors. 

This all means that you need to test the services you want to use before you include them in your application. Make sure they are responding with * or your calling oriring. If they do not then you will not be able to use them. 