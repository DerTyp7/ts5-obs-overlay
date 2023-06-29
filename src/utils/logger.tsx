export default class Logger {
  // Log message to the console
  public static log(message: string): void {
    console.log(`%c${message}`, "color: gray");
  }

  // Log warning to the console
  public static warn(message: string): void {
    console.warn(`%c${message}`);
  }

  // Log error to the console
  public static error(message: string): void {
    console.error(`%c${message}`);
  }

  // Log message received from the websocket to the console
  public static wsRecieved(wsData: object): void {
    console.log(`%c[WS Recieved]`, "color: #683dad", wsData);
  }

  // Log message sent to the websocket to the console
  public static wsSent(wsData: object): void {
    console.log(`%c[WS Sent]`, "color: #4eb570", wsData);
  }

  // Log message to the console with a timestamp
  public static ts(message: string): void {
    console.log(`%c[TS] ${message}`, "color: #2e6bc7");
  }
}
