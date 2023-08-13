const Bluebird = require('bluebird');

// const SalaryRecapPostgres = require('../../../databases/salary-recap-postgres/sequelize');

const recap = require('../../../databases/salary-recap-postgres/models/recap');

module.exports = (req, res, next) => {
  Bluebird.resolve()
    .then(async () => {
      const recaps = await recap.findAll({
        attributes: ['id', 'period']
      });

      return res.send(recaps);
    })
    .catch(next);
};
