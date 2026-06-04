const express = require('express');
const router = express.Router();
const books = require('./booksdb.js');
const axios = require('axios');

// Task 10 - Get all books using async callback function
public_users.get('/async/books', async function(req, res) {
try {
const response = await axios.get('http://localhost:5000/');
return res.status(200).json(response.data);
} catch (error) {
return res.status(500).json(error.message);
}
});

// Task 11 - Search by ISBN using Promises
public_users.get('/async/isbn/:isbn', function(req, res) {
const isbn = req.params.isbn;

axios.get('http://localhost:5000/')
.then(response => {
const books = response.data;
return res.status(200).json(books[isbn]);
})
.catch(error => {
return res.status(500).json(error.message);
});
});

// Task 12 - Search by Author using Async/Await
public_users.get('/async/author/:author', async function(req, res) {
try {
const author = req.params.author;
const response = await axios.get('http://localhost:5000/');
const books = response.data;

```
const result = Object.values(books).filter(
  book => book.author.toLowerCase() === author.toLowerCase()
);

if(result.length === 0){
  return res.status(404).json({message:"Author not found"});
}

return res.status(200).json(result);
```

} catch(error) {
return res.status(500).json(error.message);
}
});

// Task 13 - Search by Title using Async/Await
public_users.get('/async/title/:title', async function(req, res) {
try {
const title = req.params.title;
const response = await axios.get('http://localhost:5000/');
const books = response.data;

```
const result = Object.values(books).filter(
  book => book.title.toLowerCase() === title.toLowerCase()
);

if(result.length === 0){
  return res.status(404).json({message:"Title not found"});
}

return res.status(200).json(result);
```

} catch(error) {
return res.status(500).json(error.message);
}
});




// Sign in as Customer
// router.post("/",(req,res)=>{
//     users.push({"firstName":req.query.firstName,"lastName":req.query.lastName,"ph_no":req.query.ph_no,"email":req.query.email});
//     res.send("The user /n" + (req.query.firstName) + (req.query.lastName) + "has been added!")
// }); 


// SignUp as Customer
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      return res.status(404).json({ message: "Missing username or password" });
    } else if (doesExist(username)) {
      return res.status(404).json({ message: "user already exists." });
    } else {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered.  Please login." });
    }
  });


// Get the book list available in the shop
router.get('/',function (req, res) {
    try {
        res.status(200).send(JSON.stringify({books}, null, 4));
    } catch (error) {
        res.status(500).send(error);
    }
 });
 

// Get book details based on ISBN
router.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
    });
    

// Get book details based on author
router.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const filteredData = Object.values(books).filter(e => e.author.toLowerCase() === author.toLowerCase());
    res.status(200).send(filteredData)
});    



// Get all books based on title
router.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const filteredData = Object.values(books).filter(e => e.title.toLowerCase() === title.toLowerCase());
    res.status(200).send(filteredData)
});


//  Get book review
router.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.status(200).send(books[isbn].reviews)
});

module.exports=router;
