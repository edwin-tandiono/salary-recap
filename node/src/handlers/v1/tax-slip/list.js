const Bluebird = require('bluebird');

const taxslip = require('../../../databases/salary-recap-postgres/models/tax-slip');

module.exports = (req, res, next) => {
  Bluebird.resolve()
    .then(async () => {
      const recaps = await taxslip.findAll({
        attributes: [
          'id',
          'order_num',
          'name',
          'base_salary',
          'meal_allowance',
          'meal_allowance_multiplier',
          'overtime_pay',
          'overtime_pay_multiplier',
          'installment_payment',
          'installment_remaining',
          'allowance_bonus',
          'attendance_bonus',
          'transportation_bonus',
          'bonus',
        ]
      });

      return res.send(recaps);
    })
    .catch(next);
};
