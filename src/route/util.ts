class ResponseJSON {
  code: number
  message: string
  result: Record<string, any>

  constructor(code = 200, message = "请求处理完毕。", result: Record<string, any> = {}): void {
    this.code = code;
    this.message = message;
    this.result = result;
  }

  setCode(code: number): void {
    this.code = code;
  }

  setMessage(message: string): void {
    this.message = message;
  }

  setResult(result: Record<string, any>): void {
    this.result = result;
  }

  toJSON(): Record<string, any> {
    return {
      code:    this.code,
      message: this.message,
      result:  this.result
    };
  }
}

export {
  ResponseJSON
};
