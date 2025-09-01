import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './listing.entity';
import { CreateListingInput } from './dto/create-listing.input';
import { UpdateListingInput } from './dto/update-listing.input';
import { ListingFilterInput } from './dto/listing-filter.input';
import { AgentService } from '../Agent/agent.service';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing) private repo: Repository<Listing>,
    private readonly agentService: AgentService,
  ) {}

  async create(input: CreateListingInput) {
    const agent = await this.agentService.findById(input.agentId);

    const listing = this.repo.create({ ...input, agent });

    return this.repo.save(listing);
  }

  async update(id: number, input: UpdateListingInput) {
    const listing = await this.repo.findOne({ where: { id } });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (input.agentId)
      listing.agent = await this.agentService.findById(input.agentId);
    Object.assign(listing, {
      title: input.title ?? listing.title,
      slug: input.slug ?? listing.slug,
      type: input.type ?? listing.type,
      listingType: input.listingType ?? listing.listingType,
      price: input.price ?? listing.price,
    });

    return this.repo.save(listing);
  }

  async remove(id: number) {
    const listing = await this.repo.findOne({ where: { id } });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    await this.repo.remove(listing);

    return true;
  }

  findBySlug(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }

  async findAll(filter?: ListingFilterInput) {
    const qb = this.repo
      .createQueryBuilder('l')
      .leftJoinAndSelect('l.agent', 'a');

    if (filter?.titleContains) {
      qb.andWhere('LOWER(l.title) LIKE LOWER(:t)', {
        t: `%${filter.titleContains}%`,
      });
    }

    if (filter?.type) {
      qb.andWhere('l.type = :type', { type: filter.type });
    }
    if (filter?.listingType) {
      qb.andWhere('l.listingType = :lt', { lt: filter.listingType });
    }
    if (filter?.minPrice != null) {
      qb.andWhere('l.price >= :min', { min: filter.minPrice });
    }
    if (filter?.maxPrice != null) {
      qb.andWhere('l.price <= :max', { max: filter.maxPrice });
    }

    return qb.getMany();
  }
}
