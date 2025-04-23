module Api

open Fable.Core.JsInterop
open Thoth.Json
open System

let extraCoders =
    Extra.empty
    |> Extra.withDecimal

let saveTransactions (transactions: obj) =
    Browser.WebStorage.localStorage.setItem(
        "transactions",
        Encode.Auto.toString(0, transactions, extra = extraCoders)
    )

let inline loadTransactions<'T>() : 'T option =
    match Browser.WebStorage.localStorage.getItem("transactions") with
    | null -> None
    | json ->
        match Decode.Auto.fromString<'T>(json, extra = extraCoders) with
        | Ok t -> Some t
        | Error err ->
            printfn $"Ошибка при декодировании: {err}"
            None
