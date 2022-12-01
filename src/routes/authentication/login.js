const encryption = require("../../tools/encryption");
const jwt = require("jsonwebtoken");
const {models} = require('../../database/sequelize');

module.exports = (app) => {
    app.post("/api/login", (req, res) => {
        models.User.findOne({where: {username: req.body.username}})
            .then(user => {
                if(!user)
                    return res.status(404).json({message: "User not found"});
                encryption.compare(req.body.password, user.password).then(result => {
                    if(result){
                        user = user.toJSON();
                        delete user.password;
                        // JWT{
                        const token = jwt.sign(
                            {userId: user.id},
                            process.env.PRIVATE_KEY,
                            {expiresIn: "24h"}
                        );
                        // Return result
                        return res.json({message: "Successfully login", data: user, token});
                    }
                    return res.status(401).json({message: "Wrong password"});
                }).catch(error => {
                    return res.status(500).json({message: "Invalid password", data: error});
                });
            }).catch(error => {
                return res.status(500).json({message: "Error with database", data: error});
            });
    });
}
