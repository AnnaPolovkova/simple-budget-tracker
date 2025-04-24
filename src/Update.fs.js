import { FSharpRef, Union } from "./fable_modules/fable-library.4.0.0/Types.js";
import { list_type, union_type, class_type, string_type } from "./fable_modules/fable-library.4.0.0/Reflection.js";
import { uncurry, defaultOf } from "./fable_modules/fable-library.4.0.0/Util.js";
import { fromString, Auto_generateBoxedDecoder_Z6670B51 } from "./fable_modules/Thoth.Json.10.4.1/./Decode.fs.js";
import { Transaction, TransactionType, Model, Transaction$reflection } from "./Model.fs.js";
import { saveTransactions, extraCoders } from "./Api.fs.js";
import { toConsole } from "./fable_modules/fable-library.4.0.0/String.js";
import { filter, cons, singleton, empty } from "./fable_modules/fable-library.4.0.0/List.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.4.0.0/cmd.fs.js";
import { tryParse } from "./fable_modules/fable-library.4.0.0/Decimal.js";
import Decimal from "./fable_modules/fable-library.4.0.0/Decimal.js";
import { newGuid } from "./fable_modules/fable-library.4.0.0/Guid.js";
import { now } from "./fable_modules/fable-library.4.0.0/Date.js";

export class Msg extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["AddTransaction", "UpdateDescription", "UpdateAmount", "UpdateCategory", "RemoveTransaction", "LoadFromStorage"];
    }
}

export function Msg$reflection() {
    return union_type("Update.Msg", [], Msg, () => [[], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", class_type("System.Guid")]], []]);
}

export function init() {
    let transactions;
    let matchValue_2;
    const matchValue = localStorage.getItem("transactions");
    if (matchValue === defaultOf()) {
        matchValue_2 = (void 0);
    }
    else {
        const json = matchValue;
        let matchValue_1;
        const decoder = Auto_generateBoxedDecoder_Z6670B51(list_type(Transaction$reflection()), void 0, extraCoders);
        matchValue_1 = fromString(uncurry(2, decoder), json);
        if (matchValue_1.tag === 1) {
            const err = matchValue_1.fields[0];
            toConsole(`Ошибка при декодировании: ${err}`);
            matchValue_2 = (void 0);
        }
        else {
            const t = matchValue_1.fields[0];
            matchValue_2 = t;
        }
    }
    if (matchValue_2 == null) {
        transactions = empty();
    }
    else {
        const t_1 = matchValue_2;
        transactions = t_1;
    }
    return [new Model(transactions, "", "", ""), singleton((dispatch) => {
        dispatch(new Msg(5, []));
    })];
}

export function update(msg, model) {
    switch (msg.tag) {
        case 2: {
            const amount = msg.fields[0];
            return [new Model(model.Transactions, model.InputDescription, amount, model.InputCategory), Cmd_none()];
        }
        case 3: {
            const category = msg.fields[0];
            return [new Model(model.Transactions, model.InputDescription, model.InputAmount, category), Cmd_none()];
        }
        case 0: {
            let matchValue;
            let outArg = new Decimal(0);
            matchValue = [tryParse(model.InputAmount, new FSharpRef(() => outArg, (v) => {
                outArg = v;
            })), outArg];
            if (matchValue[0]) {
                const amount_1 = matchValue[1];
                const newTransaction = new Transaction(newGuid(), new TransactionType(0, []), model.InputDescription, model.InputCategory, amount_1, now());
                const updated = cons(newTransaction, model.Transactions);
                saveTransactions(updated);
                return [new Model(updated, "", "", ""), Cmd_none()];
            }
            else {
                return [model, Cmd_none()];
            }
        }
        case 4: {
            const id = msg.fields[0];
            const updated_1 = filter((t) => (t.Id !== id), model.Transactions);
            saveTransactions(updated_1);
            return [new Model(updated_1, model.InputDescription, model.InputAmount, model.InputCategory), Cmd_none()];
        }
        case 5: {
            return [model, Cmd_none()];
        }
        default: {
            const desc = msg.fields[0];
            return [new Model(model.Transactions, desc, model.InputAmount, model.InputCategory), Cmd_none()];
        }
    }
}

