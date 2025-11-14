# URL 
The Uniform Resource Locator (URL) represents the location of a web resource. A web resource can be anything, such as a web page, front image, video stream, database record, or JSONobject. It can also be completely ephemeral, such as a visitation counter or gaming session. 

Looking at the different parts of a URL is a good way to understand it. 

https://byu.edu:443/cs/260/student?filter=accepted#summary

The URL syntax uses the following convention

<scheme>://<domain name>:<port>/<path>?<parameters>#<anchors>

shceme: https -> the protocole requred to ask for the resource. For web apps, this is usually HTTPS. But it could be any internet protocol such as FTP or MALITO.
Domain name: byu.edu -> domain name that owns the resource
port: 3000 -> specifies the numnbered network port used to connect to the domain server. Lower numner ports are servered for common internet protocols, higher numnber portscan be used for any purpose. The default port is 8- if the shceme is HTTP or 443 if the shceme is https
path: /school/byu/user/8014 -> the path to the resource on the domain. 
parameters: filter=names&highlight=intro,summary -> the parameters represent a list of key value pairs. Usually it provides additional qualifiers on the resource represented by the path. This might be a filter on the returned resource or how to highlight the resource. The parameters are also sometimes called the query string. 
anchor: summary -> usually represents a sub-location in the resource. For HTML pages this represents a request for the browser to automatically scroll to the element with an ID that matches the anchor. 