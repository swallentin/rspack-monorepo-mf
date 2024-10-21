type Context = {
    messageToProcess: string;
};
export declare const remote2Machine: import("xstate").StateMachine<Context, import("xstate").AnyEventObject, {}, never, import("xstate").Values<{
    log: {
        type: "log";
        params: unknown;
    };
    processComplete: {
        type: "processComplete";
        params: unknown;
    };
}>, never, never, "waiting" | "processing", string, import("xstate").NonReducibleUnknown, import("xstate").NonReducibleUnknown, import("xstate").EventObject, import("xstate").MetaObject, {
    readonly id: "remote2";
    readonly context: {
        readonly messageToProcess: "";
    };
    readonly initial: "waiting";
    readonly states: {
        readonly waiting: {
            readonly on: {
                readonly PROCESS: {
                    readonly actions: readonly [import("xstate").ActionFunction<Context, import("xstate").AnyEventObject, import("xstate").AnyEventObject, undefined, never, never, never, never, never>, "log"];
                    readonly target: "processing";
                };
            };
        };
        readonly processing: {
            readonly on: {
                readonly COMPLETE: {
                    readonly actions: readonly ["processComplete", import("xstate").ActionFunction<Context, import("xstate").AnyEventObject, import("xstate").AnyEventObject, undefined, never, never, never, never, never>, "log"];
                    readonly target: "waiting";
                };
            };
        };
    };
}>;
export declare const remote2Actor: import("xstate").Actor<import("xstate").StateMachine<Context, import("xstate").AnyEventObject, {}, never, import("xstate").Values<{
    log: {
        type: "log";
        params: unknown;
    };
    processComplete: {
        type: "processComplete";
        params: unknown;
    };
}>, never, never, "waiting" | "processing", string, import("xstate").NonReducibleUnknown, import("xstate").NonReducibleUnknown, import("xstate").EventObject, import("xstate").MetaObject, {
    readonly id: "remote2";
    readonly context: {
        readonly messageToProcess: "";
    };
    readonly initial: "waiting";
    readonly states: {
        readonly waiting: {
            readonly on: {
                readonly PROCESS: {
                    readonly actions: readonly [import("xstate").ActionFunction<Context, import("xstate").AnyEventObject, import("xstate").AnyEventObject, undefined, never, never, never, never, never>, "log"];
                    readonly target: "processing";
                };
            };
        };
        readonly processing: {
            readonly on: {
                readonly COMPLETE: {
                    readonly actions: readonly ["processComplete", import("xstate").ActionFunction<Context, import("xstate").AnyEventObject, import("xstate").AnyEventObject, undefined, never, never, never, never, never>, "log"];
                    readonly target: "waiting";
                };
            };
        };
    };
}>>;
export type Remote2Event = {
    type: "PROCESS";
    message: string;
} | {
    type: "COMPLETE";
};
export type Remote2Context = Record<string, never>;
export {};
