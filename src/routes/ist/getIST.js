const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.get('/api/ist', (req, res) => {
        models.IST.findAll().then(ist => {
            res.status(200).json(ist);
        });
    });
}
