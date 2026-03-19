import { Injectable } from '@nestjs/common';
import { Form } from './models/form.model';
import { Response } from './models/response.model';
import { CreateFormInput } from './dto/create-form.input';
import { SubmitResponseInput } from './dto/submit-response.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FormsService {
  private forms: Form[] = [];
  private responses: Response[] = [];

  findAllForms(): Form[] {
    return this.forms;
  }

  findFormById(id: string): Form | undefined {
    return this.forms.find((f) => f.id === id);
  }

  createForm(data: CreateFormInput): Form {
    const newForm: Form = {
      id: uuidv4(),
      title: data.title,
      description: data.description ?? '',
      questions: data.questions.map((q) => ({
        id: uuidv4(),
        title: q.title,
        type: q.type,
        options: q.options ?? [],
      })),
    };
    this.forms.push(newForm);
    return newForm;
  }

  findAllResponses(formId: string): Response[] {
    return this.responses.filter((r) => r.formId === formId);
  }

  submitResponse(input: SubmitResponseInput): Response {
    const form = this.forms.find((f) => f.id === input.formId);
    if (!form) {
      throw new Error('Form not found');
    }
    const newResponse: Response = {
      id: uuidv4(),
      formId: input.formId,
      answers: input.answers.map((a) => ({
        questionId: a.questionId,
        value: a.value,
      })),
      submittedAt: new Date(),
    };
    this.responses.push(newResponse);

    if (!form.responses) {
      form.responses = [];
    }
    form.responses.push(newResponse);
    return newResponse;
  }
}
