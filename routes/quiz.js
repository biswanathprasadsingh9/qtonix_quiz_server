const express = require('express');
const router = express.Router();

const QuizController = require('../controllers/QuizController');


router.get('/',QuizController.index);
router.post('/',QuizController.store);
router.get('/:id',QuizController.view);
router.get('/viewbyexamid/:exam_id',QuizController.viewbyexamid);
router.put('/:id',QuizController.update);
router.patch('/:id',QuizController.deletefile);


module.exports=router;
