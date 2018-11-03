"use strict";
const plugin = require("./plugin");
module.exports = (pluginHost) => {
    const app = pluginHost.owner;
    app.options.addDeclaration({ name: "preferred-example-language" });
    app.converter.addComponent("example-tag", plugin.ExampleTagPlugin);
};
