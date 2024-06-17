const express = require('express')
const connectToMongo = require('./db')
const app = express();
const cors = require('cors');
const port = 4200;
app.use(express.json());
app.use(cors());//cross origin resource sharing
connectToMongo();

app.use('/api/restaurants',require('./routes/restaurants'));
app.listen(port,()=>{
    console.log("server running at port "+port);
})