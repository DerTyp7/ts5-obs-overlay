export default class Logger {
  // Log message to the console
  public static log(message: string, data: object | null = null): void {
    console.log(`%c${message}`.trim(), "color: gray", data ?? "");
  }

  // Log warning to the console
  public static warn(message: string, data: object | null = null): void {
    console.warn(`%c${message}`.trim(), data ?? "");
  }

  // Log error to the console
  public static error(message: string, data: object | null = null): void {
    console.error(`%c${message}`.trim(), data ?? "");
  }

  // Log message received from the websocket to the console
  public static wsReceived(data: object, message: string | undefined = undefined): void {
    console.log(`%c[WS Recieved] ${message ?? ""}`.trim(), "color: #8258c7", data);
  }

  // Log message sent to the websocket to the console
  public static wsSent(data: object, message: string | undefined = undefined): void {
    console.log(`%c[WS Sent] ${message ?? ""}`.trim(), "color: #4eb570", data);
  }

  // Log message to the console with a timestamp
  public static ts(message: string, data: object | null = null): void {
    console.log(`%c[TS] ${message}`.trim(), "color: #2e6bc7", data ?? "");
  }
}
