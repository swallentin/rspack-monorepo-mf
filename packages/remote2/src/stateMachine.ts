import { assign, createActor, setup } from "xstate";
import { send } from "./eventBus";

type Context = {
  messageToProcess: string;
};

export const remote2Machine = setup({
  types: {
    context: {} as Context,
  },
  actions: {
    log: ({ context, event }) => {
      console.log("remote2", event, context.messageToProcess);
    },
    processComplete: ({ context }) => {
      send({ type: "PROCESSING_COMPLETE", message: context.messageToProcess });
    },
  },
}).createMachine({
  id: "remote2",
  context: {
    messageToProcess: "",
  },
  initial: "waiting",
  states: {
    waiting: {
      on: {
        PROCESS: {
          actions: [
            assign({ messageToProcess: ({ event }) => event.message }),
            "log",
          ],
          target: "processing",
        },
      },
    },
    processing: {
      on: {
        COMPLETE: {
          actions: [
            "processComplete",
            assign({
              messageToProcess: () => "",
            }),
            "log",
          ],
          target: "waiting",
        },
      },
    },
  },
});

export const remote2Actor = createActor(remote2Machine).start();
export type Remote2Event =
  | { type: "PROCESS"; message: string }
  | { type: "COMPLETE" };
export type Remote2Context = Record<string, never>;
