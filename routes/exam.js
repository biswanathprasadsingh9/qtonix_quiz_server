const express = require('express');
const router = express.Router();

const ExamController = require('../controllers/ExamController');
const PDFController = require('../controllers/PDFController');


router.get('/pdfgenerate',PDFController.index);

router.get('/',ExamController.index);
router.post('/latestexam',ExamController.latestexam);
router.post('/exam_create_view',ExamController.examcreateview);
router.post('/start_exam',ExamController.startexam);
router.post('/submit_exam',ExamController.submitexam);

router.get('/exam_users_active/:exam_id',ExamController.examusersactive);
router.get('/exam_users_completed/:exam_id',ExamController.examuserscompleted);


router.get('/view_user_exams/:user_id',ExamController.viewuserexams);


router.post('/userdashboard',ExamController.userdashboard);


router.post('/view_score',ExamController.viewscore);

router.post('/',ExamController.store);
router.get('/:id',ExamController.view);
router.get('/viewcertificate/:student_exam_code',ExamController.viewcertificate);

router.put('/:id',ExamController.update);
router.patch('/:id',ExamController.deletefile);

router.patch('/deleteuserexam/:id',ExamController.deleteuserexam);


router.post('/viewexamdetails',ExamController.viewexamdetails);












module.exports=router;
