module Program

open Elmish
open Elmish.React
open Update
open View

Program.mkProgram init update view
|> Program.withReactSynchronous "root"
|> Program.run