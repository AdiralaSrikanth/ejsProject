const express = require('express')

const app =  express()
const PORT = 4000
const path = require('path')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended : false}))

app.set ('views',  path.join(__dirname, 'views'));
app.set('view engines', 'ejs')

const usersList = ["tom", "harry", "ron"];


app.get('/', (req,resp) => {
    resp.render('index.ejs',{users:usersList})
})


app.post('/form', (req,res) => {
    console.log(req.body.userName)
    usersList.push(req.body.userName)
    console.log(usersList)
    res.redirect('/')
})

app.post('/delete/:id', (req,res)=> {
    usersList.filter(function (user, index) {
        if(user === req.params.id) {
            usersList.splice(index,1)
            console.log(usersList)
        }
    })
    res.redirect('/')
})

app.post('/update/:id', (req,res) => {
    usersList.filter(function (user,index) {
        if(user === req.params.id && req.body.updateUser.length>0){
            usersList.splice(index,1,req.body.updateUser)
            console.log(usersList)
        }
    })
    res.redirect('/')
})

app.get('/product', (req,resp) => {
    resp.render('product.ejs')

})
app.get('/login', (req,resp) => {
    resp.render('login.ejs')

})

app.listen(PORT, () => 
console.log(`Example app listening on port ${PORT}!`))