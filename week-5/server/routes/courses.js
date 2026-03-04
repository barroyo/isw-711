const express = require('express');
const router = express.Router();
const { coursePost, courseGet } = require("../controllers/course");


//Post Method
router.post('/course', coursePost)

//Get all Method
router.get('/courses', courseGet)


module.exports = router;
