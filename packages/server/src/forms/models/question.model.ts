import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

registerEnumType(QuestionType, { name: 'QuestionType' });

@ObjectType()
export class Question {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field(() => [String], { nullable: 'itemsAndList' })
  options?: string[];
}
