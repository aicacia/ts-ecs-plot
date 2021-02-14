export abstract class Builder<T> {
  protected value: T;

  constructor(value: T) {
    this.value = value;
  }

  update(updater: (value: T) => void) {
    updater(this.value);
    return this;
  }

  build() {
    return this.value;
  }
}
