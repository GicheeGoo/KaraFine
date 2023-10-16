import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { BaseDto } from 'src/base.dto';

// https://github.com/typestack/class-validator

export class VideoQuery extends BaseDto {
    @IsOptional()
    @IsString()
    q?: string;

    @IsOptional()
    @IsString()
    pageToken?: string;

    @IsOptional()
    @IsNumber()
    @Min(5)
    maxResults?: number = 10;
}

export class AddedVideo extends BaseDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsOptional()
    @IsBoolean()
    hasPriority?: boolean;
}

export class UpdatedVideo extends BaseDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsBoolean()
    hasPriority: boolean;
}

export class RemovedVideo extends BaseDto {
    @IsNotEmpty()
    id: string;
}
