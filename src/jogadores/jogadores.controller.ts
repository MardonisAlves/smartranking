import { Controller, Post, Get, Body, Query, Delete } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
	constructor(private readonly jogadoresservice: JogadoresService) { }
	@Post()
	async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
		await this.jogadoresservice.criarAtualizarJogador(criarJogadorDto)
	}
	@Get()
	async consulterJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> {
		if (email) {
			return this.jogadoresservice.consulterJogadoresByEmail(email);
		} else {
			return this.jogadoresservice.consulterJogadores();
		}
	}

	@Delete()
	async deletarJogador(@Query('email') email: string): Promise<void> {
		this.jogadoresservice.deletarJogador(email);
	}
}
