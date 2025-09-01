import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { ListingType, PropertyType } from '../listing.entity';

@InputType()
export class CreateListingInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  slug: string;

  @Field(() => PropertyType)
  @IsEnum(PropertyType)
  type: PropertyType;

  @Field(() => ListingType)
  @IsEnum(ListingType)
  listingType: ListingType;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Int)
  @IsPositive()
  agentId: number;
}
