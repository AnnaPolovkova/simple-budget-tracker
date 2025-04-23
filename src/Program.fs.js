import { ProgramModule_mkProgram, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";
import { update, init } from "./Update.fs.js";
import { view } from "./View.fs.js";

ProgramModule_run(Program_withReactSynchronous("root", ProgramModule_mkProgram(init, update, view)));

