import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
    const app = await NestFactory.create(AppModule);

    const PORT = 3001;

    await app.listen(3001, () => {
        console.log(`Start at http://localhost:${PORT}`);
    });
};

bootstrap();
