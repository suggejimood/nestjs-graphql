import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ListingType, PropertyType } from '../listing.entity';

@InputType()
export class UpdateListingInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  slug?: string;

  @Field(() => PropertyType, { nullable: true })
  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType;

  @Field(() => ListingType, { nullable: true })
  @IsOptional()
  @IsEnum(ListingType)
  listingType?: ListingType;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  agentId?: number;
}
