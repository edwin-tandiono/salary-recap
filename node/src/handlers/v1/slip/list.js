const Bluebird = require('bluebird');

const slip = require('../../../databases/salary-recap-postgres/models/slip');

module.exports = (req, res, next) => {
  Bluebird.resolve()
    .then(async () => {
      const slipList = await slip.findAll({
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

      return res.send(slipList);
    })
    .catch(next);
};
