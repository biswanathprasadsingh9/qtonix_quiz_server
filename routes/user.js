const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');


router.get('/',UserController.index);
router.get('/fetchundercompany/:company_id',UserController.fetchundercompany);


router.post('/',UserController.store);
router.get('/:id',UserController.view);
router.put('/:id',UserController.update);
router.patch('/:id',UserController.deletefile);

router.post('/login',UserController.login);
router.post('/adminlogin',UserController.adminlogin);


router.post('/forgetpassword',UserController.forgetpassword);




module.exports=router;
