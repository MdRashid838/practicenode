const express = require('express');
const app  = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")))

app.get('/', function(req, resp){
    fs.readdir(`./files`, function(err,files){
        resp.render("index" ,{files: files});
    })
})

app.get('/file/:filename', function(req, resp){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err, filedata){
    resp.render('show' ,{filename: req.params.filename ,filedata: filedata});
    })
})

app.get('/edit/:filename', function(req, resp){
   resp.render('edit',{filename: req.params.filename})
})

app.post('/edit', function(req, resp){
    fs.rename(`/files/${req.body.previous}`, `/files/${req.body.new}`, function(err){
        resp.redirect('/')
    })
})


app.post('/create', function(req, resp){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details,function(err){
        resp.redirect('/');
    });
});

app.listen(3000 , function(){
    console.log("server is running")
})