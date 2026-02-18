const express = require('express');
const router = express.Router();
const { teacherPost } = require("../controllers/teacher");


//Post Method
router.post('/teacher', teacherPost)


module.exports = router;
