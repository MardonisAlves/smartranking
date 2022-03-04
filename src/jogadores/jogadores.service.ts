import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';


@Injectable()
export class JogadoresService {
	private jogadores: Jogador[] = [];

	
constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

	private readonly logger = new Logger(JogadoresService.name)

	async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
		const { email } = criarJogadorDto
		const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
		if (jogadorEncontrado) {
			return this.atualizar(jogadorEncontrado, criarJogadorDto);
		} else {

			this.criar(criarJogadorDto);
		}
	}

	private criar(criarJogadorDto: CriarJogadorDto): void {
		const { nome, telefoneCelular, email } = criarJogadorDto;
		const jogador: any = {
			_id: uuidv4(),
			nome,
			telefoneCelular,
			email,
			ranking: 'A',
			posicaoRanking: 1,
			urlFotoJogador: 'www.url.com'
		}
		this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
		this.jogadores.push(jogador);
	}

	async consulterJogadores(): Promise<Jogador[]> {
		return this.jogadores;
	}

	private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void {
		const { nome } = criarJogadorDto;
		jogadorEncontrado.nome = nome;

	}

	async consulterJogadoresByEmail(email: string): Promise<Jogador> {
		const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
		console.log(jogadorEncontrado)
		if (!jogadorEncontrado) {
			throw new NotFoundException(`Jogador com email ${email} não foi encontrado`)
		} else {
			return jogadorEncontrado;
		}
	}

	async deletarJogador(email: string): Promise<void> {
		const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
		this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)

	}

}
function InjectModel(arg0: string) {
	throw new Error('Function not implemented.');
}

