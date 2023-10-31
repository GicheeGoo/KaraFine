import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import Axios from 'axios';

import { AddedVideo, UpdatedVideo, VideoQuery, VideoReturnType, YoutubeVideo } from './video.dto';

import { API_KEY, VERSION, YOUTUBE_URL } from 'src/constants';
import { stringify } from 'src/utils/queryString';
import { Video } from 'src/schemas/video.schema';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}

    @UsePipes(new ValidationPipe())
    @Get()
    async search(@Query() query: VideoQuery): Promise<VideoReturnType> {
        const ytbQuery = {
            ...VideoQuery.plainToClass(query),
            type: 'video',
            part: 'snippet',
            key: API_KEY,
        };

        const { maxResults = 10 } = ytbQuery;

        const queryString = stringify({ ...ytbQuery, maxResults });

        const res = await Axios.get(`${YOUTUBE_URL}/${VERSION.v3}/search?${queryString}`);
        if (!res?.data) {
            return VideoReturnType.plainToClass({
                items: [],
                pageInfo: { totalResults: 0, resultsPerPage: 0 },
            });
        }

        const pageInfo = res.data.pageInfo;
        let items = res.data.items;

        items = items.map(({ id, snippet }: YoutubeVideo) =>
            Video.plainToClass({ ...id, ...snippet })
        );

        return VideoReturnType.plainToClass({ items, pageInfo });
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async add(@Body() body: AddedVideo) {
        const video = AddedVideo.plainToClass(body);
        const { description = '', highPriority } = video;

        if (highPriority) {
            await this.videoService.changePriority({ highPriority: false });
        }

        const result = await this.videoService.add({ ...video, description, highPriority });

        return Video.plainToClass(result);
    }

    @UsePipes(new ValidationPipe())
    @Put()
    async update(@Body() body: UpdatedVideo) {
        const data = UpdatedVideo.plainToClass(body);
        const res = await this.videoService.changePriority(data);
        if (!res) {
            throw new Error('Update failed');
        }

        return Video.plainToClass(res);
    }

    @UsePipes(new ValidationPipe())
    @Delete(':videoId')
    async remove(@Param('videoId') videoId: string) {
        const list = await this.videoService.remove(videoId);
        return list.map((video) => Video.plainToClass(video));
    }
}
