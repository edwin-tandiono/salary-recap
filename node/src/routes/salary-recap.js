const express = require('express')

const { SIGN_IN_PATH } = require('../constants/auth');

const router = express.Router();

router.use(require('../middlewares/auth'));

// === Auth ===
router.post(
  SIGN_IN_PATH,
  require('../handlers/v1/auth/sign-in')
);

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