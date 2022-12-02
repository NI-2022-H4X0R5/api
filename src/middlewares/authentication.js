const jwt = require("jsonwebtoken");
const {models} = require("../database/sequelize");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).json({message: "No token provided"});
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.PRIVATE_KEY, (error, decodedToken) => {
        if(error)
            return res.status(401).json({message: "Invalid token"});
        const userId = decodedToken.userId;
        if(req.body.id && req.body.id !== userId)
            return res.status(401).json({message: "Invalid user ID"});
        else{
            models.User.findOne({where: {id: userId}}).then(user => {
                user = user.toJSON();
                delete user.password;
                req.user = user;
                return next();
            });
        }
    });
}
