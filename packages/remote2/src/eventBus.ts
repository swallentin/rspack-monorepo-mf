import { Subject } from "rxjs";

export type Remote2Event = { type: "PROCESSING_COMPLETE"; message: string };

const remote2EventBus = new Subject<Remote2Event>();

export const send = (event: Remote2Event) => remote2EventBus.next(event);

export const getEventStream = () => remote2EventBus.asObservable();
