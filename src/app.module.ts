import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db/db.sqlite',
      autoLoadEntities: true,
      synchronize: true, // TODO: remove this in production or use migrations
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
