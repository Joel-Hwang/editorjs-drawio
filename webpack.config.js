const path = require("path")

module.exports = {
    entry: {
        main: "./drawio.js",
    },
    output: {
        filename: "bundle.js",
        path: path.resolve("./dist"),
    },

}