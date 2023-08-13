const express = require('express')

const router = express.Router();

// === Recaps ===
router.get(
  '/v1/recaps',
  require('../handlers/v1/recap/list')
);

router.get(
  '/v1/recaps/:id',
  require('../handlers/v1/recap/detail')
);

router.patch(
  '/v1/recaps/:id',
  require('../handlers/v1/recap/update')
);

// === Tax Slips ===
router.get(
  '/v1/tax-slips',
  require('../handlers/v1/tax-slip/list')
);

module.exports = router;