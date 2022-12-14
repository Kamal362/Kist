const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const pdf = require('pdf-creator-node')
const fs  = require('fs')
const {html, options} = require('./public/index')


app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use('/docs',express.static(path.join(__dirname, 'docs')))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


const schedule = []
let id         =  Math.random(10)


const createPdf = () => {
    var document = {
        html: html,
        data: {
            schedule: schedule,
        },
        path: "./docs/output.pdf",
        type: "",
      };

    pdf
      .create(document, options)
      .then((res) => {
       console.log(res);
      })
     .catch((error) => {
      console.error(error);
   });
}

const deletePdf = async () =>{
    //schedule.length = 0
    await fs.unlink('./docs/output.pdf', (err)=>{
    if(err) 
      console.log(err)
     else 
      console.log('file deleted sucessfully')
    }) 
}


app.get('/', (req, res, next) => {
    schedule.length = 0
    //deletePdf()
    res.render('home',{ form: 'form', home: '/'})
    next()
})


app.get('/detail', (req, res, next) => {
    res.render('display',{ 
        form: 'form',
        home: '/',
        schedules: schedule,
       // file: './docs/output.pdf'
        download: 'download'
    })
    console.log(schedule)
    next()
})


app.get('/form', (req, res, next) => {
    res.render('form',{ 
        display: 'detail',
        home: '/'
    })
    next()
})


app.post('/form', (req, res, next) => {
    schedule.push({
      id:        id,  
      title:     req.body.title,
      day:       req.body.day,
      startTime: req.body.start,
      endTime:   req.body.end
    }) 
    console.log(id + " here is the "+req.body.title)
    res.redirect('detail')
    next()
})


app.get('/download', (req, res, next)=>{
    res.render('download', {
        form: 'form',
        home: '/',
        schedules: schedule,
        download: 'download',
        file: './docs/output.pdf',
        status: "click download button to download",
        screen: "Final Screen"
    })
    createPdf()
    //alert("file downloaded ")
    next()
})

// our listener
app.listen(port, err => {
    if(err) console.log(err) 
    console.log(`app listening to port ${port}...`) 
})
 

