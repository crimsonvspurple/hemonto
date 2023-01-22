import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db/db.sqlite',
      autoLoadEntities: true,
      synchronize: true, // TODO: remove this in production or use migrations
    }),
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
