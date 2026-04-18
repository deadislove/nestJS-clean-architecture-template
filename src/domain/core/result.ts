export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error: string[] | null; // Changed to string[] to align with CoreResponse
    private _value: T | null;
  
    private constructor(isSuccess: boolean, error?: string | string[], value?: T) { // Adjusted constructor
      if (isSuccess && error && (Array.isArray(error) ? error.length > 0 : !!error)) {
        throw new Error("Successful result can't have error");
      }
      if (!isSuccess && (!error || (Array.isArray(error) && error.length === 0))) {
        throw new Error("Failed result must have error");
      }
  
      this.isSuccess = isSuccess;
      this.isFailure = !isSuccess;
      this.error = (Array.isArray(error) ? error : (error ? [error] : null)); // Ensure it's an array or null
      this._value = value ?? null;
    }
  
    public getValue(): T {
      if (!this.isSuccess) {
        throw new Error("Can't get value of a failed result. Error: " + (this.error ? this.error.join(', ') : 'Unknown error'));
      }
      return this._value!;
    }
  
    public static ok<U>(value?: U): Result<U> {
      return new Result<U>(true, undefined, value);
    }
  
    public static fail<U>(error: string | string[]): Result<U> { // Adjusted fail method
      return new Result<U>(false, error);
    }
  }