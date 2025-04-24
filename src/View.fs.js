import { createElement } from "react";
import { createObj } from "./fable_modules/fable-library.4.0.0/Util.js";
import { op_Addition, fromParts, compare } from "./fable_modules/fable-library.4.0.0/Decimal.js";
import Decimal from "./fable_modules/fable-library.4.0.0/Decimal.js";
import { join, printf, toText } from "./fable_modules/fable-library.4.0.0/String.js";
import { compare as compare_1, toString } from "./fable_modules/fable-library.4.0.0/Date.js";
import { Msg } from "./Update.fs.js";
import { sumBy, sortByDescending, filter, map, append as append_1, ofArray, singleton } from "./fable_modules/fable-library.4.0.0/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.4.0/./Interop.fs.js";
import { map as map_1, singleton as singleton_1, append, delay, toList } from "./fable_modules/fable-library.4.0.0/Seq.js";
import { toString as toString_1 } from "./fable_modules/fable-library.4.0.0/Types.js";

export function transactionRow(dispatch, t) {
    let elems, clo, children;
    return createElement("tr", createObj(ofArray([["className", "is-size-6"], (elems = [createElement("td", {
        children: t.Description,
    }), createElement("td", {
        className: (compare(t.Amount, fromParts(0, 0, 0, false, 0)) >= 0) ? "has-text-success" : "has-text-danger",
        children: (clo = toText(printf("%.2f $")), clo(t.Amount)),
    }), createElement("td", {
        className: "tag is-rounded",
        style: {
            backgroundColor: "#C8C1F4",
            color: "#2E2E2E",
        },
        children: t.Category,
    }), createElement("td", {
        children: toString(t.Date, "dd.MM.yyyy"),
    }), (children = singleton(createElement("button", {
        className: "button is-small is-danger is-light",
        children: "❌",
        onClick: (_arg) => {
            dispatch(new Msg(4, [t.Id]));
        },
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function view(model, dispatch) {
    let elems_14, elms_3, elms_2, xs_55, elems_11, xs_40, elems_6, xs_5, elems, xs_1, xs_18, elems_2, xs_9, xs_14, elems_1, xs_31, elems_4, xs_22, xs_27, elems_3, elms, xs_35, xs_44, elems_7, children_3, children_1, children_5, elm, elms_1, xs_49, elems_8, arg_11, clo;
    const xs_61 = ofArray([["style", {
        backgroundImage: "linear-gradient(135deg, #6633DD 0%, #C8C1F4 100%)",
        minHeight: 100 + "vh",
    }], (elems_14 = [(elms_3 = singleton((elms_2 = singleton((xs_55 = ofArray([["style", {
        boxShadow: "none",
        borderRadius: 15,
    }], (elems_11 = [createElement("h1", {
        className: "title has-text-centered",
        style: {
            color: "#6633DD",
        },
        children: "💰 Budget Tracker",
    }), (xs_40 = ofArray([["className", "is-grouped"], (elems_6 = [(xs_5 = ofArray([["className", "is-expanded"], (elems = [(xs_1 = ofArray([["placeholder", "Description"], ["value", model.InputDescription], ["onChange", (ev) => {
        dispatch(new Msg(1, [ev.target.value]));
    }], ["style", {
        borderRadius: 10,
    }]]), createElement("input", createObj(toList(delay(() => append(xs_1, delay(() => append(singleton_1(["type", "text"]), delay(() => singleton_1(["className", join(" ", append_1(singleton("input"), map((arg) => toString_1(arg[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_28) => value_28, xs_1)))))]))))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]), createElement("div", createObj(toList(delay(() => append(xs_5, delay(() => singleton_1(["className", join(" ", append_1(singleton("control"), map((arg_1) => toString_1(arg_1[1]), filter((tupledArg_1) => {
        const v_1 = tupledArg_1[0];
        return v_1 === "className";
    }, map((value_31) => value_31, xs_5)))))])))))))), (xs_18 = ofArray([["className", "has-icons-left"], (elems_2 = [(xs_9 = ofArray([["placeholder", "0.00"], ["value", model.InputAmount], ["onChange", (ev_1) => {
        dispatch(new Msg(2, [ev_1.target.value]));
    }], ["style", {
        borderRadius: 10,
    }]]), createElement("input", createObj(toList(delay(() => append(xs_9, delay(() => append(singleton_1(["type", "number"]), delay(() => singleton_1(["className", join(" ", append_1(singleton("input"), map((arg_2) => toString_1(arg_2[1]), filter((tupledArg_2) => {
        const v_2 = tupledArg_2[0];
        return v_2 === "className";
    }, map((value_44) => value_44, xs_9)))))])))))))))), (xs_14 = ofArray([["className", "is-left"], (elems_1 = [createElement("i", {
        className: "fas fa-dollar-sign",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]), createElement("span", createObj(toList(delay(() => append(xs_14, delay(() => singleton_1(["className", join(" ", append_1(singleton("icon"), map((arg_3) => toString_1(arg_3[1]), filter((tupledArg_3) => {
        const v_3 = tupledArg_3[0];
        return v_3 === "className";
    }, map((value_51) => value_51, xs_14)))))]))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]), createElement("div", createObj(toList(delay(() => append(xs_18, delay(() => singleton_1(["className", join(" ", append_1(singleton("control"), map((arg_4) => toString_1(arg_4[1]), filter((tupledArg_4) => {
        const v_4 = tupledArg_4[0];
        return v_4 === "className";
    }, map((value_54) => value_54, xs_18)))))])))))))), (xs_31 = ofArray([["className", "has-icons-left"], (elems_4 = [(xs_22 = ofArray([["placeholder", "Category"], ["value", model.InputCategory], ["onChange", (ev_2) => {
        dispatch(new Msg(3, [ev_2.target.value]));
    }], ["style", {
        borderRadius: 10,
    }]]), createElement("input", createObj(toList(delay(() => append(xs_22, delay(() => append(singleton_1(["type", "text"]), delay(() => singleton_1(["className", join(" ", append_1(singleton("input"), map((arg_5) => toString_1(arg_5[1]), filter((tupledArg_5) => {
        const v_5 = tupledArg_5[0];
        return v_5 === "className";
    }, map((value_67) => value_67, xs_22)))))])))))))))), (xs_27 = ofArray([["className", "is-left"], (elems_3 = [createElement("i", {
        className: "fas fa-tag",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]), createElement("span", createObj(toList(delay(() => append(xs_27, delay(() => singleton_1(["className", join(" ", append_1(singleton("icon"), map((arg_6) => toString_1(arg_6[1]), filter((tupledArg_6) => {
        const v_6 = tupledArg_6[0];
        return v_6 === "className";
    }, map((value_74) => value_74, xs_27)))))]))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])]), createElement("div", createObj(toList(delay(() => append(xs_31, delay(() => singleton_1(["className", join(" ", append_1(singleton("control"), map((arg_7) => toString_1(arg_7[1]), filter((tupledArg_7) => {
        const v_7 = tupledArg_7[0];
        return v_7 === "className";
    }, map((value_77) => value_77, xs_31)))))])))))))), (elms = singleton((xs_35 = ofArray([["className", "is-primary"], ["style", {
        backgroundColor: "#6633DD",
        borderRadius: 10,
    }], ["children", "Add"], ["onClick", (_arg_8) => {
        dispatch(new Msg(0, []));
    }]]), createElement("button", createObj(toList(delay(() => append(xs_35, delay(() => singleton_1(["className", join(" ", append_1(singleton("button"), map((arg_8) => toString_1(arg_8[1]), filter((tupledArg_8) => {
        const v_8 = tupledArg_8[0];
        return v_8 === "className";
    }, map((value_87) => value_87, xs_35)))))]))))))))), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_6))])]), createElement("div", createObj(toList(delay(() => append(xs_40, delay(() => singleton_1(["className", join(" ", append_1(singleton("field"), map((arg_9) => toString_1(arg_9[1]), filter((tupledArg_9) => {
        const v_9 = tupledArg_9[0];
        return v_9 === "className";
    }, map((value_93) => value_93, xs_40)))))])))))))), (xs_44 = ofArray([["className", "is-fullwidth"], ["className", "is-striped"], ["className", "is-hoverable"], ["style", {
        borderRadius: 10,
        boxShadow: (((((((0 + "px ") + 0) + "px ") + 20) + "px ") + -5) + "px ") + "rgba(102, 51, 221, 0.3)",
    }], (elems_7 = [(children_3 = singleton((children_1 = ofArray([createElement("th", {
        children: ["Description"],
    }), createElement("th", {
        children: ["Amount"],
    }), createElement("th", {
        children: ["Category"],
    }), createElement("th", {
        children: ["Date"],
    }), createElement("th", {
        children: ["Action"],
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_1)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_3)),
    })), (children_5 = toList(delay(() => map_1((t) => transactionRow(dispatch, t), sortByDescending((t_1) => t_1.Date, model.Transactions, {
        Compare: compare_1,
    })))), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_5)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_7))])]), createElement("table", createObj(toList(delay(() => append(xs_44, delay(() => singleton_1(["className", join(" ", append_1(singleton("table"), map((arg_10) => toString_1(arg_10[1]), filter((tupledArg_10) => {
        const v_10 = tupledArg_10[0];
        return v_10 === "className";
    }, map((value_110) => value_110, xs_44)))))])))))))), (elm = [(elms_1 = singleton((xs_49 = ofArray([["className", "is-medium"], ["style", {
        backgroundColor: "#C8C1F4",
        color: "#2E2E2E",
    }], (elems_8 = [createElement("span", {
        children: (arg_11 = sumBy((t_2) => t_2.Amount, model.Transactions, {
            GetZero: () => (new Decimal(0)),
            Add: op_Addition,
        }), (clo = toText(printf("Total: %.2f $")), clo(arg_11))),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_8))])]), createElement("span", createObj(toList(delay(() => append(xs_49, delay(() => singleton_1(["className", join(" ", append_1(singleton("tag"), map((arg_12) => toString_1(arg_12[1]), filter((tupledArg_11) => {
        const v_11 = tupledArg_11[0];
        return v_11 === "className";
    }, map((value_120) => value_120, xs_49)))))]))))))))), createElement("div", {
        className: "level-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], createElement("nav", {
        className: "level",
        children: Interop_reactApi.Children.toArray(Array.from(elm)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_11))])]), createElement("div", createObj(toList(delay(() => append(xs_55, delay(() => singleton_1(["className", join(" ", append_1(singleton("box"), map((arg_13) => toString_1(arg_13[1]), filter((tupledArg_12) => {
        const v_12 = tupledArg_12[0];
        return v_12 === "className";
    }, map((value_129) => value_129, xs_55)))))]))))))))), createElement("div", {
        className: "container",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("div", {
        className: "hero-body",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_14))])]);
    return createElement("section", createObj(toList(delay(() => append(xs_61, delay(() => singleton_1(["className", join(" ", append_1(singleton("hero"), map((arg_14) => toString_1(arg_14[1]), filter((tupledArg_13) => {
        const v_13 = tupledArg_13[0];
        return v_13 === "className";
    }, map((value_138) => value_138, xs_61)))))])))))));
}

