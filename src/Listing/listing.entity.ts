import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Agent } from '../Agent/agent.entity';

export enum ListingType {
  RENT = 'RENT',
  SALE = 'SALE',
}
registerEnumType(ListingType, { name: 'ListingType' });

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
}
registerEnumType(PropertyType, { name: 'PropertyType' });

@ObjectType()
@Entity()
export class Listing {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Index({ unique: true })
  @Column({ unique: true })
  slug: string;

  @Field(() => PropertyType)
  @Column({ type: 'text' })
  type: PropertyType;

  @Field(() => ListingType)
  @Column({ type: 'text' })
  listingType: ListingType;

  @Field(() => Float)
  @Column('float')
  price: number;

  @Field(() => Agent)
  @ManyToOne(() => Agent, (a) => a.listings, { eager: true, nullable: false })
  agent: Agent;
}
