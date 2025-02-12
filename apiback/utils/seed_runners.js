module.exports = {
    async runSeedOnlyInEnv(env, seedCallback) {
        if (process.env.NODE_ENV === env) {
            return seedCallback();
        }
        console.log("Seeder ignorado por fuera del ambiente development.");
    }
};
