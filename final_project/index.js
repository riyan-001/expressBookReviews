// Importing Packages
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')

// Pre-Config
const app = express();
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin",'http://localhost:3000');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
app.use(express.json());
const PORT =5000;

// Routes
const general_routes = require('./routes/general.js');
const customer_routes = require('./routes/auth_users.js');
// const customer_routes = require('./routes/customer.js');
// const vendor_routes = require('./routes/vendor.js');



//Middleware for general user (without authetication)
app.use("/general", general_routes);


app.use(
    "/customer",
    session({
      secret: "fingerprint_customer",
      resave: true,
      saveUninitialized: true,
    })
  );

app.use("/customer/auth/*", function auth(req, res, next) {
    if (req.session.authorization) {
      let token = req.session.authorization["accessToken"];
  
      jwt.verify(token, "access", (err, user) => {
        if (!err) {
          req.user = user;
          next();
        } else {
          return res.status(403).json({ message: "User not authenticated." });
        }
      });
    } else {
      return res.status(403).json({ message: "User not logged in." });
    }
  });


app.listen(PORT,()=>console.log("Server is running"));
