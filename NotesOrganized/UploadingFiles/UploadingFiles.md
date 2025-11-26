# Uploading Files
Web applications often need to upload one or more files from the frontend application running in the browser to the backend service. We can accomplish this by using the html input element of type file on the frontend and the multer npm package on the backend. 

## Frontend Code
The following frontend code registers and event hanlder for when the selected fiel changes and only accepts fiels of type .png, jpg, or jpg. We also create an img placeholder element that will display the upload image one it has been stored on the server. 

```html
<html lang="en">
    <body>
        <h1>Upload an image</h1>
        <input type="file" id="fileInput" name="file" accept=".png, .jpeg, .jpg" onchange="uploadFile(this)" />
        <div>
            <img style="padding:2em 0" id="upload" />
        </div>
        <script defer src="frontend.js"></script>
    </body>
</html>

```

The frontend JavaScript handles the uploading of the file to the server and then uses the filename returned form the server to set the src attribute of the image element in the DOM. If an error happens then an alert is displayed to the user. 

```js
async function uploadFile(fileInput) {
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            document.querySelector('#upload').src = `/${data.file}`;
        } else {
            alert(data.message);
        }
    }
}

```

## Backend code
In order to build storage support into our server, we first install the Multer NPM package to our project. There are other npm packages that we can choose from, but multer is commonly used. From your project directory, run the following console command.

```bash
npm install express multer
```

Multer handles reading the file from the http request, enforcing the size limit of the upload, and storing the file in the public directory. Additonally our service code does the following:
* handles request for static files so that we can serve up frontend code
* handles errors such as when the 64k file limit is violated
* generates a filename that prevents the user from altering the serrver file system based upon an uploaded filename
* provides access to the uploads using the express.static middleware. 

```js

const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.static('public'));

const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/',
        filename: (req, file, cb) => {
            const filetype = file.originalname.split('.').pop();
            const id = Math.round(Math.random() * 1e9);
            const filename = `${id}.${filetype}`;
            cb(null, filename);
        },
    }),
    limits: { fileSize: 64000 },
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.send({
            message: 'Uploaded succedded',
            file: req.file.filename,
        });
    } else {
        res.status(400).send({ message: 'Upload failed' });
    }
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(413).send({ message: err.message });
    } else {
        res.status(500).send({ message: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

```

## Where to store your files
You should take serious though about where to store your files. putting fiels on your server is not a very good production level solution for the foloowing reasons
1. you only have so much available space. your server only has 8 gb by default. once you use up all your space then your server will fail to operate correctly and you may need to rebuild your server
2. inproduction system, servers are transient and are often replaces as new versions are released or capacity requirements change. that means you will lose any state yuou store on the server.
3. The server storage is notusually backed up. if the server fails for any reaosn you will lose your customers data.
4. if you have multiple application servers then you cant assume that the server you uploaded the data to is going to be the one you request a download from. 

Instead you want to use a dedicated storage service that has durability garantees, is not tied to yoru  computer capacity, and can be accessed by multiple application servers.