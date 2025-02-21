const {logger} = require("../config/logging");

module.exports = {
    async runSeedOnlyInEnv(env, seedCallback) {
        if (process.env.NODE_ENV === env) {
            return seedCallback();
        }
        logger.log("Seeder ignorado por fuera del ambiente development.");
    }
};
