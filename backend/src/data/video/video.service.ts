import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Video } from 'src/schemas/video.schema';

@Injectable()
export class VideoService {
    constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

    @UsePipes(new ValidationPipe())
    async add(addVideoDto: Video): Promise<Video> {
        const addedVideo = new this.videoModel(addVideoDto);
        return addedVideo.save();
    }

    @UsePipes(new ValidationPipe())
    async getAll(): Promise<Video[]> {
        return this.videoModel.find().exec();
    }

    @UsePipes(new ValidationPipe())
    async remove(videoId: string): Promise<Video[]> {
        await this.videoModel.deleteOne({ videoId });
        return this.getAll();
    }
}
