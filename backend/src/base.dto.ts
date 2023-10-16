import { ClassTransformOptions, plainToClass } from 'class-transformer';

export abstract class BaseDto {
    static plainToClass<T>(
        this: new (...args: any[]) => T,
        obj: T,
        options?: ClassTransformOptions
    ): T {
        return plainToClass(this, obj, { excludeExtraneousValues: true, ...options });
    }
}
