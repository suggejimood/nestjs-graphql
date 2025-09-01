import { Field, Float, InputType } from '@nestjs/graphql';
import { ListingType, PropertyType } from '../listing.entity';

@InputType()
export class ListingFilterInput {
  @Field({ nullable: true })
  titleContains?: string;

  @Field(() => PropertyType, { nullable: true })
  type?: PropertyType;

  @Field(() => ListingType, { nullable: true })
  listingType?: ListingType;

  @Field(() => Float, { nullable: true })
  minPrice?: number;

  @Field(() => Float, { nullable: true })
  maxPrice?: number;
}
