const express = require('express');
const router = express.Router();

const CompanyController = require('../controllers/CompanyController');

const multer  = require('multer')
const upload = multer({});

router.get('/',CompanyController.index);

router.post('/check',CompanyController.checkcompany);

router.post('/uploadimage',upload.single('image'),CompanyController.uploadimage);


router.post('/',CompanyController.store);
router.put('/:id',CompanyController.update);



module.exports=router;
