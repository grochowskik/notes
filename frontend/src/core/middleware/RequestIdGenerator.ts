class RequestIdGenerator {
  private static counter = 0;
  private static readonly prefix =
    typeof window !== 'undefined' ? `web-${Date.now()}-` : `ssr-${Date.now()}-`;

  static generate(): string {
    this.counter = (this.counter + 1) % 100000;
    return `${this.prefix}${this.counter}`;
  }
}

export default RequestIdGenerator;
