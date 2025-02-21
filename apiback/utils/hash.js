const bcrypt = require('bcryptjs');

module.exports = {
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    },
    async verifyPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
};
