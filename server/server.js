const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

// Route includes
const userRouter = require('./routes/user.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

/* Routes */
app.use('/api/user', userRouter);


// App Set //
const PORT = process.env.PORT || 5000;


/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
