import { resolve } from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import Dotenv from "dotenv-webpack";
import * as dotenv from "dotenv";

export default function(config, env, helpers) {
    // before anything, load the theme specific configuration
    const theme = env.theme ? env.theme : "adams-apple";
    config.resolve.alias["theme"] = env.source(`themes/${theme}`);
    const lifeCycle = env.isProd ? env.lifeCycle : "dev";
    const lifeCycleTheme = lifeCycle ? theme + "." + lifeCycle : theme;
    dotenv.config({ path: `src/themes/${theme}.env` });
    dotenv.config({ path: `src/themes/${lifeCycleTheme}.env` });

    // Switch css-loader for typings-for-css-modules-loader, which is a wrapper
    // that automatically generates .d.ts files for loaded CSS
    helpers.getLoadersByName(config, "css-loader").forEach(({ loader }) => {
        loader.loader = "typings-for-css-modules-loader";
        loader.options = Object.assign(loader.options, {
            camelCase: true,
            banner:
                "// This file is automatically generated from your CSS. Any edits will be overwritten.",
            namedExport: true,
            silent: true
        });
    });

    // Set the html page title to the theme specific site name
    helpers
        .getPluginsByName(config, "HtmlWebpackPlugin")
        .forEach(({ plugin }) => {
            plugin.options.title = process.env.SITE_NAME;
        });

    // Use any `index` file, not just index.js
    config.resolve.alias["preact-cli-entrypoint"] = resolve(
        process.cwd(),
        "src",
        "index"
    );

    const copyList = [
        { from: "themes/common" },
        { from: `themes/${theme}`, force: true }
    ];
    // right now this really only works for adams apple basket/images
    if (!env.isProd) {
        copyList.push({ from: "themes/dev" });
    }
    config.plugins.push(new CopyWebpackPlugin({ patterns: copyList }));

    // first pull from the main production configuration (as the default)
    // but then apply any lifecycle specific overrides
    config.plugins.push(
        new Dotenv({
            path: `src/themes/${lifeCycleTheme}.env`,
            defaults: `src/themes/${theme}.env`
        })
    );

    return config;
}
