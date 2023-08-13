const express = require('express')

const router = express.Router();

router.get(
  '/v1/recaps',
  require('../handlers/v1/recap/list')
);

router.get(
  '/v1/tax-slips',
  require('../handlers/v1/tax-slip/list')
);

module.exports = router;