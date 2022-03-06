import { Injectable, Logger, NotFoundException,BadRequestException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador-dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class JogadoresService {
	

	constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

	async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
		const { email } = criarJogadorDto
		const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
		if (jogadorEncontrado) {
			throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`)
		} 
		const criarJogador = new this.jogadorModel(criarJogadorDto);
		return await criarJogador.save();
	}

	async AtualizarJogador(_id:string,  atualizarJogadorDto: AtualizarJogadorDto): Promise<Jogador> {

		const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
		if(!jogadorEncontrado){
			throw new NotFoundException(`O jogador com ${_id} não encontrado`);
		}
		return await this.jogadorModel.findOneAndUpdate({_id},
	 	{$set: atualizarJogadorDto}).exec();
		
	}


	async consulterJogadores(): Promise<Jogador[]> {
		return await this.jogadorModel.find().exec();
	}


	async consulterJogadoresById(_id: string): Promise<Jogador> {
		const jogadorEncontrado =  await this.jogadorModel.findOne({_id}).exec();
		if (!jogadorEncontrado) {
			throw new NotFoundException(`Jogador com_id ${_id} não foi encontrado`)
		} else {
			return jogadorEncontrado;
		}
	}


	async deletarJogador(_id: string): Promise<any> {
		const jogadorEncontrado =  await this.jogadorModel.findOne({_id}).exec();
		if (!jogadorEncontrado) {
			throw new NotFoundException(`Jogador com _id ${_id} não foi encontrado`)
		} else {
			await this.jogadorModel.deleteOne({_id}).exec();
		}

		

	}

}


