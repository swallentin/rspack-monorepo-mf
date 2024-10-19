import { createMachine } from "xstate";

export const remote1Machine = createMachine(
  {
    id: "remote1",
    initial: "idle",
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
        on: { STOP: "idle" },
      },
    },
  },
  {
    actions: {
      logStart: () => {
        console.log("remote1: START event received");
      },
    },
  }
);

export type Remote1Event = { type: "START" } | { type: "STOP" };
export type Remote1Context = Record<string, never>;
