const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.put('/users/:userId', (req, res) => {
        // Update the user in models
        models.User.update(req.body, {where: {id: req.params.userId}}).then(_ => {
            return models.User.findByPk(req.params.userId).then(user => {
                if(user === null)
                    return res.status(404).json({message: "User not found"});
                res.json({message: "Successfully update user", data: user});
            })
        });
    });
}
