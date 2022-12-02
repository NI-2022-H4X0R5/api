const auth = require('../../middlewares/authentication');
const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.get('/api/users/:userId', auth, async (req, res) => {
        const userId = parseInt(req.params.userId);
        const user = await models.User.findByPk(userId);
        const userJson = user.toJSON();
        delete userJson.password;
        res.json(userJson);
    });
}
