const bcrypt = require('bcrypt');
const Bluebird = require('bluebird');
const jwt = require('jsonwebtoken');

const user = require('../../../databases/salary-recap-postgres/models/user');

module.exports = (req, res, next) => {
  Bluebird.resolve()
    .then(async () => {
      const { email, password } = req.body;

      const userDetail = await user.findOne({
        attributes: ['id', 'name', 'email', 'password'],
        where: { email },
      });

      if (!userDetail) {
        return res.status(404).send();
      }

      const authenticated = await bcrypt.compare(password, userDetail.password);

      if (!authenticated) {
        return res.status(403).send();
      }

      const userPayload = {
        id: userDetail.id,
        name: userDetail.name,
        email: userDetail.email,
      }

      const token = jwt.sign(
        userPayload,
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
      );

      return res.send({
        ...userPayload,
        token,
      });
    })
    .catch(next);
};
