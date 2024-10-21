
    export type RemoteKeys = 'remote1/Button' | 'remote1/stateMachine' | 'remote1/eventBus';
    type PackageType<T> = T extends 'remote1/eventBus' ? typeof import('remote1/eventBus') :T extends 'remote1/stateMachine' ? typeof import('remote1/stateMachine') :T extends 'remote1/Button' ? typeof import('remote1/Button') :any;