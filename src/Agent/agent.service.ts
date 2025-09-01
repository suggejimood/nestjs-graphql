import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { CreateAgentInput } from './dto/create-agent.input';

@Injectable()
export class AgentService {
  constructor(@InjectRepository(Agent) private repo: Repository<Agent>) {}

  create(input: CreateAgentInput) {
    const a = this.repo.create(input);
    return this.repo.save(a);
  }

  findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    const agent = await this.repo.findOne({ where: { id } });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    return agent;
  }
}
