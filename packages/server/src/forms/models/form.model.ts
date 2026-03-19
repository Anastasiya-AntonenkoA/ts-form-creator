import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Question } from './question.model';
import { Response } from './response.model';

@ObjectType()
export class Form {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Question])
  questions: Question[];

  @Field(() => [Response], { defaultValue: [] })
  responses?: Response[];
}
