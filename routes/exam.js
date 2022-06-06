const express = require('express');
const router = express.Router();

const ExamController = require('../controllers/ExamController');


router.get('/',ExamController.index);
router.post('/',ExamController.store);
router.get('/:id',ExamController.view);
router.put('/:id',ExamController.update);
router.patch('/:id',ExamController.deletefile);


module.exports=router;
