import { ConverterComponent } from "typedoc/dist/lib/converter/components";
import { Context } from "typedoc/dist/lib/converter/context";
export declare class ExampleTagPlugin extends ConverterComponent {
    private _prefLang;
    initialize(): void;
    onBegin(): void;
    onBeginResolve(context: Context): void;
}
