
    export type RemoteKeys = 'remote2/Button' | 'remote2/stateMachine';
    type PackageType<T> = T extends 'remote2/stateMachine' ? typeof import('remote2/stateMachine') :T extends 'remote2/Button' ? typeof import('remote2/Button') :any;