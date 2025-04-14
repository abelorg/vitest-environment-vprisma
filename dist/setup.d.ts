declare global {
    var vPrismaDelegate: {
        handleTestEvent: (param: {
            name: string;
            test?: any;
        }) => Promise<void>;
    };
    var beforeEach: (fn: () => Promise<void>) => void;
    var afterEach: (fn: () => Promise<void>) => void;
}
