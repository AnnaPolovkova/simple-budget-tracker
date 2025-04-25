import { createElement } from "react";
import { equals, stringHash, createObj } from "./fable_modules/fable-library.4.0.0/Util.js";
import { toNumber, op_Addition, abs, fromParts, compare } from "./fable_modules/fable-library.4.0.0/Decimal.js";
import Decimal from "./fable_modules/fable-library.4.0.0/Decimal.js";
import { join, isNullOrWhiteSpace, isNullOrEmpty, printf, toText } from "./fable_modules/fable-library.4.0.0/String.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.4.0/./Interop.fs.js";
import { append as append_1, isEmpty, filter, sumBy, map, sortByDescending, ofArray, singleton } from "./fable_modules/fable-library.4.0.0/List.js";
import { compare as compare_1, toString } from "./fable_modules/fable-library.4.0.0/Date.js";
import { Msg } from "./Update.fs.js";
import { List_groupBy } from "./fable_modules/fable-library.4.0.0/Seq2.js";
import { TransactionType } from "./Model.fs.js";
import { map as map_1, append, singleton as singleton_1, collect, delay, toList } from "./fable_modules/fable-library.4.0.0/Seq.js";
import { toString as toString_1 } from "./fable_modules/fable-library.4.0.0/Types.js";

export function transactionRow(dispatch, t) {
    let elems_2, clo, elems, elems_1;
    return createElement("tr", createObj(singleton((elems_2 = [createElement("td", {
        children: t.Description,
    }), createElement("td", {
        className: (compare(t.Amount, fromParts(0, 0, 0, false, 0)) >= 0) ? "has-text-success" : "has-text-danger",
        children: (clo = toText(printf("%.2f €")), clo(t.Amount)),
    }), createElement("td", createObj(singleton((elems = [createElement("span", {
        className: "tag is-rounded",
        style: {
            backgroundColor: "#C8C1F4",
            color: "#2E2E2E",
            marginLeft: 0,
            display: "inline-block",
            verticalAlign: "middle",
        },
        children: isNullOrEmpty(t.Category) ? "Uncategorized" : t.Category,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])))), createElement("td", {
        children: toString(t.Date, "MM/dd/yyyy"),
    }), createElement("td", createObj(ofArray([["style", {
        textAlign: "center",
    }], (elems_1 = [createElement("button", {
        className: "button is-small is-danger is-light",
        children: "❌",
        onClick: (_arg) => {
            dispatch(new Msg(4, [t.Id]));
        },
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))]))));
}

export function categoryPieChart(transactions) {
    let elems_2;
    const expenseData = sortByDescending((x_2) => x_2.value, map((tupledArg) => {
        let hash, value_1, colors;
        const category = tupledArg[0];
        const trans = tupledArg[1];
        const name = isNullOrWhiteSpace(category) ? "Uncategorized" : category;
        const value = sumBy((t_2) => abs(t_2.Amount), trans, {
            GetZero: () => (new Decimal(0)),
            Add: op_Addition,
        });
        return {
            fill: (hash = (((value_1 = (stringHash(isNullOrEmpty(category) ? "Uncategorized" : category) | 0), Math.abs(value_1))) | 0), (colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8AC24A", "#607D8B", "#E91E63", "#9C27B0"], colors[hash % colors.length])),
            name: name,
            value: value,
        };
    }, List_groupBy((t_1) => t_1.Category, filter((t) => equals(t.Type, new TransactionType(1, [])), transactions), {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    })), {
        Compare: compare,
    });
    if (isEmpty(expenseData)) {
        return createElement("div", {
            className: "has-text-centered",
            style: {
                padding: 20,
                color: "#666",
            },
            children: "Add expenses to see the chart",
        });
    }
    else {
        return createElement("div", createObj(ofArray([["className", "chart-bars-container"], ["style", {
            marginTop: 20,
        }], (elems_2 = toList(delay(() => collect((item) => {
            let elems_1, elems, clo, clo_1;
            const percentage = (toNumber(item.value) * 100) / toNumber(sumBy((x_4) => x_4.value, expenseData, {
                GetZero: () => (new Decimal(0)),
                Add: op_Addition,
            }));
            return singleton_1(createElement("div", createObj(ofArray([["className", "chart-bar-wrapper"], ["style", {
                marginBottom: 10,
            }], (elems_1 = [createElement("div", createObj(ofArray([["className", "chart-bar-label"], ["style", {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
            }], (elems = [createElement("span", {
                children: [item.name],
            }), createElement("span", {
                children: [(clo = toText(printf("%.2f € (%.1f%%)")), (clo_1 = clo(item.value), clo_1(percentage)))],
            })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))), createElement("div", {
                className: "chart-bar",
                style: {
                    backgroundColor: item.fill,
                    height: 15,
                    borderRadius: 5,
                    width: percentage + "%",
                },
            })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))));
        }, expenseData))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])));
    }
}

export function view(model, dispatch) {
    let elems_15, xs_65, elems_14, xs_40, elems_6, xs_5, elems, xs_1, xs_18, elems_2, xs_9, xs_14, elems_1, xs_31, elems_4, xs_22, xs_27, elems_3, elms, xs_35, xs_59, elems_12, xs_49, elems_9, elems_8, xs_44, elems_7, children_3, children_1, children_5, xs_55, elems_11, elems_10, elems_13;
    return createElement("div", createObj(ofArray([["style", {
        display: "flex",
        flexDirection: "column",
        minHeight: 100 + "vh",
        backgroundColor: "#f5f3ff",
        padding: 20,
    }], (elems_15 = [(xs_65 = ofArray([["style", {
        boxShadow: "none",
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        padding: 20,
        flexGrow: 1,
    }], (elems_14 = [createElement("h1", {
        className: "title has-text-centered",
        style: {
            color: "#6633DD",
            marginBottom: 20,
        },
        children: "💰 Budget Tracker",
    }), (xs_40 = ofArray([["className", "is-grouped"], ["style", {
        marginBottom: 20,
    }], (elems_6 = [(xs_5 = ofArray([["className", "is-expanded"], (elems = [(xs_1 = ofArray([["placeholder", "Description"], ["value", model.InputDescription], ["onChange", (ev) => {
        dispatch(new Msg(1, [ev.target.value]));
    }], ["style", {
        borderRadius: 10,
        borderColor: "#ddd",
    }]]), createElement("input", createObj(toList(delay(() => append(xs_1, delay(() => append(singleton_1(["type", "text"]), delay(() => singleton_1(["className", join(" ", append_1(singleton("input"), map((arg) => toString_1(arg[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_42) => value_42, xs_1)))))]))))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]), createElement("div", createObj(toList(delay(() => append(xs_5, delay(() => singleton_1(["className", join(" ", append_1(singleton("control"), map((arg_1) => toString_1(arg_1[1]), filter((tupledArg_1) => {
        const v_1 = tupledArg_1[0];
        return v_1 === "className";
    }, map((value_45) => value_45, xs_5)))))])))))))), (xs_18 = ofArray([["className", "has-icons-left"], (elems_2 = [(xs_9 = ofArray([["placeholder", "0.00"], ["value", model.InputAmount], ["onChange", (ev_1) => {
        dispatch(new Msg(2, [ev_1.target.value]));
    }], ["style", {
        borderRadius: 10,
        borderColor: "#ddd",
    }]]), createElement("input", createObj(toList(delay(() => append(xs_9, delay(() => append(singleton_1(["type", "number"]), delay(() => singleton_1(["className", join(" ", append_1(singleton("input"), map((arg_2) => toString_1(arg_2[1]), filter((tupledArg_2) => {
        const v_2 = tupledArg_2[0];
        return v_2 === "className";
    }, map((value_59) => value_59, xs_9)))))])))))))))), (xs_14 = ofArray([["className", "is-left"], (elems_1 = [createElement("i", {
        className: "fas fa-euro-sign",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]), createElement("span", createObj(toList(delay(() => append(xs_14, delay(() => singleton_1(["className", join(" ", append_1(singleton("icon"), map((arg_3) => toString_1(arg_3[1]), filter((tupledArg_3) => {
        const v_3 = tupledArg_3[0];
        return v_3 === "className";
    }, map((value_66) => value_66, xs_14)))))]))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]), createElement("div", createObj(toList(delay(() => append(xs_18, delay(() => singleton_1(["className", join(" ", append_1(singleton("control"), map((arg_4) => toString_1(arg_4[1]), filter((tupledArg_4) => {
        const v_4 = tupledArg_4[0];
        return v_4 === "className";
    }, map((value_69) => value_69, xs_18)))))])))))))), (xs_31 = ofArray([["className", "has-icons-left"], (elems_4 = [(xs_22 = ofArray([["placeholder", "Category"], ["value", model.InputCategory], ["onChange", (ev_2) => {
        dispatch(new Msg(3, [ev_2.target.value]));
    }], ["style", {
        borderRadius: 10,
        borderColor: "#ddd",
    }]]), createElement("input", createObj(toList(delay(() => append(xs_22, delay(() => append(singleton_1(["type", "text"]), delay(() => singleton_1(["className", join(" ", append_1(singleton("input"), map((arg_5) => toString_1(arg_5[1]), filter((tupledArg_5) => {
        const v_5 = tupledArg_5[0];
        return v_5 === "className";
    }, map((value_83) => value_83, xs_22)))))])))))))))), (xs_27 = ofArray([["className", "is-left"], (elems_3 = [createElement("i", {
        className: "fas fa-tag",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]), createElement("span", createObj(toList(delay(() => append(xs_27, delay(() => singleton_1(["className", join(" ", append_1(singleton("icon"), map((arg_6) => toString_1(arg_6[1]), filter((tupledArg_6) => {
        const v_6 = tupledArg_6[0];
        return v_6 === "className";
    }, map((value_90) => value_90, xs_27)))))]))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])]), createElement("div", createObj(toList(delay(() => append(xs_31, delay(() => singleton_1(["className", join(" ", append_1(singleton("control"), map((arg_7) => toString_1(arg_7[1]), filter((tupledArg_7) => {
        const v_7 = tupledArg_7[0];
        return v_7 === "className";
    }, map((value_93) => value_93, xs_31)))))])))))))), (elms = singleton((xs_35 = ofArray([["className", "is-primary"], ["style", {
        backgroundColor: "#6633DD",
        borderRadius: 10,
        color: "white",
        borderWidth: 0,
    }], ["children", "Add"], ["onClick", (_arg_8) => {
        dispatch(new Msg(0, []));
    }]]), createElement("button", createObj(toList(delay(() => append(xs_35, delay(() => singleton_1(["className", join(" ", append_1(singleton("button"), map((arg_8) => toString_1(arg_8[1]), filter((tupledArg_8) => {
        const v_8 = tupledArg_8[0];
        return v_8 === "className";
    }, map((value_105) => value_105, xs_35)))))]))))))))), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_6))])]), createElement("div", createObj(toList(delay(() => append(xs_40, delay(() => singleton_1(["className", join(" ", append_1(singleton("field"), map((arg_9) => toString_1(arg_9[1]), filter((tupledArg_9) => {
        const v_9 = tupledArg_9[0];
        return v_9 === "className";
    }, map((value_111) => value_111, xs_40)))))])))))))), (xs_59 = ofArray([["className", "is-desktop"], ["style", {
        marginTop: 20,
    }], (elems_12 = [(xs_49 = ofArray([["className", "is-two-thirds"], (elems_9 = [createElement("div", createObj(ofArray([["className", "table-container"], (elems_8 = [(xs_44 = ofArray([["className", "is-fullwidth"], ["className", "is-striped"], ["className", "is-hoverable"], ["style", {
        borderRadius: 10,
        boxShadow: "none",
        border: (((1 + "px ") + "solid") + " ") + "#eee",
    }], (elems_7 = [(children_3 = singleton((children_1 = ofArray([createElement("th", {
        children: ["Description"],
    }), createElement("th", {
        children: ["Amount"],
    }), createElement("th", {
        children: ["Category"],
    }), createElement("th", {
        children: ["Date"],
    }), createElement("th", {
        children: ["Delete"],
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
    }, map((value_138) => value_138, xs_44)))))]))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_8))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_9))])]), createElement("div", createObj(toList(delay(() => append(xs_49, delay(() => singleton_1(["className", join(" ", append_1(singleton("column"), map((arg_11) => toString_1(arg_11[1]), filter((tupledArg_11) => {
        const v_11 = tupledArg_11[0];
        return v_11 === "className";
    }, map((value_142) => value_142, xs_49)))))])))))))), (xs_55 = singleton((elems_11 = [createElement("div", createObj(ofArray([["style", {
        padding: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        height: 100 + "%",
    }], (elems_10 = [createElement("h3", {
        className: "title is-5 has-text-centered",
        style: {
            marginBottom: 15,
            color: "#6633DD",
        },
        children: "Expenses by Category",
    }), categoryPieChart(model.Transactions)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_10))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_11))])), createElement("div", createObj(toList(delay(() => append(xs_55, delay(() => singleton_1(["className", join(" ", append_1(singleton("column"), map((arg_12) => toString_1(arg_12[1]), filter((tupledArg_12) => {
        const v_12 = tupledArg_12[0];
        return v_12 === "className";
    }, map((value_162) => value_162, xs_55)))))]))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_12))])]), createElement("div", createObj(toList(delay(() => append(xs_59, delay(() => singleton_1(["className", join(" ", append_1(singleton("columns"), map((arg_13) => toString_1(arg_13[1]), filter((tupledArg_13) => {
        const v_13 = tupledArg_13[0];
        return v_13 === "className";
    }, map((value_165) => value_165, xs_59)))))])))))))), createElement("div", createObj(ofArray([["className", "has-text-centered"], ["style", {
        marginTop: 20,
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 10,
    }], (elems_13 = toList(delay(() => {
        let clo;
        const total = sumBy((t_2) => t_2.Amount, model.Transactions, {
            GetZero: () => (new Decimal(0)),
            Add: op_Addition,
        });
        const color_10 = (compare(total, fromParts(0, 0, 0, false, 0)) >= 0) ? "has-text-success" : "has-text-danger";
        return singleton_1(createElement("span", {
            className: color_10,
            children: (clo = toText(printf("Total Balance: %.2f €")), clo(total)),
        }));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_13))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_14))])]), createElement("div", createObj(toList(delay(() => append(xs_65, delay(() => singleton_1(["className", join(" ", append_1(singleton("box"), map((arg_15) => toString_1(arg_15[1]), filter((tupledArg_14) => {
        const v_14 = tupledArg_14[0];
        return v_14 === "className";
    }, map((value_182) => value_182, xs_65)))))])))))))), createElement("footer", {
        style: {
            textAlign: "center",
            padding: 15,
            color: "#6633DD",
            fontSize: 14 + "px",
            marginTop: 20,
        },
        children: "Created by Polovkova Anna",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_15))])])));
}

