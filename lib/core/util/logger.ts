export class Logger {

  log(msg: string, data?: any) {
    console.log(msg, data)
  }

  info(msg: string, data?: any) {
    console.info(msg, data);
  }

  warning(msg: string, data?: any) {
    console.warn(msg, data);
  }

  debug(msg: string, data?: any) {
    console.debug(msg, data);
  }

  error(msg: string, error: any) {
    if (error) {
      console.error(msg, error);
    } else {
      console.error(msg);
    }
  }
}