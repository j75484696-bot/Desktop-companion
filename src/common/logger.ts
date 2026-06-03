export class Logger {
  constructor(private module: string) {}

  log(message: string, ...args: any[]): void {
    console.log(`[${this.module}] ${message}`, ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.warn(`[${this.module}] ${message}`, ...args);
  }

  error(message: string, error?: Error): void {
    console.error(`[${this.module}] ${message}`, error);
  }

  debug(message: string, ...args: any[]): void {
    console.debug(`[${this.module}] ${message}`, ...args);
  }
}
