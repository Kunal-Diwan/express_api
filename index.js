
//loads express module, similar to import
//this returns a function we store in teh variable express
const express = require('express');



//we call this function which returns an object we store in app
const app = express();

//middleware
//define middleware: function that intercepts server calls and adds additional functionality
app.use(express.json());



const courses = require('./routes/courses')
app.use('/api/courses', courses)




//PORT
const port = process.env.PORT || 3000;



//we listen on a given port on the server
//we listen on port 3000 and the second parameter is a function that is called once we start listening to the port
app.listen(port,()=>console.log(`listening on port ${port}....`));
