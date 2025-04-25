module View

open Feliz
open Feliz.Bulma
open Model
open Update
open System

let transactionRow (dispatch: Msg -> unit) (t: Transaction) =
    Html.tr [
        prop.children [
            Html.td [ prop.text t.Description ]
            Html.td [ 
                prop.className (if t.Amount >= 0M then "has-text-success" else "has-text-danger")
                prop.text (sprintf "%.2f €" t.Amount) 
            ]
            Html.td [ 
                prop.children [
                    Html.span [
                        prop.className "tag is-rounded"
                        prop.style [ 
                            style.backgroundColor "#C8C1F4"
                            style.color "#2E2E2E"
                            style.marginLeft 0
                            style.display.inlineBlock
                            style.verticalAlign.middle
                        ]
                        prop.text (if String.IsNullOrEmpty(t.Category) then "Uncategorized" else t.Category)
                    ]
                ]
            ]
            Html.td [ prop.text (t.Date.ToString("MM/dd/yyyy")) ]
            Html.td [
                prop.style [ style.textAlign.center ]
                prop.children [
                    Html.button [
                        prop.className "button is-small is-danger is-light"
                        prop.text "❌"
                        prop.onClick (fun _ -> dispatch (RemoveTransaction t.Id))
                    ]
                ]
            ]
        ]
    ]

let categoryPieChart (transactions: Transaction list) =
    let expenseData = 
        transactions
        |> List.filter (fun t -> t.Type = Expense)
        |> List.groupBy (fun t -> t.Category)
        |> List.map (fun (category, trans) ->
            {| 
                Category = if String.IsNullOrWhiteSpace(category) then "Uncategorized" else category
                Amount = trans |> List.sumBy (fun t -> abs t.Amount)
                Color = 
                    let hash = (if String.IsNullOrEmpty(category) then "Uncategorized" else category).GetHashCode() |> abs
                    let colors = [| "#FF6384"; "#36A2EB"; "#FFCE56"; "#4BC0C0"; "#9966FF"; "#FF9F40"; "#8AC24A"; "#607D8B"; "#E91E63"; "#9C27B0" |]
                    colors.[hash % colors.Length]
            |})
        |> List.sortByDescending (fun x -> x.Amount)

    if expenseData.IsEmpty then
        Html.div [
            prop.className "has-text-centered"
            prop.style [ 
                style.padding 20
                style.color "#666"
            ]
            prop.text "Add expenses to see the chart"
        ]
    else
        let totalExpenses = expenseData |> List.sumBy (fun x -> x.Amount)
        
        Html.div [
            prop.style [
                style.width (length.percent 100)
                style.maxWidth 500
                style.marginLeft length.auto
                style.marginRight length.auto
            ]
            prop.children [
                for item in expenseData do
                    let percentage = float item.Amount * 100.0 / float totalExpenses
                    Html.div [
                        prop.style [ style.marginBottom 15 ]
                        prop.children [
                            Html.div [
                                prop.style [
                                    style.display.flex
                                    style.justifyContent.spaceBetween
                                    style.marginBottom 5
                                ]
                                prop.children [
                                    Html.span [
                                        prop.style [ style.fontWeight.bold ]
                                        prop.text item.Category
                                    ]
                                    Html.span (sprintf "%.2f € (%.1f%%)" item.Amount percentage)
                                ]
                            ]
                            Html.div [
                                prop.style [
                                    style.width (length.percent 100)
                                    style.height 15
                                    style.backgroundColor "#f0f0f0"
                                    style.borderRadius 5
                                    style.overflow.hidden
                                ]
                                prop.children [
                                    Html.div [
                                        prop.style [
                                            style.width (length.percent percentage)
                                            style.height (length.percent 100)
                                            style.backgroundColor item.Color
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
            ]
        ]

let view (model: Model) (dispatch: Msg -> unit) =
    Html.div [
        prop.style [
            style.display.flex
            style.flexDirection.column
            style.minHeight (length.vh 100)
            style.backgroundColor "#f5f3ff"
            style.padding 20
        ]
        prop.children [
            // Основной контент
            Bulma.box [
                prop.style [
                    style.boxShadow.none
                    style.borderRadius 15
                    style.backgroundColor.white
                    style.padding 20
                    style.flexGrow 1
                ]
                prop.children [
                    // Заголовок и форма ввода
                    Html.h1 [
                        prop.className "title has-text-centered"
                        prop.style [ 
                            style.color "#6633DD"
                            style.marginBottom 20
                        ]
                        prop.text "💰 Budget Tracker"
                    ]
                    
                    // Форма добавления транзакций
                    Bulma.field.div [
                        field.isGrouped
                        prop.style [ style.marginBottom 20 ]
                        prop.children [
                            Bulma.control.div [
                                control.isExpanded
                                prop.children [
                                    Bulma.input.text [
                                        prop.placeholder "Description"
                                        prop.value model.InputDescription
                                        prop.onChange (fun (value: string) -> dispatch (UpdateDescription value))
                                        prop.style [ 
                                            style.borderRadius 10
                                            style.borderColor "#ddd"
                                        ]
                                    ]
                                ]
                            ]
                            Bulma.control.div [
                                control.hasIconsLeft
                                prop.children [
                                    Bulma.input.number [
                                        prop.placeholder "0.00"
                                        prop.value model.InputAmount
                                        prop.onChange (fun (value: string) -> dispatch (UpdateAmount value))
                                        prop.style [ 
                                            style.borderRadius 10
                                            style.borderColor "#ddd"
                                        ]
                                    ]
                                    Bulma.icon [
                                        icon.isLeft
                                        prop.children [
                                            Html.i [ prop.className "fas fa-euro-sign" ]
                                        ]
                                    ]
                                ]
                            ]
                            Bulma.control.div [
                                control.hasIconsLeft
                                prop.children [
                                    Bulma.input.text [
                                        prop.placeholder "Category"
                                        prop.value model.InputCategory
                                        prop.onChange (fun (value: string) -> dispatch (UpdateCategory value))
                                        prop.style [ 
                                            style.borderRadius 10
                                            style.borderColor "#ddd"
                                        ]
                                    ]
                                    Bulma.icon [
                                        icon.isLeft
                                        prop.children [
                                            Html.i [ prop.className "fas fa-tag" ]
                                        ]
                                    ]
                                ]
                            ]
                            Bulma.control.div [
                                Bulma.button.button [
                                    prop.className "is-primary"
                                    prop.style [
                                        style.backgroundColor "#6633DD"
                                        style.borderRadius 10
                                        style.color "white"
                                        style.borderWidth 0
                                    ]
                                    prop.text "Add"
                                    prop.onClick (fun _ -> dispatch AddTransaction)
                                ]
                            ]
                        ]
                    ]
                    
                    // Таблица и график в одной строке
                    Bulma.columns [
                        columns.isDesktop
                        prop.style [ style.marginTop 20 ]
                        prop.children [
                            // Таблица транзакций
                            Bulma.column [
                                column.isTwoThirds
                                prop.children [
                                    Html.div [
                                        prop.className "table-container"
                                        prop.children [
                                            Bulma.table [
                                                table.isFullWidth
                                                table.isStriped
                                                table.isHoverable
                                                prop.style [
                                                    style.borderRadius 10
                                                    style.boxShadow.none
                                                    style.border (1, borderStyle.solid, "#eee")
                                                ]
                                                prop.children [
                                                    Html.thead [
                                                        Html.tr [
                                                            Html.th "Description"
                                                            Html.th "Amount"
                                                            Html.th "Category"
                                                            Html.th "Date"
                                                            Html.th "Delete"
                                                        ]
                                                    ]
                                                    Html.tbody [
                                                        for t in model.Transactions 
                                                            |> List.sortByDescending (fun t -> t.Date) -> 
                                                                transactionRow dispatch t
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                            
                            // График расходов
                            Bulma.column [
                                prop.children [
                                    Html.div [
                                        prop.style [
                                            style.padding 20
                                            style.backgroundColor "#f9f9f9"
                                            style.borderRadius 10
                                            style.height (length.percent 100)
                                        ]
                                        prop.children [
                                            Html.h3 [
                                                prop.className "title is-5 has-text-centered"
                                                prop.style [ 
                                                    style.marginBottom 15
                                                    style.color "#6633DD"
                                                ]
                                                prop.text "Expenses by Category"
                                            ]
                                            categoryPieChart model.Transactions
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                    
                    // Total Balance
                    Html.div [
                        prop.className "has-text-centered"
                        prop.style [ 
                            style.marginTop 20
                            style.backgroundColor.white
                            style.padding 15
                            style.borderRadius 10
                        ]
                        prop.children [
                            let total = model.Transactions |> List.sumBy (fun t -> t.Amount)
                            let color = if total >= 0M then "has-text-success" else "has-text-danger"
                            Html.span [
                                prop.className color
                                prop.text (sprintf "Total Balance: %.2f €" total)
                            ]
                        ]
                    ]
                ]
            ]
            
            // Футер (внизу по центру)
            Html.footer [
                prop.style [
                    style.textAlign.center
                    style.padding 15
                    style.color "#6633DD"
                    style.fontSize 14
                    style.marginTop 20
                ]
                prop.text "Created by Polovkova Anna"
            ]
        ]
    ]