const express=require('express');
const path=require('path');
const app=express(); // now using app we can access all express properties
const port=process.env.PORT || 8000
const hbs=require('hbs');

const views_path=path.join(__dirname,'/templates/views');
const partial_path=path.join(__dirname,'/templates/partials');

const public_static_path=path.join(__dirname,'/public');
app.use(express.static(public_static_path)); // this is also a get request to public directory


app.set('view engine','hbs');
app.set('views',views_path);
hbs.registerPartials(partial_path);
//routing
app.get('/',(req,res)=>{
    res.render("index");
});

app.get('/about',(req,res)=>{
    res.render("about");
});

app.get('/weather',(req,res)=>{
    res.render("weather");
});
app.get('*',(req,res)=>{
    res.render("404");
});

app.listen(port,()=>{
    console.log('listening on 8000');
}
);