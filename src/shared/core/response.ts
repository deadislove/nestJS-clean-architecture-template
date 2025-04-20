export class CoreResponse<T> {
    constructor(
        public code: number,
        public data: T | null = null,
        public errors: string[] = [],        
    ) {}

    static success<T>(data: T, code = 200) : CoreResponse<T> {
        return new CoreResponse<T>(code, data, []);
    }

    static fail<T>(errors: string[], code:number = 400) : CoreResponse<T> {
        return new CoreResponse<T>(code, null, errors)
    }

    static empty<T>(code: number = 204): CoreResponse<T> {
        return new CoreResponse<T>(code, null, [])
    }
}