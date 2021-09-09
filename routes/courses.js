

//loads express module, similar to import
//this returns a function we store in teh variable express
const express = require('express');

//we call this function which returns an object we store in app
const app = express();

const router = express.Router();


//joi for validation
const Joi = require('joi');




const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
    {id:4, name: 'course4'},
];

router.get('/', (req,res)=> {
    res.send(courses);
})


router.get('/:id', (req,res)=> {
    const course = courses.find(c=>c.id===parseInt(req.params.id));

    //404 means not found
    if(!course) res.send(404).send("The course with the given ID was not found");

    res.send(course);
})

router.post('/',(req,res)=> {
    const {error} = validateCourse(req.body);
    
    //data validation
    if(error) {
        //status code 400, bad request
        //result.error is provided by joi if the request is bad
        res.status(400).send(error.details[0].message);
        return;
    }


    //explain app.use(express.json)
    const course ={ 
        //reuturns a random number between 1 and x
        //math.floor rounds it to a whole number
        id: Math.floor(Math.random() * 100),
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})


router.put('/:id', (req,res)=> {
    //Look up courses
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    //If it doesnt exist, return 404
    if(!course) res.send(404).send("The course with the given ID was not found");


    //Validation
    //if invalid, return 400 - bad request
    const {error} = validateCourse(req.body)
    if(error) {
        //status code 400, bad request
        //result.error is provided by joi if the request is bad
        res.status(400).send(error.details[0].message);
        return;
    }



    //update course if everything is valid
    course.name = req.body.name;
    res.send(course);
    //return course to client
})

router.delete("/:id", (req,res)=> {
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.send(404).send("The course with the given ID was not found");

    const index = courses.indexOf(course);

    //it goes to the index and removes one object
    courses.splice(index,1);

    res.send(course);

})


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course,schema);
}


module.exports = router;
