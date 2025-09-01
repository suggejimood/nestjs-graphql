import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { ListingService } from './listing.service';
import { ListingResolver } from './listing.resolver';
import { AgentModule } from '../Agent/agent.module';

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), AgentModule],
  providers: [ListingService, ListingResolver],
})
export class ListingModule {}
