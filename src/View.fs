module View

open Feliz
open Feliz.Bulma
open Model
open Update

let transactionRow (dispatch: Msg -> unit) (t: Transaction) =
    Html.tr [
        prop.className "is-size-6"
        prop.children [
            Html.td [ prop.text t.Description ]
            Html.td [ 
                prop.className (if t.Amount >= 0M then "has-text-success" else "has-text-danger")
                prop.text (sprintf "%.2f $" t.Amount) 
            ]
            Html.td [ 
                prop.className "tag is-rounded"
                prop.style [ 
                    style.backgroundColor "#C8C1F4"
                    style.color "#2E2E2E"
                ]
                prop.text t.Category 
            ]
            Html.td [ prop.text (t.Date.ToString("dd.MM.yyyy")) ]
            Html.td [
                Html.button [
                    prop.className "button is-small is-danger is-light"
                    prop.text "❌"
                    prop.onClick (fun _ -> dispatch (RemoveTransaction t.Id))
                ]
            ]
        ]
    ]

let view (model: Model) (dispatch: Msg -> unit) =
    Bulma.hero [
        prop.style [
            style.backgroundImage "linear-gradient(135deg, #6633DD 0%, #C8C1F4 100%)"
            style.minHeight (length.vh 100)
        ]
        prop.children [
            Bulma.heroBody [
                Bulma.container [
                    Bulma.box [
                        prop.style [
                            style.boxShadow.none
                            style.borderRadius 15
                        ]
                        prop.children [
                            Html.h1 [
                                prop.className "title has-text-centered"
                                prop.style [ style.color "#6633DD" ]
                                prop.text "💰 Budget Tracker"
                            ]
                            
                            Bulma.field.div [
                                field.isGrouped
                                prop.children [
                                    Bulma.control.div [
                                        control.isExpanded
                                        prop.children [
                                            Bulma.input.text [
                                                prop.placeholder "Description"
                                                prop.value model.InputDescription
                                                prop.onChange (fun (value: string) -> dispatch (UpdateDescription value))
                                                prop.style [ style.borderRadius 10 ]
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
                                                prop.style [ style.borderRadius 10 ]
                                            ]
                                            Bulma.icon [
                                                icon.isLeft
                                                prop.children [
                                                    Html.i [ prop.className "fas fa-dollar-sign" ]
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
                                                prop.style [ style.borderRadius 10 ]
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
                                            ]
                                            prop.text "Add"
                                            prop.onClick (fun _ -> dispatch AddTransaction)
                                        ]
                                    ]
                                ]
                            ]
                            
                            Bulma.table [
                                table.isFullWidth
                                table.isStriped
                                table.isHoverable
                                prop.style [
                                    style.borderRadius 10
                                    style.boxShadow (0, 0, 20, -5, "rgba(102, 51, 221, 0.3)")
                                ]
                                prop.children [
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
                                        for t in model.Transactions |> List.sortByDescending (fun t -> t.Date) -> 
                                            transactionRow dispatch t
                                    ]
                                ]
                            ]
                            
                            Bulma.level [
                                Bulma.levelItem [
                                    Bulma.tag [
                                        tag.isMedium
                                        prop.style [
                                            style.backgroundColor "#C8C1F4"
                                            style.color "#2E2E2E"
                                        ]
                                        prop.children [
                                            Html.span [
                                                prop.text (sprintf "Total: %.2f $" (model.Transactions |> List.sumBy (fun t -> t.Amount)))
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
    ]