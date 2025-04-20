export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error: string | null;
    private _value: T | null;
  
    private constructor(isSuccess: boolean, error?: string, value?: T) {
      if (isSuccess && error) throw new Error("Successful result can't have error");
      if (!isSuccess && !error) throw new Error("Failed result must have error");
  
      this.isSuccess = isSuccess;
      this.isFailure = !isSuccess;
      this.error = error ?? null;
      this._value = value ?? null;
    }
  
    public getValue(): T {
      if (!this.isSuccess) {
        throw new Error("Can't get value of a failed result.");
      }
      return this._value!;
    }
  
    public static ok<U>(value?: U): Result<U> {
      return new Result<U>(true, undefined, value);
    }
  
    public static fail<U>(error: string): Result<U> {
      return new Result<U>(false, error);
    }
  }
  