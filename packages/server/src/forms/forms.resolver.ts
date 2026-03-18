import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Form } from './models/form.model';
import { FormsService } from './forms.service';
import { CreateFormInput } from './dto/create-form.input';
import { Response } from './models/response.model';
import { SubmitResponseInput } from './dto/submit-response.input';

@Resolver(() => Form)
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Query(() => [Form])
  forms() {
    return this.formsService.findAllForms();
  }

  @Query(() => Form, { nullable: true })
  form(@Args('id', { type: () => ID }) id: string) {
    return this.formsService.findFormById(id);
  }

  @Query(() => [Response], { name: 'responses' })
  getResponses(@Args('formId', { type: () => ID }) formId: string) {
    return this.formsService.findAllResponses(formId);
  }

  @Mutation(() => Form)
  createForm(@Args('input') input: CreateFormInput) {
    return this.formsService.createForm(input);
  }

  @Mutation(() => Response)
  submitResponse(@Args('input') input: SubmitResponseInput) {
    return this.formsService.submitResponse(input);
  }
}
