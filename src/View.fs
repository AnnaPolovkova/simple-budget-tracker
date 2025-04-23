module View

open Feliz
open Update

let transactionRow (dispatch: Msg -> unit) (t: Transaction) =
    Html.tr [
        Html.td [ prop.text t.Description ]
        Html.td [ prop.text (sprintf "%.2f" t.Amount) ]
        Html.td [ prop.text t.Category ]
        Html.td [ prop.text (t.Date.ToShortDateString()) ]
        Html.td [
            Html.button [
                prop.text "Delete"
                prop.onClick (fun _ -> dispatch (RemoveTransaction t.Id))
            ]
        ]
    ]

let view (model: Model) (dispatch: Msg -> unit) =
    Html.div [
        Html.h1 [ prop.text "💰 Budget Tracker" ]

        Html.div [
            Html.input [
                prop.placeholder "Description"
                prop.value model.InputDescription
                prop.onChange (UpdateDescription >> dispatch)
            ]
            Html.input [
                prop.placeholder "Amount"
                prop.value model.InputAmount
                prop.onChange (UpdateAmount >> dispatch)
                prop.type' "number"
            ]
            Html.input [
                prop.placeholder "Category"
                prop.value model.InputCategory
                prop.onChange (UpdateCategory >> dispatch)
            ]
            Html.button [
                prop.text "Add"
                prop.onClick (fun _ -> dispatch AddTransaction)
            ]
        ]

        Html.table [
            Html.thead [
                Html.tr [
                    Html.th "Description"
                    Html.th "Amount"
                    Html.th "Category"
                    Html.th "Date"
                    Html.th "Action"
                ]
            ]
            Html.tbody [
                for t in model.Transactions -> transactionRow dispatch t
            ]
        ]
    ]
