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

import {
    AddedVideo,
    RemovedVideo,
    UpdatedVideo,
    VideoQuery,
    VideoReturnType,
    YoutubeVideo,
} from './video.dto';

import { API_KEY, VERSION, YOUTUBE_URL } from 'src/constants';
import { stringify } from 'src/utils/queryString';
import { Video } from 'src/schemas/video.schema';

@Controller('videos')
export class VideoController {
    @UsePipes(new ValidationPipe())
    @Get()
    async search(@Query() query: VideoQuery): Promise<VideoReturnType> {
        const ytbQuery = {
            ...VideoQuery.plainToClass(query),
            type: 'video',
            part: 'snippet',
            key: API_KEY,
        };

        const queryString = stringify(ytbQuery);

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

        console.log('POST', body);
        return AddedVideo.plainToClass(body);
    }

    @UsePipes(new ValidationPipe())
    @Put()
    async update(@Body() body: UpdatedVideo) {
        const video = UpdatedVideo.plainToClass(body);

        console.log('PUT', body);
        return UpdatedVideo.plainToClass(body);
    }

    @UsePipes(new ValidationPipe())
    @Delete(':videoId')
    async remove(@Param('videoId') videoId: RemovedVideo) {
        console.log('DELETE', { videoId });
        return videoId;
    }
}
