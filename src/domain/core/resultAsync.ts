import { Result } from './result';

/**
 Sample code:
async getUsers(): Promise<Result<User[]>> {
  return await ResultAsync(
    this.repo.find().then(users =>
      plainToClass(User, users, { excludeExtraneousValues: true })
    )
  );
}
 */

export async function ResultAsync<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const result = await promise;
    return Result.ok(result);
  } catch (error: any) {
    return Result.fail<T>(error.message || 'Unknown error');
  }
}
