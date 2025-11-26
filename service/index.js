const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();


const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let groups = [];

// The service port. In production the front-end code is statically hosted by the service on the same port. 
const port = process.argv.length > 2 ? process.argv[2] : 4000;


// Serve static files from the "public" directory
app.use(express.static("public"));

// Load environment variables from .env file
require("dotenv").config();

app.use(cors());

// Middleware to parse JSON bodies with a size limit of 25MB
app.use(express.json({ limit: "25mb" }));

// Use the cookie parser middleware for tracking authentication toekns
app.use(cookieParser());

// Middleware to parse URL-encoded bodies with a size limit of 25MB
app.use(express.urlencoded({ limit: "25mb"}));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

function sendEmail({ recipient_email, OTP}) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD
            },
        });

        const mail_configs = {
            from: process.env.MY_EMAIL,
            to: recipient_email,
            subject: "FREINDZIE PASSWORD RECOVERY",
            html: `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title> OTP Email Template</title>
      
      
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Freindzie</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Freindzie. Use the following OTP to complete your Password Recovery procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
        <p style="font-size:0.9em;">Regards,<br />Freindzie</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Freindzie Inc</p>
          <p>1600 Amphitheatre Parkway</p>
          <p>California</p>
        </div>
      </div>
    </div>
    <!-- partial -->
    </body>
    </html>`,
        };
        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
            }
            return resolve({ message: "Email sent successfully"});
        });
    });
}

// Test route to verify environment variable loading
app.get("/", (req, res) => {
    console.log(process.env.MY_EMAIL);
});

// app.post("/send_recovery_email", (req, res) => {
//     sendEmail(req.body)
//         .then((response) => res.send(response.message))
//         .catch((error) => res.status(500).send(error.message));
// });



// Simon Code
// Router for service endpoints
var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post("/auth/send_recovery_email", (req, res) => {
    sendEmail(req.body)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));

});


// CreateAuth a new user
apiRouter.
post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookies(res, user.token);
        res.send({ email: user.email });
    }
});


// Update Password
apiRouter.post('/auth/update_password', async (req, res) => {
    const user = await findUser('email', req.body.email);

    if (!user) {
        console.error("User not found for email:", req.body.email);
        res.status(404).send({ msg: 'User not found' });
        return;
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    user.password = passwordHash;
    user.token = uuid.v4();
    setAuthCookies(res, user.token);
    res.status(200).send({ msg: 'Password updated' });

});

// Verify Email
apiRouter.post('/auth/verify_email', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        res.status(200).send({ msg: 'Email exists' });
    } else {
        res.status(404).send({ msg: 'Email not found' });
    }
})


// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookies(res, user.token);
            res.send({ email: user.email });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middle ware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unathorized' });
    }
};

// GetGroups
apiRouter.get('/groups', verifyAuth, (_req, res) => {
    res.send(groups);
});

// AddGroup
apiRouter.post('/group', verifyAuth, (req, res) => {
    groups = updateGroups(req.body);
    res.send(groups);
});

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// updateGroups considers a new group for inclusion. 
function updateGroups(newGroup) {
    // add more logic here if i want 
    groups.push(newGroup)

    return groups;
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookies(res, authToken) {
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`nodemailerProjectsss is listening at http://localhost:${port}`);
});

