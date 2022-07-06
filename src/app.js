const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { query } = require('express')
const geoCode = require('./utils/geocode')
const forCast = require('./utils/forecast')


const app =express()

// console.log(__dirname)
const dirPath = path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')




app.set("view engine",'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(dirPath))//gets index.html

// app.get('',(req,res)=>{
//     res.render(('index'))
// })
app.get('',(req,res)=>{
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/help',(req,res)=>{
    res.render('help')
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please enter a location'
        })
    }else{
    geoCode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                Error:error
            })
        }
        forCast(latitude,longitude,(error,forecastData)=>{
            if(error){
            console.log('Error:',error)
            }
            return res.send({
                forecast:forecastData,location,
                address:req.query.address
            })
        })
    })
}
        // res.send({
        //     forecast:'Sunny',
        //     location:'India',
        //     address: req.query.address
        // })
    
})

app.get('/product',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'Enter term to search'
        })
    }else{

    }


    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'eoor',
        error:'cant find help page'
    })
})

app.get('*',(req,res)=>{
    res.send('404',{
        title:'404',
        name:'wiz',
        error:'Cnt find the page'
    })
})


//To runserver giving port number and function to display text
app.listen(3000,()=>{
    console.log('Server Started on port 3000')
})