import { Expose } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

import { BaseDto } from 'src/base.dto';
import { Video } from 'src/schemas/video.schema';

// https://github.com/typestack/class-validator

export class VideoQuery extends BaseDto {
    @IsOptional()
    @IsString()
    @Expose()
    q: string;

    @IsOptional()
    @IsString()
    @Expose()
    pageToken?: string;

    @IsOptional()
    @IsNumber()
    @Min(5)
    @Expose()
    maxResults?: number;
}

export class AddedVideo extends Video {
    @IsOptional()
    @IsBoolean()
    @Expose()
    highPriority?: boolean;
}

export class UpdatedVideo extends BaseDto {
    @IsNotEmpty()
    @Expose()
    videoId: string;

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    highPriority: boolean;
}

export class RemovedVideo extends BaseDto {
    @IsNotEmpty()
    @Expose()
    videoId: string;
}

export class VideoReturnType extends BaseDto {
    @IsArray()
    @Expose()
    items: Video[];

    @IsNotEmpty()
    @Expose()
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}

export class YoutubeVideo {
    id: {
        videoId: string;
    };

    snippet: Omit<Video, 'videoId'>;
}
