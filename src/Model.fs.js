import { Record, Union } from "./fable_modules/fable-library.4.0.0/Types.js";
import { list_type, record_type, decimal_type, string_type, class_type, union_type } from "./fable_modules/fable-library.4.0.0/Reflection.js";
import { empty } from "./fable_modules/fable-library.4.0.0/List.js";

export class TransactionType extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Income", "Expense"];
    }
}

export function TransactionType$reflection() {
    return union_type("Model.TransactionType", [], TransactionType, () => [[], []]);
}

export class Transaction extends Record {
    "constructor"(Id, Type, Description, Category, Amount, Date$) {
        super();
        this.Id = Id;
        this.Type = Type;
        this.Description = Description;
        this.Category = Category;
        this.Amount = Amount;
        this.Date = Date$;
    }
}

export function Transaction$reflection() {
    return record_type("Model.Transaction", [], Transaction, () => [["Id", class_type("System.Guid")], ["Type", TransactionType$reflection()], ["Description", string_type], ["Category", string_type], ["Amount", decimal_type], ["Date", class_type("System.DateTime")]]);
}

export class Model extends Record {
    "constructor"(Transactions, InputDescription, InputAmount, InputCategory) {
        super();
        this.Transactions = Transactions;
        this.InputDescription = InputDescription;
        this.InputAmount = InputAmount;
        this.InputCategory = InputCategory;
    }
}

export function Model$reflection() {
    return record_type("Model.Model", [], Model, () => [["Transactions", list_type(Transaction$reflection())], ["InputDescription", string_type], ["InputAmount", string_type], ["InputCategory", string_type]]);
}

export const initModel = new Model(empty(), "", "", "");

