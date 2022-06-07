const express = require('express');
const router = express.Router();

const ExamController = require('../controllers/ExamController');


router.get('/',ExamController.index);
router.post('/latestexam',ExamController.latestexam);
router.post('/exam_create_view',ExamController.examcreateview);
router.post('/start_exam',ExamController.startexam);





router.post('/',ExamController.store);
router.get('/:id',ExamController.view);
router.put('/:id',ExamController.update);
router.patch('/:id',ExamController.deletefile);


module.exports=router;
