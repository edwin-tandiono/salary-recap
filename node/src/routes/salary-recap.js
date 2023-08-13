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

// === Slips ===
router.get(
  '/v1/slips',
  require('../handlers/v1/slip/list')
);

module.exports = router;