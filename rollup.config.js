import css from "rollup-plugin-import-css";
import livereload from "rollup-plugin-livereload";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import serve from "rollup-plugin-serve";
import styles from "@ironkinoko/rollup-plugin-styles";
import terser from "@rollup/plugin-terser";
import url from "@rollup/plugin-url";

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

const NODE_ENV_PRODUCTION = "production";
const nodeEnv = process.env.NODE_ENV || NODE_ENV_PRODUCTION;
const extensions = [".js", ".jsx", ".ts", ".tsx"];

const config = {
    input: [
        ...(process.env.BABEL_ENV === 'iifeBundled'
            ? [
                'src/typescript/index.iife.tsx'
            ]
            : []),
        ...(process.env.BABEL_ENV === 'umdBundled'
            ? [
                'src/typescript/index.umd.tsx'
            ]
            : []),
        ...(process.env.BABEL_ENV === 'esmBundled'
            ? [
                'src/typescript/index.esm.tsx'
            ]
            : []),
        ...(process.env.BABEL_ENV === 'amdBundled'
            ? [
                'src/typescript/index.amd.tsx'
            ]
            : []),
        ...(process.env.BABEL_ENV === 'cjsBundled'
            ? [
                'src/typescript/index.cjs.tsx'
            ]
            : []),
    ],
    plugins: [
        nodeEnv === "production" && peerDepsExternal(),
        replace({
            "process.env.NODE_ENV": JSON.stringify(nodeEnv),
            preventAssignment: true,
        }),
        json(),
        resolve({
            browser: true,
            extensions,
        }),
        commonjs({
            include: "**/node_modules/**",
        }),
        babel({
            extensions,
            babelHelpers: "runtime",
            include: ["src/**/*"],
        }),
        css(),
        nodeEnv !== "production" &&
        serve({
            open: true,
            verbose: true,
            contentBase: ["", "tests"],
            host: "192.168.10.3",
            port: 8088,
        }),
        url({
            include: ["**/*.woff2"],
            limit: Infinity,
        }),
        styles({
            mode: [
                "inject",
                {
                    singleTag: true,
                    prepend: true,
                },
            ],
        }),
        nodeEnv !== "production" && livereload(),
    ],
    output: [
        ...(process.env.BABEL_ENV === 'esmBundled'
            ? [
                {
                    file: 'dist/esm/index.js',
                    format: 'esm',
                    sourcemap:true,
                    plugins:[terser()]
                },
            ]
            : []),
        ...(process.env.BABEL_ENV === 'umdBundled'
            ? [
                {
                    file: 'dist/umd/index.js',
                    format: 'umd',
                    name: 'stormPlayer',
                    sourcemap:true,
                    plugins:[terser()]
                },
            ]
            : []),
        ...(process.env.BABEL_ENV === 'cjsBundled'
            ? [
                {
                    file: 'dist/cjs/index.js',
                    format: 'cjs',
                    name: 'stormPlayer',
                    sourcemap:true,
                    plugins:[terser()]
                },
            ]
            : []),
        ...(process.env.BABEL_ENV === 'iifeBundled'
            ? [
                {
                    file: 'dist/iife/index.js',
                    format: 'iife',
                    name: 'stormPlayer',
                    sourcemap:true,
                    plugins:[terser()]
                },
            ]
            : []),
        ...(process.env.BABEL_ENV === 'amdBundled'
            ? [
                {
                    file: 'dist/amd/index.js',
                    format: 'amd',
                    name: 'stormPlayer',
                    sourcemap:true,
                    plugins:[terser()]
                },
            ]
            : []),
    ],
};

export default config;
