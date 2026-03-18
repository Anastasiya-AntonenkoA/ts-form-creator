import { InputType, Field } from '@nestjs/graphql';
import { QuestionType } from '../models/question.model';

@InputType()
class QuestionInput {
  @Field()
  title: string;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field(() => [String], { nullable: true })
  options?: string[];
}

@InputType()
export class CreateFormInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [QuestionInput])
  questions: QuestionInput[];
}
