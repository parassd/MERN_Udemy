const express = require('express');
const app = express();
app.get('/',(req,res) => res.send('API Running'));
//this is where it can deploy on hiroku. if there is nothing then listen to local host 5000
const PORT = process.env.PORT || 5000;
// listen to the port
//=> are arrow functions. callback. equivalent to function()
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
