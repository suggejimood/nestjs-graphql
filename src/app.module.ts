import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { AgentModule } from './Agent/agent.module';
import { ListingModule } from './Listing/listing.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.SQLITE_PATH ?? 'emlak.db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    HealthModule,
    AgentModule,
    ListingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
