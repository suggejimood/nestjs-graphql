import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Listing } from './listing.entity';
import { ListingService } from './listing.service';
import { ListingFilterInput } from './dto/listing-filter.input';
import { CreateListingInput } from './dto/create-listing.input';
import { UpdateListingInput } from './dto/update-listing.input';

@Resolver(() => Listing)
export class ListingResolver {
  constructor(private readonly service: ListingService) {}

  @Query(() => [Listing])
  listings(@Args('filter', { nullable: true }) filter?: ListingFilterInput) {
    return this.service.findAll(filter);
  }

  @Query(() => Listing, { nullable: true })
  listing(@Args('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Mutation(() => Listing)
  createListing(@Args('input') input: CreateListingInput) {
    return this.service.create(input);
  }

  @Mutation(() => Listing)
  updateListing(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateListingInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteListing(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
