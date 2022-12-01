const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    return await bcrypt.hash(password, 10);
}

const compare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    encrypt, compare
}
