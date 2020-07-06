const express = require('express')
const mongoose = require('mongoose') //Package for mongodb
const ShortUrl = require('./models/shortUrl')
const app = express()
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100                  // Rate-Limiter
});

app.use(bodyParser.json());
const options = {
  inflate: true,
  limit: 1000,
  extended: true
};
app.use(bodyParser.urlencoded(options));

console.log("Server Started....")
try {
  mongoose.connect(process.env.MONGO||'mongodb://localhost:27017', {
  useNewUrlParser: true, useUnifiedTopology: true
  },function(err) {
    if (err) { return console.error('failed');}
  })


  app.use(express.urlencoded({ extended: false }))

  // To fetch the token 
  app.post('/api/login',(req,res) => {
    const user = {
      id: 1,
      username: 'onsurity',
      email: 'xyz123@gmail.com'
    }
    jwt.sign({user:user},'secretkey',(err,token)=>{
      res.json({
        token:token
      });
    }); 
  });

  // Verify jwt Token
  function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403)
    }
  }

  app.get('/', (req, res) => {
    const shortUrls = ShortUrl.find()
    res.sendStatus({ shortUrls: shortUrls });
    res.send('index', { shortUrls: shortUrls })
  })

  // Post the full url and customized short url (optional)
  app.post('/shortUrls', verifyToken, async(req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl, short: req.body.shortUrl },function(err,data){
      res.send("Short Url is " + data.short);
    })
    
  })

  // Get the full url corresponding to short url which is generated in the post function
  app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
    res.send(shortUrl.full)
  })
} catch (error){
  console.log(error);
}
app.use(limiter);
app.listen(process.env.PORT || 2000);