import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from '../Listing/listing.entity';

@ObjectType()
@Entity()
export class Agent {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @OneToMany(() => Listing, (l) => l.agent) 
  listings: Listing[];
}
