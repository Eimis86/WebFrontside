const Promises: Record<string, Promise<any> | undefined> = {};

export function cachePromise<P extends any[], R>(anyPromiseFn: (...args: P) => Promise<R>, key: string) {
    return (...args: P): Promise<R> => {
        if (!Promises[key]) {
            const newPromise = anyPromiseFn(...args);

            newPromise.then(() => {
                delete Promises[key];
            });

            Promises[key] = newPromise;
        }

        return Promises[key] as Promise<R>;
    };
}

export function cacheRequest<P extends any[], R>(anyRequest: (...args: P) => Promise<R>, url: string, method: string) {
    if (method.toUpperCase() !== 'GET') {
        return anyRequest;
    }

    return cachePromise(anyRequest, `${method}:${url}`);

}
