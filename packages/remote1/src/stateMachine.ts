import { createMachine, createActor, assign } from "xstate";

export const remote1Machine = createMachine(
  {
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
  },
  {
    actions: {
      logStart: () => {
        console.log("remote1: START event received");
      },
      add: assign({
        messages: ({ context, event }) => [...context.messages, event.message],
      }),
    },
  }
);

export const remote1Actor = createActor(remote1Machine).start();
export type Remote1Event = { type: "START" } | { type: "STOP" };
export type Remote1Context = Record<string, never>;
