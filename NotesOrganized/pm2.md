# PM2
When you run a program from the console, the program will automatically terminate when you close the console or if the computer restarts. In order to keep programs runnign after a shutdown you need to register it as adaemon. The term daemon comes from the idea of something that is always ther working in the background. Hopefully you only have good daemons running in your background. 

We want our web services to continue running as a daemon. we would also like an easy way to start and stop our services. That is what process manager 2 does (PM2).

PM2 is already installed on your production server as part of the AWS AMI that you selected when you launched your server. Additionally, the deployment scripts found with the simon projects automatically modify PM2 to register and restart your web services. That means you should not need ot do anything with PM2. However, if you run into problems such as your services not running, then here are some commands that you might find useful. 

You can ssh into your server and see PM2 in action by running the following command

pm2 ls

this should print out the two services, simon and startup, that are configured to run on your web server. You can try some of the other commands, but only if you understand what they are doing. Using them incorrectly could cause your web services to stop working. 

### Registering a new web service
If you want to setup another subdomain that accesses a different web service on you web server, you need to follow these steps. 
1. Add the rule to the caddy file to tell it how to direct requessts for the domain
2. Create a directoy and add the files for the web service.
3. Configure PM2 to host the web service.

#### Modify Caddyfile
SSH into your server

tacos.cs260.click {
  reverse_proxy _ localhost:5000
  header Cache-Control none
  header -server
  header Access-Control-Allow-Origin *
}

this tells Caddy that when it gets a request for tacos.cs260.click it will act as a proxy for those requests and pass them on to the web service that is listening on the same machine (localhost) on port port 5000. The other settings tell Caddy to return headers that disable caching, hide the fact that Caddy is the server and to allow any other origin server  to make endpoint requests to this subdomain (basically disabling Cors)

### Create the web service

copy the services/startup directory to a directory that represents the purpose of your service.

```bash
cp -r ~/services/startup ~/services/tacos
```

If you list the directory you should see an index.js file that is the main JavaScript file for our web service. IT has the code to listen on the designated network port and respond to requests. The following is the JavaScript that causes the web service to listen on a port that is provided as an argument in the command line.

```js
const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
```

### Conffigure PM2 to host the web service
The main problem with running yhour web service from the console with node index.js 5000, is that as soon as you close your ssh session it will terminate all processes hyou started in that session, including your web service. Instead you need something that is always running in the background to run your web service this iw where daemons come into play. The daemon we use to do this is called PM2. 

To run a newly created web service under PM2, make sure you are in your service directory and run the command similar to the following, with the service name and port substituted to your desired values.

```bash
cd ~/services/tacos
pm2 start index.js -n tacos -- 5000
pm2 save
```

if you run pm2 ls again you should see your web service listed. You can now access your subdomain in the browser and see the proper response. PM2 will keep running your service even after you exit your ssh session. 