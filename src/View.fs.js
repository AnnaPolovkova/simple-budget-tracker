import { createElement } from "react";
import { printf, toText } from "./fable_modules/fable-library.4.0.0/String.js";
import { toShortDateString } from "./fable_modules/fable-library.4.0.0/Date.js";
import { Msg } from "./Update.fs.js";
import { ofArray, singleton } from "./fable_modules/fable-library.4.0.0/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.4.0/./Interop.fs.js";
import { map, delay, toList } from "./fable_modules/fable-library.4.0.0/Seq.js";

export function transactionRow(dispatch, t) {
    let clo, children;
    const children_2 = ofArray([createElement("td", {
        children: t.Description,
    }), createElement("td", {
        children: (clo = toText(printf("%.2f")), clo(t.Amount)),
    }), createElement("td", {
        children: t.Category,
    }), createElement("td", {
        children: toShortDateString(t.Date),
    }), (children = singleton(createElement("button", {
        children: "Delete",
        onClick: (_arg) => {
            dispatch(new Msg(4, [t.Id]));
        },
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
}

export function view(model, dispatch) {
    let children, children_8, children_4, children_2, children_6;
    const children_10 = ofArray([createElement("h1", {
        children: "💰 Budget Tracker",
    }), (children = ofArray([createElement("input", {
        placeholder: "Description",
        value: model.InputDescription,
        onChange: (ev) => {
            dispatch(new Msg(1, [ev.target.value]));
        },
    }), createElement("input", {
        placeholder: "Amount",
        value: model.InputAmount,
        onChange: (ev_1) => {
            dispatch(new Msg(2, [ev_1.target.value]));
        },
        type: "number",
    }), createElement("input", {
        placeholder: "Category",
        value: model.InputCategory,
        onChange: (ev_2) => {
            dispatch(new Msg(3, [ev_2.target.value]));
        },
    }), createElement("button", {
        children: "Add",
        onClick: (_arg) => {
            dispatch(new Msg(0, []));
        },
    })]), createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), (children_8 = ofArray([(children_4 = singleton((children_2 = ofArray([createElement("th", {
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
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    })), (children_6 = toList(delay(() => map((t) => transactionRow(dispatch, t), model.Transactions))), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
    }))]), createElement("table", {
        children: Interop_reactApi.Children.toArray(Array.from(children_8)),
    }))]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_10)),
    });
}

