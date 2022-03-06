import { Controller, Post, Get ,Put, Body, Query,Param, Delete,UsePipes,ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador-dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import {ValidationJogadoresPipes} from './pipes/validate-jogadores-pipes';

@Controller('api/v1/jogadores')
export class JogadoresController {

	constructor(private readonly jogadoresservice: JogadoresService) { }

	@Post()
	@UsePipes(ValidationPipe)
	async criarJogador(@Body() criarJogadorDto: CriarJogadorDto):Promise<Jogador>{
		return await this.jogadoresservice.criarJogador(criarJogadorDto)
	}

	@Put('/:_id')
	@UsePipes(ValidationPipe)
	async AtualizarJogador(
		@Param('_id',ValidationJogadoresPipes)_id:string,
		@Body() atualizarJogadorDto: AtualizarJogadorDto):Promise<Jogador>{
		return await this.jogadoresservice.AtualizarJogador(_id,atualizarJogadorDto)
	}

	@Get()
	async consulterJogadores(): Promise<Jogador[]>{
			return await this.jogadoresservice.consulterJogadores();
		
	}

	@Get('/:_id')
	async consulterJogadorId(@Param('_id',ValidationJogadoresPipes)_id: string): Promise<Jogador>{
		return await this.jogadoresservice.consulterJogadoresById(_id);
		
	}

	@Delete('/:_id')
	async deletarJogador(@Param('_id',ValidationJogadoresPipes)_id: string): Promise<any>{
		 await this.jogadoresservice.deletarJogador(_id);
	}
}
