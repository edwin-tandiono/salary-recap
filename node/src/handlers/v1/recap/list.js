const Bluebird = require('bluebird');

const recap = require('../../../databases/salary-recap-postgres/models/recap');

module.exports = (req, res, next) => {
  Bluebird.resolve()
    .then(async () => {
      const recapList = await recap.findAll({
        attributes: ['id', 'period']
      });

      return res.send(recapList);
    })
    .catch(next);
};
