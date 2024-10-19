export declare const remote2Machine: import("xstate").StateMachine<import("xstate").MachineContext, import("xstate").AnyEventObject, Record<string, import("xstate").AnyActorRef>, import("xstate").ProvidedActor, import("xstate").ParameterizedObject, import("xstate").ParameterizedObject, string, import("xstate").StateValue, string, unknown, import("xstate").NonReducibleUnknown, import("xstate").EventObject, import("xstate").MetaObject, any>;
export type Remote2Event = {
    type: "PROCESS";
} | {
    type: "COMPLETE";
};
export type Remote2Context = Record<string, never>;
