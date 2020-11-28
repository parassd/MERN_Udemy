const express = require('express');
const connectDB = require('./config/db');
const app = express();
//Connect database
connectDB();

// Init middleware. This line should help us get the request in the body in users.js
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

//this is where it can deploy on hiroku. if there is nothing then listen to local host 5000
const PORT = process.env.PORT || 5000;
// listen to the port
//=> are arrow functions. callback. equivalent to function()
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
