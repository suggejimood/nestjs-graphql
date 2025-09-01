import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
  @Query(() => String, { name: 'ping' })
  ping() {
    return 'pong';
  }
}
