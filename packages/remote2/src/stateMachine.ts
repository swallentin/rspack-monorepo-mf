import { createMachine } from "xstate";

export const remote2Machine = createMachine(
  {
    id: "remote2",
    initial: "waiting",
    states: {
      waiting: {
        on: {
          PROCESS: {
            actions: "log",
            target: "processing",
          },
        },
      },
      processing: {
        on: {
          COMPLETE: {
            actions: "log",
            target: "waiting",
          },
        },
      },
    },
  },
  {
    actions: {
      log: ({ event }) => {
        console.log("remote2", event);
      },
    },
  }
);

export type Remote2Event = { type: "PROCESS" } | { type: "COMPLETE" };
export type Remote2Context = Record<string, never>;
