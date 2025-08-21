
# ************** Quora Like app ****************
# ************** BACKEND CRUD operations done 

## CRUD Operatios using REST APIs 
## Tech stack - Nodejs, Express js, Ejs




****************************************
## Features : 
For Post : Posts of no. of users
    - view all of them
    - view individual posts
    - create a new post
    - edit specific post
    - del post



****************************************
### Creating RESTFUL APIs:
#### GET, POST, PATCH, DEL

INDEX ROUTE : main 1
GET - /posts  -  to get data of all posts

CREATE ROUTE :
POST - /posts -  to add a new post

VIEW ROUTE : 
GET - /posts/:id -    to get 1 post [uisng id] // DB create on its own id, here we are creating ids by own

UPDATE ROUTE : 
PATCH - /posts/:id -  to update specific post

DESTROY ROUTE :
DELETE - /posts/:id - to del specific post


****************************************





****************************************
#### Feature 1:

####  INDEX ROUTE - VIEW ALL POSTS - Index.js

CODE:
// 1 ... INDEX ROUTE ... main 1 ... all posts will be displayed here
app.get("/posts", (req,res) => {         // 5
    // console.log("this is all posts path");
    // res.send("this is all posts path");
    res.render("index.ejs", {posts});   // 6     // 7
}) ;

op: 
<img src="op img/index_route_index.ejs.png" alt="Output Screenshot" width="500"/>

****************************************


****************************************
#### Feature 2:

#### SHOW ROUTE - VIEW INDIVIDUAL POST IN DETAIL - show.ejs

CODE:
// 11 ...  SHOW ROUTE ... to get an individual post using its id 
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    // console.log(id);
    let post = posts.find( (p) => p.id === id); 
    // console.log(post);
    // res.send("req working for getting a post using its id");
    res.render("show.ejs", {post});
});

op: 
<img src="op img/show_route_indiv_post2.png" alt="Output Screenshot" width="500"/>

****************************************

****************************************
#### Feature 3:

#### NEW ROUTE - CREATE A NEW POST - new.ejs

CODE:
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

op: 
<img src="op img/NEW_ROUTE_NEW.EJS.png" alt="Output Screenshot" width="500"/>

****************************************

****************************************
#### Feature 4:

#### UPDATE ROUTE - UPDATE A POST - edit.js

CODE:
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

op: 
<img src="op img/EDIT_ROUTE_EDIT_JS.png" alt="Output Screenshot" width="500"/>

****************************************

****************************************
#### Feature 5:

#### DELETE ROUTE - UPDATE A POST - 
 - [button in index.ejs with form, methodOverride used to convert post to del, 
    filter used in index.js in del route to copy all posts except filtered one]

CODE:
// 15-  // DELETE ROUTE
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    // console.log(id);
    // let post = posts.find( (p) => p.id === id); 
    // res.send("delete post");
    posts = posts.filter( (p) => p.id !== id);
    res.redirect("/posts");
});

op: 
<img src="op img/DEL_ROUTE_DEL.EJS.png" alt="Output Screenshot" width="500"/>

****************************************



****************************************
### extra info - 

## CRUD means

GET  - retrieve resources
POST - submits new data to the server

PUT - update existing data
DELETE - removes data 


### REST 
Developing APIs that follow REST guidelines



****************************************



****************************************
### steps : 

1-  require express 
    const express = require("express");
    const app = express();

2-
create server -
code : 
app.listen(port, () =>{        // 1
    console.log("Server is listening on port " + port);
});

op in terminal , vscode: 
Server is listening on port 3000

3-
create a basic GET API ... main root 

op on below link -
http://localhost:3000/

this is root path

4-
as db is not connected yet, so no data from db
so, create own data - posts ... array of posts

5-
now create all posts path
// INDEX ROUTE ... main 1 ... all posts will be displayed here

a-
app.get("/posts", (req,res) => {         // 5
    console.log("this is all posts path");
    res.send("this is all posts path");
}) ;

op on localhost:3000/posts :
this is all posts path

b-
on all posts, a page with all posts shud come .. 
open views folder, create file : index.ejs [add ! details, h1 heading Being Social]

code: 
app.get("/posts", (req,res) => {         
res.render("index.ejs");   // 6
});

op on local host : 
Being Social 


7-
index.js .. in app.js ....
add posts in index route to pass it to index.ejs in views

code : 
res.render("index.ejs", {posts});   // 6     // 7

b-
add <% %> sign in index.ejs file, where for loop is present
code : 
      <% for (post of posts)  { %>
        <div class="post">
            <h3 class="user"> @ <%= post.username %> </h3>
            <h4 class="content">  <%= post.content %> </h4>
            
        </div>

    <% } %>


op on localhost:3000/posts - 
Being Social
@ tourist
codingAholic - love to code
@ dominator
coder1Indi - CF GM, top coder India
@ alpha1zln
aspiringSWE, Future Sw Er, Aspire to be Best 1


8-
in public folder, create file - style.css -
to add style to index.ejs , all posts

b-
    add in index.ejs file - 
    <link rel="stylesheet" href="style.css">


********************************
### CREATE ROUTE ^^^^^

#### Consists of 2 tasks : 
- create form to get new data, so GET will be used
- then push / post data to server[db] [here add to arr posts] , so POST api


9-
CREATE ROUTE 

part 1:
in index.js , add code for new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
}) ;

10-
in views folder, create a new file, new.ejs
write code for a new form , to get username, content data from user
a-
when no action path is given in form, then data entered is visible in top local host place-
0/posts/new?username=shreyas&content=best+coder++

b- when action path is mentioned in form, then
op- local host, after filling form
new post req working
op - terminal -
Server is listening on port 3000
{ username: 'ecnerwala', content: '  love to play chess and code' }

c-push data to posts arr / db if c/td.
app.post("/posts", (req, res) => {
    //console.log(req.body);
    let {username, content} = req.body;
    posts.push({username, content});
    res.redirect("/posts");
});

d- redirect to all posts api ... after data is added.
res.redirect("/posts");          

op- /posts on local host ...
op- new data added...
@ icpc1
aim to become best coder, reach 2k, then above from cf

e- add an anchor tag to connect 'new listing webpage'[new route, new.ejs] to 'all posts' webpage [Index route, index.ejs]
<a href="http://localhost:3000/posts/new">Create a New Post</a>   // in index.ejs


11-
### SHOW ROUTE      
####  to get a post using its post id

a-
in index.js, write show route, to a get a post using its id
// 11 ...  SHOW ROUTE ... to get an individual post using its id 

code :
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    res.send("req working for getting a post using its id");
});

op- check on  link - http://localhost:3000/posts/1b
req working for getting a post using its id


b-
- now after we checked id of a post is working on localhost
- next step is to get that post using it, print it using console.log to check if it is working fine

code: 
// 11 show route ... in index.js
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find( (p) => p.id === id); 
    console.log(post);
    res.send("req working for getting a post using its id");
});

op - terminal 
1abc
{
  id: '1abc',
  username: 'tourist',
  content: 'codingAholic - love to code'
}

c- now this individual post should be shown to user on a new webpage, 
so create a page in views folder, name file as show.ejs [to show an individual post]
    i- create a file show.ejs in views folder 
    done
    ii - add res.render in show route in index.js... to show page show.ejs
    code:
            app.get("/posts/:id", (req, res) => {
            let {id} = req.params;
            // console.log(id);
            let post = posts.find( (p) => p.id === id); 
            // console.log(post);
            // res.send("req working for getting a post using its id");
            res.render("show.ejs", {post});
        });

        op- http://localhost:3000/posts/1abc
                    Here is your post in detail :
                    Post id : 1abc
            @ tourist
            @ codingAholic - love to code


12- create id using uuid ... unique id
a- npm i uuid

b- add uuid in new route and send from there to new.ejs code

code:
// 10 ... NEW POST ... once data is rcvd in form, it is sent to /posts .. all posts place
app.post("/posts", (req, res) => {
    //console.log(req.body);
    let {username, content} = req.body;
    let id = uuidv4();
        posts.push({id, username, content});
    //res.send("new post req working");
    res.redirect("/posts"); // redirect // to /posts api
});

op- localhost ... 
// [when clicked on see in detail on indiv post in all posts webpage]
Here is your post in detail :
Post id : 636b328f-6009-449e-a4fc-d60829864ad0


13-
// 13 UPDATE ROUTE ... to update specific post

a- new route, app.patch ...
this will wrk in hopscotch ... as of now
code  : 
app.patch("/posts/", (req, res) => {
    let {id} = req.params;
    // console.log(id);
    let newContent = req.body.content;
    let post = posts.find( (p) => p.id === id); 
    post.content = newContent;
    console.log(post);
    req.send("patch req working");
});


b-
need a new webpage, edit.ejs, will show post and user will edit detail
- create a new file, edit.ejs in views folder 
- all to edit
- after editing redirect to all posts webpage
 
c- add edit option [anchor tag] at the bottom in index.ejs -
        <a href="http://localhost:3000/posts/:id/edit"><b>Edit a Post</b></a> 
        &nbsp;

d- in index.js ... add edit route


14- HTML form only support , GET , POST method ...
TO use PUT, PATCH, DEL , we need to install method-override

a- npm i method-override

b- add it index.js
// 14
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// Need method-override middleware
// Browsers don’t support PATCH directly in forms. You must use method-override package.

c- add in edit.js, in its form
<form method="POST" action="/posts/<%= post.id %>?_method=PATCH">



15- DELETE ROUTE 

a- add a del btn in all posts ...  in index.ejs
&nbsp;   &nbsp;  &nbsp;
<button id="btn"> Delete Post</button>

b-
let it be in a form, so that addeventlistener is not needed
<form method="POST" action="/posts/<%= post.id %>?_method=DELETE">
    <button id="btn"> Delete Post</button>
</form>

b- add Del route ... in index.js
// 15-  // DELETE ROUTE
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    // console.log(id);
   // let post = posts.find( (p) => p.id === id); 
    res.send("delete post");
});

check if btn is working ... chek on local host , all posts webpage
try to delete a post, op will come - delete post
means api is working

c-
now to delete a specific post from posts arr
change del route code
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    // console.log(id);
    // let post = posts.find( (p) => p.id === id); 
    // res.send("delete post");
    posts = posts.filter( (p) => p.id !== id);
    res.redirect("/posts");
});


d- in del route of index.js :
   - posts = posts.filter( (p) => p.id !== id);
        above code will filer specific post out, rest will be saved in posts arr
    
    - res.redirect("/posts");
        this above code will redirect del route to all posts webpage [index route], once deletion is done.
        All posts will be displayed after it and specific post will be deleted.


***********************************************
done 
***********************************************
