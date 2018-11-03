"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("typedoc/dist/lib/converter/components");
const converter_1 = require("typedoc/dist/lib/converter/converter");
let ExampleTagPlugin = class ExampleTagPlugin extends components_1.ConverterComponent {
    constructor() {
        super(...arguments);
        this._prefLang = "typescript";
    }
    initialize() {
        this.listenTo(this.owner, {
            [converter_1.Converter.EVENT_BEGIN]: this.onBegin,
            [converter_1.Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
        });
    }
    onBegin() {
        const options = this.application.options;
        const prefLang = options.getValue("preferred-example-language");
        if (prefLang)
            this._prefLang = prefLang;
    }
    onBeginResolve(context) {
        const reflections = context.project.reflections;
        for (const key in reflections) {
            const comment = reflections[key].comment;
            if (!comment || !comment.tags)
                continue;
            const indexes = [];
            comment.tags.forEach((tag, index) => {
                if (tag.tagName !== "example")
                    return;
                indexes.push(index);
            });
            const length = indexes.length;
            if (length === 1) {
                const index = indexes[0];
                comment.text += `#### Example\n\`\`\`${this._prefLang}${comment.tags[index].text}\`\`\``;
                comment.tags.splice(index, 1);
                continue;
            }
            let counter = 0;
            indexes.forEach((index) => {
                comment.text += `#### Example ${++counter}\n\`\`\`${this._prefLang}${comment.tags[index].text}\`\`\``;
                if (counter !== length)
                    comment.text += `\n`;
            });
            indexes.reverse().forEach((index) => comment.tags.splice(index, 1));
        }
    }
};
ExampleTagPlugin = __decorate([
    components_1.Component({ name: "example-tag" })
], ExampleTagPlugin);
exports.ExampleTagPlugin = ExampleTagPlugin;
