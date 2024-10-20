import { Subject } from "rxjs";

export type Remote1Event = { type: "SEND"; payload: string };

const remote1EventBus = new Subject<Remote1Event>();

export const send = (event: Remote1Event) => remote1EventBus.next(event);

export const getEventStream = () => remote1EventBus.asObservable();
