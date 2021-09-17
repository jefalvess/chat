module.exports = function (app) {
    const cors = require("cors");
    const exec = require("./controllers/exec")
    app.use(cors());
    app.use('/api/', exec)
}