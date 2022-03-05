import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class JogadoresService {
	

	constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }


	async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<any> {
		const { email } = criarJogadorDto
		const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
		if (jogadorEncontrado) {
			return this.atualizar(criarJogadorDto);
		} else {

			this.criar(criarJogadorDto);
		}
	}


	 private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

		const jgadorCriado = new this.jogadorModel(criarJogadorDto);
		return await jgadorCriado.save();
		
	}


	async consulterJogadores(): Promise<Jogador[]> {
		return await this.jogadorModel.find().exec();
	}


	private async atualizar( criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
		return await this.jogadorModel.findOneAndUpdate({email:criarJogadorDto.email},
		{$set: CriarJogadorDto}).exec();
		
	}


	async consulterJogadoresByEmail(email: string): Promise<Jogador> {

		const jogadorEncontrado =  await this.jogadorModel.findOne({email}).exec();
		console.log(jogadorEncontrado)
		if (!jogadorEncontrado) {
			throw new NotFoundException(`Jogador com email ${email} não foi encontrado`)
		} else {
			return jogadorEncontrado;
		}
	}


	async deletarJogador(email: string): Promise<void> {

		return await this.jogadorModel.remove({email}).exec();

	}

}


