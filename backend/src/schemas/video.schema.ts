import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

import { BaseDto } from 'src/base.dto';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video extends BaseDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    @Prop({ required: true })
    videoId: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    @Prop()
    title: string;

    @IsOptional()
    @IsString()
    @Expose()
    @Prop()
    description?: string = '';

    @IsObject()
    @Expose()
    @Prop({ type: Object })
    thumbnails: Record<
        'default' | 'medium' | 'high',
        {
            url: string;
            width: number;
            height: number;
        }
    >;

    @IsOptional()
    @IsBoolean()
    @Expose()
    @Prop()
    highPriority?: boolean;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
