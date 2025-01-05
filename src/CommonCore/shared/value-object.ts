export abstract class ValueObject<T> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = props;
  }

  get value(): T {
    return this.props;
  }

  equals(valueObject: ValueObject<T>): boolean {
    return this.props === valueObject.props;
  }
}
