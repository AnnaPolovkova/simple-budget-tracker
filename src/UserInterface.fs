module UserInterface

open Feliz
open Feliz.Bulma
open DomainTypes
open StateManagement
open System
open Fable.Core.JsInterop
open Browser.Types

// Расширенная версия transactionRow с дополнительными возможностями
let transactionRow (dispatch: Msg -> unit) (t: Transaction) =
    Html.tr [
        prop.key (string t.Id)
        prop.className (if t.Type = Income then "income-row" else "expense-row")
        prop.children [
            Html.td [
                prop.style [ style.verticalAlign.middle ]
                prop.children [
                    Html.div [
                        prop.className "is-flex is-align-items-center"
                        prop.children [
                            Html.span [
                                prop.className "icon is-small mr-2"
                                prop.children [
                                    Html.i [ 
                                        prop.className (if t.Type = Income then "fas fa-arrow-down has-text-success" 
                                                      else "fas fa-arrow-up has-text-danger")
                                    ]
                                ]
                            ]
                            Html.span [
                                prop.text t.Description
                                prop.style [ 
                                    style.whiteSpace.nowrap
                                    style.overflow.hidden
                                    style.textOverflow.ellipsis
                                    style.maxWidth 200
                                ]
                            ]
                        ]
                    ]
                ]
            ]
            Html.td [ 
                prop.className (if t.Amount >= 0M then "has-text-success" else "has-text-danger")
                prop.style [ style.fontWeight.bold; style.verticalAlign.middle ]
                prop.text (sprintf "%.2f €" t.Amount) 
            ]
            Html.td [ 
                prop.style [ style.verticalAlign.middle ]
                prop.children [
                    Html.span [
                        prop.className "tag is-rounded"
                        prop.style [ 
                            style.backgroundColor (if String.IsNullOrEmpty(t.Category) then "#f0f0f0" else "#C8C1F4")
                            style.color "#2E2E2E"
                            style.marginLeft 0
                            style.display.inlineBlock
                            style.verticalAlign.middle
                        ]
                        prop.text (if String.IsNullOrEmpty(t.Category) then "Uncategorized" else t.Category
                    ]
                ]
            ]
            Html.td [ 
                prop.style [ style.verticalAlign.middle ]
                prop.text (t.Date.ToString("MM/dd/yyyy")) 
            ]
            Html.td [
                prop.style [ style.textAlign.center; style.verticalAlign.middle ]
                prop.children [
                    Html.button [
                        prop.className "button is-small is-danger is-light"
                        prop.text "❌"
                        prop.onClick (fun _ -> dispatch (RemoveTransaction t.Id))
                        prop.title "Delete transaction"
                    ]
                ]
            ]
        ]
    ]

// Улучшенная версия categoryPieChart с анимациями
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
                style.display.flex
                style.flexDirection.column
                style.alignItems.center
            ]
            prop.children [
                Html.div [
                    prop.style [ style.marginBottom 10 ]
                    prop.children [
                        Html.i [ prop.className "fas fa-chart-pie"; prop.style [ style.fontSize 24; style.color "#ddd" ] ]
                    ]
                ]
                Html.div "No expenses data to display"
                Html.div [
                    prop.className "is-size-7"
                    prop.style [ style.color "#999"; style.marginTop 5 ]
                    prop.text "Add some expenses to see the chart"
                ]
            ]
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
                // Легенда и статистика
                Html.div [
                    prop.style [ style.marginBottom 20 ]
                    prop.children [
                        Html.div [
                            prop.className "is-flex is-justify-content-space-between mb-2"
                            prop.children [
                                Html.span [
                                    prop.className "has-text-weight-bold"
                                    prop.text "Total Expenses:"
                                ]
                                Html.span (sprintf "%.2f €" totalExpenses)
                            ]
                        ]
                        Html.div [
                            prop.className "is-flex is-justify-content-space-between"
                            prop.children [
                                Html.span [
                                    prop.className "has-text-weight-bold"
                                    prop.text "Categories:"
                                ]
                                Html.span (string expenseData.Length)
                            ]
                        ]
                    ]
                ]
                
                // Анимированные полоски прогресса
                Html.div [
                    prop.style [ style.marginTop 30 ]
                    prop.children [
                        for item in expenseData do
                            let percentage = float item.Amount * 100.0 / float totalExpenses
                            Html.div [
                                prop.key item.Category
                                prop.style [ 
                                    style.marginBottom 15 
                                    style.transition "all 0.3s ease"
                                ]
                                prop.children [
                                    Html.div [
                                        prop.style [
                                            style.display.flex
                                            style.justifyContent.spaceBetween
                                            style.marginBottom 5
                                            style.alignItems.center
                                        ]
                                        prop.children [
                                            Html.div [
                                                prop.style [ style.display.flex; style.alignItems.center ]
                                                prop.children [
                                                    Html.div [
                                                        prop.style [
                                                            style.width 12
                                                            style.height 12
                                                            style.backgroundColor item.Color
                                                            style.borderRadius 3
                                                            style.marginRight 8
                                                        ]
                                                    ]
                                                    Html.span [
                                                        prop.style [ style.fontWeight.bold ]
                                                        prop.text item.Category
                                                    ]
                                                ]
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
                                            style.position.relative
                                        ]
                                        prop.children [
                                            Html.div [
                                                prop.style [
                                                    style.width (length.percent percentage)
                                                    style.height (length.percent 100)
                                                    style.backgroundColor item.Color
                                                    style.transition "width 0.5s ease-out"
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                    ]
                ]
            ]
        ]

// Дополнительные компоненты UI
let dateFilterComponent dispatch =
    Bulma.field.div [
        prop.style [ style.marginBottom 20 ]
        prop.children [
            Bulma.label "Filter by Date Range:"
            Bulma.control.div [
                Bulma.columns [
                    columns.isMobile
                    prop.children [
                        Bulma.column [
                            Bulma.input.date [
                                prop.placeholder "Start Date"
                                prop.style [ style.width (length.percent 100) ]
                        ]
                        Bulma.column [
                            Bulma.input.date [
                                prop.placeholder "End Date"
                                prop.style [ style.width (length.percent 100) ]
                            ]
                        ]
                        Bulma.column [
                            column.isNarrow
                            prop.children [
                                Bulma.button.button [
                                    prop.text "Apply"
                                    prop.className "is-primary"
                                    prop.style [ style.width (length.percent 100) ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

let summaryCards (transactions: Transaction list) =
    let income = transactions |> List.filter (fun t -> t.Type = Income) |> List.sumBy (fun t -> t.Amount)
    let expenses = transactions |> List.filter (fun t -> t.Type = Expense) |> List.sumBy (fun t -> t.Amount)
    let balance = income + expenses
    
    Bulma.columns [
        prop.style [ style.marginBottom 20 ]
        prop.children [
            Bulma.column [
                Bulma.card [
                    prop.style [ style.borderRadius 10 ]
                    prop.children [
                        Bulma.cardHeader [
                            Bulma.cardHeaderTitle.div [
                                prop.className "is-size-5"
                                prop.text "Income"
                            ]
                        ]
                        Bulma.cardContent [
                            prop.style [ style.padding "1rem 1.5rem" ]
                            prop.children [
                                Html.div [
                                    prop.className "is-size-3 has-text-success"
                                    prop.text (sprintf "%.2f €" income)
                                ]
                            ]
                        ]
                    ]
                ]
            ]
            Bulma.column [
                Bulma.card [
                    prop.style [ style.borderRadius 10 ]
                    prop.children [
                        Bulma.cardHeader [
                            Bulma.cardHeaderTitle.div [
                                prop.className "is-size-5"
                                prop.text "Expenses"
                            ]
                        ]
                        Bulma.cardContent [
                            prop.style [ style.padding "1rem 1.5rem" ]
                            prop.children [
                                Html.div [
                                    prop.className "is-size-3 has-text-danger"
                                    prop.text (sprintf "%.2f €" (abs expenses))
                                ]
                            ]
                        ]
                    ]
                ]
            ]
            Bulma.column [
                Bulma.card [
                    prop.style [ style.borderRadius 10 ]
                    prop.children [
                        Bulma.cardHeader [
                            Bulma.cardHeaderTitle.div [
                                prop.className "is-size-5"
                                prop.text "Balance"
                            ]
                        ]
                        Bulma.cardContent [
                            prop.style [ style.padding "1rem 1.5rem" ]
                            prop.children [
                                Html.div [
                                    prop.className (if balance >= 0M then "is-size-3 has-text-success" else "is-size-3 has-text-danger")
                                    prop.text (sprintf "%.2f €" balance)
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

// Основной компонент представления
let view (model: DomainTypes.Model) (dispatch: StateManagement.Msg -> unit) =
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
                    Html.div [
                        prop.style [ style.marginBottom 30 ]
                        prop.children [
                            Html.h1 [
                                prop.className "title has-text-centered"
                                prop.style [ 
                                    style.color "#6633DD"
                                    style.marginBottom 10
                                ]
                                prop.text "💰 Budget Tracker"
                            ]
                            Html.p [
                                prop.className "has-text-centered"
                                prop.style [ style.color "#666"; style.marginBottom 20 ]
                                prop.text "Track your income and expenses easily"
                            ]
                        ]
                    ]
                    
                    // Карточки с суммарной информацией
                    summaryCards model.Transactions
                    
                    // Форма добавления транзакций
                    Bulma.field.div [
                        field.isGrouped
                        prop.style [ style.marginBottom 20 ]
                        prop.children [
                            Bulma.control.div [
                                control.isExpanded
                                prop.children [
                                    Bulma.input.text [
                                        prop.placeholder "What was this transaction for?"
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
                                            style.width 120
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
                                            style.width 150
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
                                        style.width 100
                                    ]
                                    prop.text "Add"
                                    prop.onClick (fun _ -> dispatch AddTransaction)
                                ]
                            ]
                        ]
                    ]
                    
                    // Фильтры
                    dateFilterComponent dispatch
                    
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
                                        prop.style [ style.borderRadius 10 ]
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
                                                            Html.th [
                                                                prop.style [ style.textAlign.center ]
                                                                prop.text "Actions"
                                                            ]
                                                        ]
                                                    ]
                                                    Html.tbody [
                                                        if model.Transactions.IsEmpty then
                                                            Html.tr [
                                                                Html.td [
                                                                    prop.colSpan 5
                                                                    prop.className "has-text-centered"
                                                                    prop.style [ 
                                                                        style.color "#999"
                                                                        style.padding 40
                                                                    ]
                                                                    prop.children [
                                                                        Html.div [
                                                                            prop.style [ 
                                                                                style.display.flex
                                                                                style.flexDirection.column
                                                                                style.alignItems.center
                                                                            ]
                                                                            prop.children [
                                                                                Html.i [
                                                                                    prop.className "fas fa-wallet"
                                                                                    prop.style [ 
                                                                                        style.fontSize 24
                                                                                        style.marginBottom 10
                                                                                        style.color "#ddd"
                                                                                    ]
                                                                                ]
                                                                                Html.div "No transactions yet"
                                                                                Html.div [
                                                                                    prop.className "is-size-7"
                                                                                    prop.style [ style.marginTop 5 ]
                                                                                    prop.text "Add your first transaction above"
                                                                                ]
                                                                            ]
                                                                        ]
                                                                    ]
                                                                ]
                                                            ]
                                                        else
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
                                            style.boxShadow "0 2px 3px rgba(10,10,10,0.1)"
                                        ]
                                        prop.children [
                                            Html.h3 [
                                                prop.className "title is-5 has-text-centered"
                                                prop.style [ 
                                                    style.marginBottom 15
                                                    style.color "#6633DD"
                                                ]
                                                prop.text "Expenses Analysis"
                                            ]
                                            categoryPieChart model.Transactions
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
            
            // Футер
            Html.footer [
                prop.style [
                    style.textAlign.center
                    style.padding 15
                    style.color "#6633DD"
                    style.fontSize 14
                    style.marginTop 20
                ]
                prop.children [
                    Html.div "Budget Tracker v1.0"
                    Html.div [
                        prop.className "is-size-7"
                        prop.style [ style.marginTop 5; style.color "#999" ]
                        prop.text "Created with F# and Elmish"
                    ]
                ]
            ]
        ]
    ]