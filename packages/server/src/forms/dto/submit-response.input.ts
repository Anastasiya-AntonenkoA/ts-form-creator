import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
class AnswerInput {
  @Field(() => ID)
  questionId: string;

  @Field(() => [String])
  value: string[];
}

@InputType()
export class SubmitResponseInput {
  @Field(() => ID)
  formId: string;

  @Field(() => [AnswerInput])
  answers: AnswerInput[];
}
