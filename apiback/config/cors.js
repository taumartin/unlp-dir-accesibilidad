const cors = require("cors");

const corsOptions = {
    origin: process.env.CORS_ALLOWED_ORIGIN,
}

module.exports = cors(corsOptions);
