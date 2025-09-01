import { Field, Float, InputType } from '@nestjs/graphql';
import { ListingType, PropertyType } from '../listing.entity';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class ListingFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  titleContains?: string;

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
  minPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}
