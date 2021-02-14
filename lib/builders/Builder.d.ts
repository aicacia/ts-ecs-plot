export declare abstract class Builder<T> {
    protected value: T;
    constructor(value: T);
    update(updater: (value: T) => void): this;
    build(): T;
}
