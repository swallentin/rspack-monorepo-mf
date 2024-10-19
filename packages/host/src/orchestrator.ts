import { assign, createActor, createMachine } from "xstate";
import { remote1Machine } from "remote1/stateMachine";
import type { Remote1Event } from "remote1/stateMachine";
import { remote2Machine } from "remote2/stateMachine";
import type { Remote2Event } from "remote2/stateMachine";
import { composeEpic } from "./epicComposer";
import type { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

// Define the orchestrator machine
const orchestratorMachine = createMachine(
  {
    id: "orchestrator",
    context: {
      remote1Actor: null,
      remote2Actor: null,
      unsubscribeEpic: null,
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
        context.remote1Actor = createActor(remote1Machine).start();
        context.remote2Actor = createActor(remote2Machine).start();

        const completeToProcessEpic = (input$: Observable<unknown>) =>
          input$.pipe(
            filter((state) => state.matches("active")),
            map(
              () =>
                ({
                  type: "PROCESS",
                } as Remote2Event)
            )
          );

        context.unsubscribeEpic = composeEpic(
          context.remote1Actor,
          context.remote2Actor,
          completeToProcessEpic
        );
      },
      startRemote1: ({ context }) => {
        console.log("Start Remote 1", context.remote1Actor);
        context.remote1Actor?.send({ type: "START" });
      },
      startRemote2: ({ context }) => {
        console.log("Start Remote 2");
        context.remote2Actor?.send({ type: "PROCESS" });
      },
    },
  }
);

// Create and start the orchestrator actor
export const orchestratorActor = createActor(orchestratorMachine).start();

orchestratorActor.subscribe((state) => {
  console.log("orchestrator state", state);
});
