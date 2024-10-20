import { createMachine, createActor } from "xstate";
import { send } from "./eventBus";
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
            actions: ["log", "processComplete"],
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
      processComplete: () => {
        send({ type: "PROCESSING_COMPLETE" });
      },
    },
  }
);

export const remote2Actor = createActor(remote2Machine).start();
export type Remote2Event = { type: "PROCESS" } | { type: "COMPLETE" };
export type Remote2Context = Record<string, never>;
