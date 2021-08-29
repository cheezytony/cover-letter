/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  FormHTMLAttributes, HTMLAttributes, LabelHTMLAttributes, useEffect, useRef,
} from 'react';
import { InputValue } from './input';
import './form.sass';

export interface FormGroupInterface extends HTMLAttributes<HTMLDivElement> {
  field?: FormField
  value?: InputValue
}

export interface FormInterface extends FormHTMLAttributes<HTMLFormElement> {
}

export type FormField = {
  errors: FormValidationErrors
  name: string
  rules: FormValidationRuleName[]
  touched: boolean
  valid: boolean
  value: InputValue
}

export type FormFields = {
  [key: string]: FormField
}

export type FormFieldsUpdateParam = {
  [key: string]: {
    rules?: FormValidationRuleName[],
    value: InputValue
  }
}

export type FormFieldParam = {
  rules?: FormValidationRuleName[],
  value: InputValue
}

export type FormFieldParams = {
  [key: string]: FormFieldParam
}

export type FormState = {
  fields: FormFields
  loading: boolean
  touched: boolean
  valid: boolean
}

export type FormValidationErrors = {
  [key: string]: string
}

export type FormValidationRuleName = 'required' | 'nullable' | `requiredIf:${string},${string}`
  | `minCharacters:${number}` | `maxCharacters:${number}` | `exactCharacters:${number}`
  | `greaterThan:${number}` | `lessThan:${number}` | `equalTo:${number}`
  | `laterThan:${string}` | `earlierThan:${string}` | `on:${string}`
  | 'numbers' | 'alphabets' | 'alhabetsNumbers' | 'alphabetsNumbersSpecialCharacters';

export type FormValidationRule = {
  // eslint-disable-next-line no-unused-vars
  test: (value: InputValue, args: string, field: FormField) => boolean
  // eslint-disable-next-line no-unused-vars
  message: (value: InputValue, args: string, field: FormField) => string
}

export type FormValidationRules = {
  [key: string]: FormValidationRule
}

export type FormValues = {
  [key: string]: InputValue
}

export const validationRules: FormValidationRules = {
  nullable: {
    test: () => true,
    message: () => '',
  },
  required: {
    test: (value) => !!value,
    message: () => 'this field is required',
  },
};

export const createForm = (formFields: FormFieldParams) => {
  const fields: FormFields = {};
  Object.keys(formFields).forEach((name) => {
    const field = formFields[name];
    fields[name] = {
      ...field,
      name,
      rules: field.rules || ['required'],
      errors: {},
      touched: false,
      valid: false,
    };
  });

  const form: FormState = {
    fields,
    loading: false,
    touched: false,
    valid: false,
  };

  return form;
};

export const getFormValues = ({ fields }: FormState) => {
  const values: FormValues = {};
  Object.keys(fields).forEach((key) => {
    values[key] = fields[key].value;
  });
  return values;
};

export const updateField = (form: FormState, name: string, value: InputValue): FormState => {
  const field = form.fields[name];
  if (!field) {
    throw new Error(`Unknown field ${name} in field list`);
  }

  const validatedField = validateField({
    ...field,
    touched: true,
    value,
  });

  return {
    ...form,
    fields: {
      ...form.fields,
      [name]: validatedField,
    },
  };
};

export const updateFields = (form: FormState, fields: FormFieldsUpdateParam): FormState => {
  // Create a map of fields to update.
  const updatedFields: FormFields = {};
  // Loop through provided fields.
  Object.keys(fields).forEach((name) => {
    // Get current field.
    const field = fields[name];
    // Find current field in form.
    const formField = form.fields[name];
    // Throw an error if the specified field doesn't exist in the form.
    if (!formField) {
      throw new Error(`Unkown field ${name} in form`);
    }
    // Add updated field to the map.
    updatedFields[name] = {
      ...formField,
      ...field,
    };
  });
  // Return an updated form with the updated fields.
  return {
    ...form,
    fields: {
      ...form.fields,
      ...updatedFields,
    },
  };
};

export const validateField = (field: FormField): FormField => {
  // Define new errors.
  const errors: FormValidationErrors = {};
  // Define field validity.
  let isValid = true;
  // Process all rules.
  field.rules.forEach((rule) => {
    // Split the rule to get the rule name and arguments.
    const [ruleName, ruleArguments] = rule.split(':');
    // Find the chosen rule from the rule database.
    const validationRule = validationRules[ruleName];
    // Determine rule validity.
    const isRuleValid = validationRule.test(field.value, ruleArguments, field);
    // If rule is invalid get the error message and append to error bad.
    if (!isRuleValid) {
      errors[ruleName] = validationRule.message(field.value, ruleArguments, field);
      // Set the field validity to false
      isValid = false;
    }
  });
  // Return a new field with the same origin properties and current errors and validity.
  return {
    ...field,
    errors,
    valid: isValid,
  };
};

export const valdiateForm = (form: FormState): FormState => {
  // Duplication instance of the form to avoid 'no-param-reassign' error.
  const validatedForm = { ...form, valid: true };

  // Loop through all fields.
  Object.keys(form.fields).forEach((name) => {
    // Get current field.
    const field = form.fields[name];
    // Validate current field.
    const validatedField = validateField(field);
    // Updated validated field on the form.
    validatedForm.fields[name] = validatedField;
    // Set the validity of the form.
    // If the form validity is currently false, it remains false.
    validatedForm.valid = validatedForm.valid ? validatedField.valid : false;
  });

  return validatedForm;
};

export function Form({ children, onSubmit, ...props }: FormInterface) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // console.log(formRef);
  });

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
}

export function FormGroup({ children, field }: FormGroupInterface) {
  const { errors } = field || {};

  return (
    <div className="form__group">
      {children}
      <ul className="form__group__errors">
        {errors && Object.keys(errors).map((key) => (
          <li key={key}>{errors[key]}</li>
        ))}
      </ul>
    </div>
  );
}

export function FormLabel({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="form__label" {...props}>
      {children}
    </label>
  );
}
