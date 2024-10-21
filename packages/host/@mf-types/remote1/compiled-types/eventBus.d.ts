export type Remote1Event = {
    type: "SEND";
    payload: string;
};
export declare const send: (event: Remote1Event) => void;
export declare const getEventStream: () => import("rxjs").Observable<Remote1Event>;
