import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type PriceFormModel = {
  input: FormControl<number>;
  output: FormControl<number>;
};

export type MetadataFormModel = {
  contextWindow: FormControl<number>;
  maxOutputTokens: FormControl<number>;
  knowledgeCutoff: FormControl<string>;
};

export type ModelFormModel = {
  name: FormControl<string>;
  shortName: FormControl<string>;
  value: FormControl<string>;
  link: FormControl<string>;
  price: FormGroup<PriceFormModel>;
  metadata: FormGroup<MetadataFormModel>;
  developerId: FormControl<string | null>;
};

@Injectable({ providedIn: 'root' })
export class ModelFormService {
  readonly #fb = inject(FormBuilder);

  createForm(): FormGroup<ModelFormModel> {
    return this.#fb.group<ModelFormModel>({
      name: this.#fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(MODEL_NAME_MAX_LENGTH)],
      }),
      shortName: this.#fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(MODEL_SHORT_NAME_MAX_LENGTH)],
      }),
      value: this.#fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(MODEL_VALUE_MAX_LENGTH)],
      }),
      link: this.#fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      price: this.#fb.group<PriceFormModel>({
        input: this.#fb.control(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(PRICE_MIN_VALUE)],
        }),
        output: this.#fb.control(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(PRICE_MIN_VALUE)],
        }),
      }),
      metadata: this.#fb.group<MetadataFormModel>({
        contextWindow: this.#fb.control(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(TOKENS_MIN_VALUE)],
        }),
        maxOutputTokens: this.#fb.control(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(TOKENS_MIN_VALUE)],
        }),
        knowledgeCutoff: this.#fb.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
      developerId: this.#fb.control<string | null>(null, {
        validators: [Validators.required],
      }),
    });
  }
}

const MODEL_NAME_MAX_LENGTH = 100;
const MODEL_SHORT_NAME_MAX_LENGTH = 20;
const MODEL_VALUE_MAX_LENGTH = 100;
const PRICE_MIN_VALUE = 0;
const TOKENS_MIN_VALUE = 1;
