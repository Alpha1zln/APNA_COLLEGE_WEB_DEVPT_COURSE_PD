const express = require("express");     // 1
const app = express();
const path = require("path");

const port = 3000;
const {v4  : uuidv4} = require('uuid');
// uuidv4(); 


app.use(express.urlencoded({extended: true}) );  // to u/d data coming from frontend

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views") );


// 14
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// Need method-override middleware
// Browsers don’t support PATCH directly in forms. You must use method-override package.


// posts // 4
let posts = [
    {   
        id: uuidv4(),  // "1abc",
        username : "tourist",
        content : "codingAholic - love to code",
    }, 
    {
        id: uuidv4(),      // "2abc",
        username : "dominator",
        content : "coder1Indi - CF GM, top coder India",

    },
    {   
        id: uuidv4(),     // "3abc",
        username : "alpha1zln",
        content : "aspiringSWE, Future Sw Er, Aspire to be Best 1",
    },
];


// 3   // main root path
app.get("/", (req,res) => {         // 3
    console.log("this is root path");
    res.send("this is root path");
}) ;



// 9 ... CREATE ROUTE
// part 9a ... Get details from frontend [form] , later post to server [db] , [arr posts here]
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
}) ;

// 9B  - // 10 ... NEW POST ... once data is rcvd in form, it is sent to /posts .. all posts place
app.post("/posts", (req, res) => {
    //console.log(req.body);
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    //res.send("new post req working");
    res.redirect("/posts"); // redirect // to /posts api
});



// 13- d ... after clicking edit in a post, it will direct here
app.get("/posts/:id/edit", (req, res) => {     // /posts ... not posts ... / is imp
    let {id} = req.params;
    // console.log(id);
    //let newContent = req.body.content;
    let post = posts.find( (p) => p.id === id); 
    res.render("edit.ejs", {post});

});


// 13 - a ... UPDATE ROUTE ... to show specific post for editing
app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    // console.log(id);
    let newContent = req.body.content;
    let post = posts.find( (p) => p.id === id); 
    post.content = newContent;     // this is updating the content of the post
    // console.log(post);
    //res.send("patch req working");
    res.redirect("/posts");
});







// 11 ...  SHOW ROUTE ... to get an individual post using its id 
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    // console.log(id);
    let post = posts.find( (p) => p.id === id); 
    // console.log(post);
    // res.send("req working for getting a post using its id");
    res.render("show.ejs", {post});
});






// 1 ... INDEX ROUTE ... main 1 ... all posts will be displayed here
app.get("/posts", (req,res) => {         // 5
    // console.log("this is all posts path");
    // res.send("this is all posts path");
    res.render("index.ejs", {posts});   // 6     // 7
}) ;



// 15-  // DELETE ROUTE
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    // console.log(id);
    // let post = posts.find( (p) => p.id === id); 
    // res.send("delete post");
    posts = posts.filter( (p) => p.id !== id);
    res.redirect("/posts");
});



// 2 ... connecting to server
app.listen(port, () =>{        // 2
    console.log("Server is listening on port " + port);
});