import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Video } from 'src/schemas/video.schema';

type ChangePriorityProps =
    | ({ highPriority: true } & Pick<Video, 'videoId'>)
    | ({ highPriority: false } & Partial<Pick<Video, 'videoId'>>);

@Injectable()
export class VideoService {
    constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

    @UsePipes(new ValidationPipe())
    async add(addVideoDto: Video): Promise<Video> {
        const addedVideo = new this.videoModel(addVideoDto);
        return addedVideo.save();
    }

    @UsePipes(new ValidationPipe())
    async changePriority(data: ChangePriorityProps): Promise<Video | null> {
        const { highPriority, videoId } = data;

        if (highPriority) {
            const [, res] = await Promise.all([
                this.videoModel.findOneAndUpdate({ highPriority }, { highPriority: !highPriority }),
                this.videoModel.findOneAndUpdate({ videoId }, { highPriority }),
            ]);

            return res;
        }

        const filter = videoId ? { videoId } : { highPriority: !highPriority };
        return this.videoModel.findOneAndUpdate(filter, { highPriority });
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
