const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();
app.use(bodyParser.json());

const database ={
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password:'cookies',
            entries:0,
            joined:new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password:'bananas',
            entries:0,
            joined:new Date()
        }
    ],
    login: [
        {
            id:'987',
            hash:'',
            email: 'john@gmail.com'
        }
    ]
}


app.get('/', (req,res)=>{
    //res.send('this is working');
    res.send(database.users);

})

app.post('/signin', (req,res)=>{
    if(req.body.email === database.users[0].email &&
         req.body.password === database.users[0].password){
            res.json('success')
         }else{
             res.status(404).json('error logging in')
         }
    
})

app.post('/register',(req,res)=>{
    const {email, name, password} = req.body;
    /* bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash); */
        // Store hash in your password DB.
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password:password,
        entries:0,
        joined:new Date()
    })   
    //console.log(database.users[database.users.length-1])
    res.json(database.users[database.users.length-1]) ;

})

app.get('/profile/:id',(req,res) =>{
    //console.log(req.params);
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{   // nie robimy elsa bo dostajemy odpowiedz za szybko i nam nie znajduje
        if(user.id === id){
           found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(404).json('not found')
    }
})

app.post('/image',(req,res)=>{
    //console.log(req.body);
    const {id} = req.body;
    let found = false;
    database.users.forEach(user =>{   
        if(user.id === id){
           found = true;
           user.entries++
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json('not found')
    }
})

//BCYPT FOR ENCODING PASSWORDS



/* // Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
}); */


app.listen(3000,()=>{
    console.log('app is running on port 3000');
})


/* 
/ -----> res = this is working
/signin --> POST = succes/fail
/register --> POST = new user
/profile/:userID --> GET = user //homescreen for user
/image --> PUT --> updated user object or score 


*/