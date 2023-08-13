const Bluebird = require('bluebird');

// const SalaryRecapPostgres = require('../../../databases/salary-recap-postgres/sequelize');

const recap = require('../../../databases/salary-recap-postgres/models/recap');

module.exports = (req, res, next) => {
  Bluebird.resolve()
    .then(async () => {
      const { id } = req.params;

      const recapDetail = await recap.findOne({
        attributes: ['id', 'period'],
        where: { id },
      });

      return res.send(recapDetail);
    })
    .catch(next);
};
