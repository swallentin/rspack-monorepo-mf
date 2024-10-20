# Project Overview

This project is a micro-frontend architecture designed to enhance modularity and scalability in large-scale web applications. It leverages XState for state management and the concept of epics to facilitate communication between different micro-frontends.

## Current Implementation

### Micro-Frontend Architecture

The application is divided into several micro-frontends, each responsible for a specific domain or feature. This architecture allows teams to work independently and deploy features without affecting the entire application.

### State Management with XState

[XState](https://xstate.js.org/) is used for managing complex state logic. It provides a robust and visual way to handle state transitions, making it easier to understand and maintain the application's state.

#### Example: Defining a State Machine

```typescript
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
```

- **State Machines**: Each micro-frontend can define its own state machine, encapsulating its state logic.
- **Statecharts**: XState's statecharts provide a visual representation of states and transitions, aiding in debugging and documentation.

### Central Orchestrator Machine

The central orchestrator machine acts as the main controller that coordinates the state and actions of various micro-frontends. It uses actors to manage and communicate with individual state machines.

#### Example: Orchestrator Machine with Actors

```typescript
import { createMachine } from "xstate";
import { remote1Actor } from "remote1/stateMachine";

export const orchestratorMachine = createMachine({
  id: "orchestrator",
  initial: "initializing",
  context: {
    remote1Actor: null,
  },
  states: {
    initializing: {
      on: {
        INIT_COMPLETE: "running",
      },
    },
    running: {
      on: {
        START_REMOTE1: {
          actions: (context) => remote1Actor.send("START"),
        },
      },
    },
  },
});
```

- **Actors**: Actors are spawned instances of state machines that can be managed and communicated with by the orchestrator. This allows for modular and isolated state management.

### Inter-Micro-Frontend Communication with Epics

Epics are used to manage asynchronous actions and side effects across micro-frontends. In this project, there are two types of epics:

1. **Event Bus to Actor Message Epics**: These epics map messages from an event bus to actor messages.
2. **State to Actor Action Epics**: These epics map state changes to actions on other actors.

#### Example: Event Bus to Actor Message Epic

```typescript
import type { Observable } from "rxjs";
import { filter, map, merge } from "rxjs";
import { getEventStream as getRemote1EventStream } from "remote1/eventBus";
import { getEventStream as getRemote2EventStream } from "remote2/eventBus";
import type { Remote1Event } from "remote1/eventBus";
import type { Remote2Event } from "remote2/eventBus";

type OrchestratorEvent = Remote1Event | Remote2Event;

const appEventStream = merge(getRemote1EventStream(), getRemote2EventStream());

const processingCompleteEpic = appEventStream.pipe(
  filter(
    (event): event is Remote2Event => event.type === "PROCESSING_COMPLETE"
  ),
  map(() => ({ type: "ADD", message: "some message" }))
);

```

#### Example: State to Actor Action Epic

```typescript
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { State } from "xstate";
import { Remote1Event, Remote2Event } from './eventTypes';

const completeToProcessEpic = (input$: Observable<unknown>) =>
  input$.pipe(
    filter((state) => state.matches("active")),
    map(() => ({
      type: "PROCESS",
    }))
  );
// This epic listens for the 'active' state and triggers a 'PROCESS' event on another machine
composeEpic(
  remote1Actor,
  remote2Actor,
  completeToProcessEpic
);
```

- **State Change Subscription**: Epics subscribe to state changes and can determine if a machine has entered a specific state.
- **Triggering Events**: Upon entering a state, epics can trigger events on other state machines, facilitating communication between micro-frontends.

## Pros and Cons

### Pros

1. **Modularity**: Micro-frontends allow for independent development and deployment, reducing the risk of large-scale failures.
2. **Scalability**: Teams can scale independently, adding new features or micro-frontends as needed.
3. **State Management**: XState provides a clear and maintainable way to manage complex state logic.
4. **Asynchronous Handling**: Epics enable efficient handling of asynchronous operations and side effects.

### Cons

1. **Complexity**: The architecture can introduce complexity, especially in managing shared state and communication between micro-frontends.
2. **Overhead**: There is an initial overhead in setting up the infrastructure for micro-frontends and configuring XState and epics.
3. **Learning Curve**: Teams need to be familiar with XState and reactive programming concepts to effectively use epics.

## Abilities and Use Cases

### Using XState

- **Visual State Management**: XState's visual tools help in understanding and debugging state transitions.
- **Predictable State Logic**: State machines ensure predictable state transitions, reducing bugs and improving reliability.

### Using Epics for Communication

- **Cross-Micro-Frontend Communication**: Epics facilitate communication between micro-frontends without tight coupling.
- **Handling Side Effects**: They are ideal for managing side effects, such as API calls or complex asynchronous workflows.

## Conclusion

This project demonstrates a modern approach to building scalable and maintainable web applications using micro-frontends, XState, and epics. While there are challenges in terms of complexity and learning curve, the benefits of modularity, scalability, and robust state management make it a compelling choice for large-scale applications.

For further details, please refer to the documentation and code examples provided in the repository.

---

Feel free to reach out for any questions or further clarifications.
