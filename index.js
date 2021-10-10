const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs')
/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.send(__dirname + "/home.html")
});

/*
- Return all details from user.json file to client as JSON format
*/


router.get('/profile', (req,res) => {
  let data = fs.readFileSync('user.json')
  res.send(JSON.parse(data))

  //this will download the page file
  //res.send(data)
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/



router.get('/login', (req,res) => {
  var user_info = JSON.parse(fs.readFileSync("./user.json"))
  let user = req.query.username
  let pass = req.query.password
  let response
  if(user != user_info['username']){
    response = {status: false, message: "Username is invalid."}
  }
  else if (pass != user_info['password']){
    response = {status: false, message: "Password is invalid."}
  }
  else{
    response = {status: true, message: "This information is valid."}
  }

  res.send(response)
  });
   

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:uname', (req,res) => {
  let uname = req.params.user_info;
  res.send(`${uname} has successfully logged out.`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));