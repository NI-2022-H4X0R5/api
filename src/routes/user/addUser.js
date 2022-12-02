const {models} = require('../../database/sequelize');
const {encrypt} = require('../../tools/encryption');

module.exports = (app) => {
    app.post('/api/users', async (req, res) => {
        const {username, password} = req.body;
        if (!username || !password)
            return res.status(400).json({message: "Missing username or password"});
        const userCheck = await models.User.findOne({where: {username: req.body.username}})
        if(!userCheck)
            return res.status(400).json({message: "Username already exists"});
        const encryptedPassword = await encrypt(password);
        const user = await models.User.create({username, password: encryptedPassword});
        const jsonUser = user.toJSON();
        delete jsonUser.password;
        return res.status(201).json(jsonUser);
    });
}
