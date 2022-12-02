const auth = require('../../middlewares/authentication');
const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.post('/api/games', auth, (req, res) => {
        const code = req.body.code;
        models.Game.create({
            code,
            userId: req.user.id
        }).then(game => {
            res.status(201).json(game);
        });
    });
}
