const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/database');



db.sync().then(()=>{
    app.listen(5000, ()=>{
        console.log(`Listening on port: 5000`)
    })
})


