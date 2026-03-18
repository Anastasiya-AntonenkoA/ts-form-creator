import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Form } from './models/form.model';
import { CreateFormInput } from './dto/create-form.input';
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => Form)
export class FormsResolver {
  private forms: Form[] = [];

  @Query(() => [Form], { name: 'forms' })
  getForms() {
    return this.forms;
  }

  @Query(() => Form, { name: 'form', nullable: true })
  getForm(@Args('id', { type: () => ID }) id: string) {
    return this.forms.find((f) => f.id === id);
  }

  @Mutation(() => Form)
  createForm(@Args('input') input: CreateFormInput) {
    const newForm: Form = {
      id: uuidv4(),
      ...input,
      questions: input.questions.map((q) => ({ ...q, id: uuidv4() })),
    };
    this.forms.push(newForm);
    return newForm;
  }
}
