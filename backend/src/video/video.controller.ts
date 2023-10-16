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

import { AddedVideo, RemovedVideo, UpdatedVideo, VideoQuery } from './video.dto';

import { API_KEY, VERSION, YOUTUBE_URL } from 'src/constants';
import { stringify } from 'src/utils/queryString';

@Controller('videos')
export class VideoController {
    @UsePipes(new ValidationPipe())
    @Get()
    async search(@Query() query: VideoQuery) {
        const ytbQuery = {
            ...VideoQuery.plainToClass(query),
            type: 'video',
            part: 'snippet',
            key: API_KEY,
        };

        const queryString = stringify(ytbQuery);

        const res = await Axios.get(`${YOUTUBE_URL}/${VERSION.v3}/search?${queryString}`);
        return res.data;
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async add(@Body() body: AddedVideo) {
        const { id, hasPriority } = AddedVideo.plainToClass(body);

        console.log('POST', body);
        return AddedVideo.plainToClass(body);
    }

    @UsePipes(new ValidationPipe())
    @Put()
    async update(@Body() body: UpdatedVideo) {
        const { id, hasPriority } = UpdatedVideo.plainToClass(body);

        console.log('PUT', body);
        return UpdatedVideo.plainToClass(body);
    }

    @UsePipes(new ValidationPipe())
    @Delete(':id')
    async remove(@Param('id') id: RemovedVideo) {
        console.log('DELETE', { id });
        return id;
    }
}
