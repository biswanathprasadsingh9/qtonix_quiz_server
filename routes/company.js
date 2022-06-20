const express = require('express');
const router = express.Router();

const CompanyController = require('../controllers/CompanyController');


router.get('/',CompanyController.index);
router.post('/',CompanyController.store);
router.put('/:id',CompanyController.update);



module.exports=router;
