import { createActor, createMachine } from "xstate";
import { remote1Actor } from "remote1/stateMachine";
import { getEventStream as getRemote1EventStream } from "remote1/eventBus";
import { getEventStream as getRemote2EventStream } from "remote2/eventBus";
import type { Remote1Event } from "remote1/eventBus";
import type { Remote2Event } from "remote2/eventBus";

import { remote2Actor } from "remote2/stateMachine";
import { composeEpic } from "./epicComposer";
import type { Observable } from "rxjs";
import { filter, map, merge } from "rxjs";

type OrchestratorEvent = Remote1Event | Remote2Event;

const appEventStream = merge(getRemote1EventStream(), getRemote2EventStream());

const processingCompleteEpic = appEventStream.pipe(
  filter(
    (event): event is Remote2Event => event.type === "PROCESSING_COMPLETE"
  ),
  map(({ message }) => ({ type: "ADD", message }))
);

// Define the orchestrator machine
const orchestratorMachine = createMachine(
  {
    id: "orchestrator",
    context: {
      unsubscribeEpic: null,
      unsubscribeProcessingCompleteEpic: null,
    },
    initial: "initializing",
    states: {
      initializing: {
        entry: "spawnActors",
        always: "idle",
      },
      idle: {
        on: {
          START_REMOTE1: {
            actions: "startRemote1",
          },
          START_REMOTE2: {
            actions: "startRemote2",
          },
        },
      },
    },
  },
  {
    actions: {
      spawnActors: ({ context }) => {
        const completeToProcessEpic = (input$: Observable<unknown>) =>
          input$.pipe(
            filter((state) => state.matches("active")),
            map(() => ({
              type: "PROCESS",
            }))
          );

        // context.unsubscribeEpic = composeEpic(
        //   remote1Actor,
        //   remote2Actor,
        //   completeToProcessEpic
        // );

        context.unsubscribeProcessingCompleteEpic =
          processingCompleteEpic.subscribe((action) => {
            console.log("processingCompleteEpic", action);
            remote1Actor.send(action);
          });
      },
      startRemote1: () => {
        remote1Actor?.send({ type: "START" });
      },
      startRemote2: () => {
        remote2Actor?.send({ type: "PROCESS" });
      },
    },
  }
);

// Create and start the orchestrator actor
export const orchestratorActor = createActor(orchestratorMachine).start();

orchestratorActor.subscribe((state) => {
  console.log("orchestrator state", state);
});
