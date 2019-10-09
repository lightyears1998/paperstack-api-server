class ResponseJSON {
  code: number
  message: string
  result: Record<string, unknown>

  constructor(code = 200, message = "请求处理完毕。", result: Record<string, unknown> = {}) {
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

  setResult(result: Record<string, unknown>): void {
    this.result = result;
  }

  toJSON(): Record<string, unknown> {
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
