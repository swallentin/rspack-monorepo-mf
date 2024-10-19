import { fromEventPattern } from "rxjs";
import type { Observable } from "rxjs";
import type { ActorRef } from "xstate";
import { filter, map } from "rxjs/operators";

// Define a type for the epic function
type Epic<Input, Output> = (input$: Observable<Input>) => Observable<Output>;

// Define a function to compose epics
export function composeEpic<SourceEvent, TargetEvent>(
  sourceActor: ActorRef<SourceEvent>,
  targetActor: ActorRef<TargetEvent>,
  epic: Epic<SourceEvent, TargetEvent>
) {
  // Create an observable from the source actor

  const sourceObservable = fromEventPattern<SourceEvent>(
    (handler) => sourceActor.subscribe(handler),
    (_, subscription) => subscription.unsubscribe()
  );
  // Use the epic to transform events
  const targetActions$ = epic(sourceObservable);

  // Subscribe to the transformed actions and dispatch to the target actor
  const subscription = targetActions$.subscribe((action) => {
    console.log("Dispatching action to target actor", action);
    targetActor.send(action);
  });
  return () => subscription.unsubscribe();
}
