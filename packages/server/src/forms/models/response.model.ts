import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Answer {
  @Field(() => ID)
  questionId: string;

  @Field(() => [String])
  value: string[];
}

@ObjectType()
export class Response {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  formId: string;

  @Field(() => [Answer])
  answers: Answer[];

  @Field()
  submittedAt: Date;
}
