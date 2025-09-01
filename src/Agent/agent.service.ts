import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { CreateAgentInput } from './dto/create-agent.input';
import { UpdateAgentInput } from './dto/update-agent.input';

@Injectable()
export class AgentService {
  constructor(@InjectRepository(Agent) private repo: Repository<Agent>) {}

  create(input: CreateAgentInput): Promise<Agent> {
    const agent = this.repo.create(input);

    return this.repo.save(agent);
  }

  async update(id: number, input: UpdateAgentInput) {
    const agent = await this.repo.findOne({ where: { id } });
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    Object.assign(agent, input);
    return this.repo.save(agent);
  }

  findAll(): Promise<Agent[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Agent> {
    const agent = await this.repo.findOne({ where: { id } });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    return agent;
  }

  async remove(id: number): Promise<boolean> {
    const agent = await this.repo.findOne({ where: { id } });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    await this.repo.remove(agent);

    return true;
  }
}
