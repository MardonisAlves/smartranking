import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JogadoresModule } from './jogadores/jogadores.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URL_MONGODB) , JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
