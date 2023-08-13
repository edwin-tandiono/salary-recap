const express = require('express')

const salaryRecapRouter = require('./salary-recap');

const router = express.Router();

router.use('/salary-recap', salaryRecapRouter);

module.exports = router;
