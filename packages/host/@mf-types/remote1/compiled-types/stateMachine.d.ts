type Context = {
    messages: string[];
};
export declare const remote1Machine: import("xstate").StateMachine<Context, import("xstate").AnyEventObject, {}, never, import("xstate").Values<{
    logStart: {
        type: "logStart";
        params: unknown;
    };
    add: {
        type: "add";
        params: unknown;
    };
}>, never, never, "active" | "idle", string, import("xstate").NonReducibleUnknown, import("xstate").NonReducibleUnknown, import("xstate").EventObject, import("xstate").MetaObject, {
    readonly id: "remote1";
    readonly initial: "idle";
    readonly context: {
        readonly messages: [];
    };
    readonly states: {
        readonly idle: {
            readonly on: {
                readonly START: {
                    readonly target: "active";
                    readonly actions: "logStart";
                };
            };
        };
        readonly active: {
            readonly on: {
                readonly STOP: "idle";
                readonly ADD: {
                    readonly actions: "add";
                };
            };
        };
    };
}>;
export declare const remote1Actor: import("xstate").Actor<import("xstate").StateMachine<Context, import("xstate").AnyEventObject, {}, never, import("xstate").Values<{
    logStart: {
        type: "logStart";
        params: unknown;
    };
    add: {
        type: "add";
        params: unknown;
    };
}>, never, never, "active" | "idle", string, import("xstate").NonReducibleUnknown, import("xstate").NonReducibleUnknown, import("xstate").EventObject, import("xstate").MetaObject, {
    readonly id: "remote1";
    readonly initial: "idle";
    readonly context: {
        readonly messages: [];
    };
    readonly states: {
        readonly idle: {
            readonly on: {
                readonly START: {
                    readonly target: "active";
                    readonly actions: "logStart";
                };
            };
        };
        readonly active: {
            readonly on: {
                readonly STOP: "idle";
                readonly ADD: {
                    readonly actions: "add";
                };
            };
        };
    };
}>>;
export type Remote1Event = {
    type: "START";
} | {
    type: "STOP";
};
export type Remote1Context = Record<string, never>;
export {};
