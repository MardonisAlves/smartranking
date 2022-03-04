import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import {JogadoresService}   from './jogadores/jogadores.service';
import {MongooseModule} from '@nestjs/mongoose';
import { JogadorSchema } from './jogadores/interfaces/jogador.schema';


@Module({
  imports: [
  MongooseModule.forFeature([{name:'Jogador', schema: JogadorSchema}]),
  MongooseModule.forRoot('mongodb+srv://mardonis:bk6mZsCOsJI7nXor@smartcluster.v298i.mongodb.net/smartranking?retryWrites=true&w=majority'),
  JogadoresModule,
  ],
  controllers: [],
  providers: [JogadoresService],
})
export class AppModule {}
