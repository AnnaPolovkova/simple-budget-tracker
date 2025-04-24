module Update

open Elmish
open Api
open System
open Model

type Msg =
    | AddTransaction
    | UpdateDescription of string
    | UpdateAmount of string
    | UpdateCategory of string
    | RemoveTransaction of Guid
    | LoadFromStorage

let init () =
    let transactions =
        match loadTransactions<Transaction list>() with
        | Some t -> t
        | None -> []
    {
        Transactions = transactions
        InputDescription = ""
        InputAmount = ""
        InputCategory = ""
    }, Cmd.ofMsg LoadFromStorage

let update msg (model: Model) =
    match msg with
    | UpdateDescription desc ->
        { model with InputDescription = desc }, Cmd.none
    | UpdateAmount amount ->
        { model with InputAmount = amount }, Cmd.none
    | UpdateCategory category ->
        { model with InputCategory = category }, Cmd.none
    | AddTransaction ->
        match System.Decimal.TryParse model.InputAmount with
        | true, amount ->
            let newTransaction = {
                Id = Guid.NewGuid()
                Type = Income // Можно добавить выбор типа
                Description = model.InputDescription
                Amount = amount
                Category = model.InputCategory
                Date = DateTime.Now
            }
            let updated = newTransaction :: model.Transactions
            saveTransactions updated
            {
                model with
                    Transactions = updated
                    InputDescription = ""
                    InputAmount = ""
                    InputCategory = ""
            }, Cmd.none
        | _ -> model, Cmd.none
    | RemoveTransaction id ->
        let updated = model.Transactions |> List.filter (fun t -> t.Id <> id)
        saveTransactions updated
        { model with Transactions = updated }, Cmd.none
    | LoadFromStorage ->
        model, Cmd.none