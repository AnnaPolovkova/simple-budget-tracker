import { newGuid } from "./fable_modules/fable-library.4.0.0/Guid.js";
import { add } from "./fable_modules/fable-library.4.0.0/Map.js";
import { toString, Auto_generateBoxedEncoder_437914C6, decimal } from "./fable_modules/Thoth.Json.10.4.1/./Encode.fs.js";
import { decimal as decimal_1 } from "./fable_modules/Thoth.Json.10.4.1/./Decode.fs.js";
import { empty } from "./fable_modules/Thoth.Json.10.4.1/Extra.fs.js";
import { ExtraCoders } from "./fable_modules/Thoth.Json.10.4.1/Types.fs.js";
import { obj_type } from "./fable_modules/fable-library.4.0.0/Reflection.js";

export const extraCoders = new ExtraCoders((() => {
    let copyOfStruct = newGuid();
    return copyOfStruct;
})(), add("System.Decimal", [decimal, (path) => ((value_1) => decimal_1(path, value_1))], empty.Coders));

export function saveTransactions(transactions) {
    let encoder;
    localStorage.setItem("transactions", (encoder = Auto_generateBoxedEncoder_437914C6(obj_type, void 0, extraCoders, void 0), toString(0, encoder(transactions))));
}

