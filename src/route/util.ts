enum ResponseCode {
  Success = 0,
  Failure = 1,
  EmailNotRegistered = 11,
  EmailAlreadyRegisterd = 12,
  PasswordEmpty = 13,
  PasswordMismatch = 14
}


class ResponseJSON {
  code: number
  message: string
  result: Record<string, unknown>

  constructor(code = ResponseCode.Success, message = "请求处理完毕。", result: Record<string, unknown> = {}) {
    this.code = code;
    this.message = message;
    this.result = result;
  }

  static buildSuccessResponse(): ResponseJSON {
    return new ResponseJSON(ResponseCode.Success, "请求处理成功。", {});
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
  ResponseCode,
  ResponseJSON
};
