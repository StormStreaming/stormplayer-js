module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    esmodules: false,
                },
            },
        ],
        "@babel/preset-react",
        [
            "@babel/preset-typescript",
            {
                isTSX: true,
                allExtensions: true,
            },
        ],
    ],
    plugins: [
        ["@babel/plugin-transform-runtime"],
        [
            "babel-plugin-root-import",
            {
                rootPathPrefix: "@app",
                rootPathSuffix: "src",
            },
        ],
    ],
};