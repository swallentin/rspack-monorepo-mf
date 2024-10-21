import { setup, createActor, assign } from "xstate";

type Context = {
  messages: string[];
};

export const remote1Machine = setup({
  types: {
    context: {} as Context,
  },

  actions: {
    logStart: () => {
      console.log("remote1: START event received");
    },
    add: assign({
      messages: ({ context, event }) => [...context.messages, event.message],
    }),
  },
}).createMachine({
  id: "remote1",
  initial: "idle",
  context: {
    messages: [],
  },
  states: {
    idle: {
      on: {
        START: {
          target: "active",
          actions: "logStart",
        },
      },
    },
    active: {
      on: {
        STOP: "idle",
        ADD: {
          actions: "add",
        },
      },
    },
  },
});

export const remote1Actor = createActor(remote1Machine).start();
export type Remote1Event = { type: "START" } | { type: "STOP" };
export type Remote1Context = Record<string, never>;
