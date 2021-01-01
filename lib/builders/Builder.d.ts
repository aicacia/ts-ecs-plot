export declare abstract class Builder<T> {
    protected value: T;
    constructor(value: T);
    update(updater: (value: T) => T): this;
    build(): T;
}
