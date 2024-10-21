export type Remote2Event = {
    type: "PROCESSING_COMPLETE";
    message: string;
};
export declare const send: (event: Remote2Event) => void;
export declare const getEventStream: () => import("rxjs").Observable<Remote2Event>;
