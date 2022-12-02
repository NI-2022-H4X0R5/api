const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.post('/api/ist', (req, res) => {
        models.IST.create(req.body).then(ist => {
            res.status(200).json(ist);
        });
    });
}
