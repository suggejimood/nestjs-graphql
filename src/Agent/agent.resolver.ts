import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Agent } from './agent.entity';
import { AgentService } from './agent.service';
import { CreateAgentInput } from './dto/create-agent.input';
import { UpdateAgentInput } from './dto/update-agent.input';

@Resolver(() => Agent)
export class AgentResolver {
  constructor(private readonly service: AgentService) {}

  @Query(() => [Agent])
  agents() {
    return this.service.findAll();
  }

  @Query(() => Agent)
  agent(@Args('id', { type: () => Int }) id: number) {
    return this.service.findById(id);
  }

  @Mutation(() => Agent)
  createAgent(@Args('input') input: CreateAgentInput) {
    return this.service.create(input);
  }

  @Mutation(() => Agent)
  updateAgent(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateAgentInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteAgent(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
