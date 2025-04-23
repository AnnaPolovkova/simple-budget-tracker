module Update

open System
open Api
open Elmish

type Transaction = {
    Id: Guid
    Description: string
    Amount: decimal
    Category: string
    Date: DateTime
}

type Model = {
    Transactions: Transaction list
    InputDescription: string
    InputAmount: string
    InputCategory: string
}

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

let update msg model =
    match msg with
    | UpdateDescription desc ->
        { model with InputDescription = desc }, Cmd.none
    | UpdateAmount amt ->
        { model with InputAmount = amt }, Cmd.none
    | UpdateCategory cat ->
        { model with InputCategory = cat }, Cmd.none
    | AddTransaction ->
        match Decimal.TryParse model.InputAmount with
        | true, amt ->
            let newTransaction = {
                Id = Guid.NewGuid()
                Description = model.InputDescription
                Amount = amt
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
        let updated = List.filter (fun t -> t.Id <> id) model.Transactions
        saveTransactions updated
        { model with Transactions = updated }, Cmd.none
    | LoadFromStorage ->
        model, Cmd.none
