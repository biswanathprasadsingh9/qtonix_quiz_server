const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');


router.get('/',UserController.index);
router.post('/',UserController.store);
router.get('/:id',UserController.view);
router.put('/:id',UserController.update);
router.patch('/:id',UserController.deletefile);

router.post('/login',UserController.login);



module.exports=router;
