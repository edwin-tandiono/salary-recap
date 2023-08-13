const Bluebird = require('bluebird');
const dayjs = require('dayjs');

const recap = require('../../../databases/salary-recap-postgres/models/recap');

module.exports = (req, res, next) => {
  Bluebird.resolve()
    .then(async () => {
      const { id } = req.params;
      const { period } = req.body;

      if (!id || !period) {
        throw new Error(`ID and Period can't be empty.`)
      }

      const periodAsDate = dayjs(period, 'YYYY-MM');

      if (!periodAsDate.isValid()) {
        throw new Error(`Period ${period} is invalid. It must be in YYYY-MM format.`)
      }

      await recap.update(
        {
          period: periodAsDate.startOf('month').format('YYYY-MM-DD')
        },
        { where: { id } },
      );

      const updatedRecapDetail = await recap.findOne({
        attributes: ['id', 'period'],
        where: { id },
      });

      return res.send(updatedRecapDetail);
    })
    .catch(next);
};
