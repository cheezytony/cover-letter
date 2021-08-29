import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  createForm, Form, FormGroup, FormLabel, getFormValues,
  updateField, updateFields, valdiateForm,
} from '../components/primitives/form';
import {
  Input, InputSelect, InputSelectOption, InputCheckbox,
} from '../components/primitives/input';
import { Button, ButtonSubmit } from '../components/primitives/buttons';
import { setItem } from '../utils/local-storage';
import { State, updateCoverLetter } from '../store';
import './Edit.sass';

export default function Edit() {
  const coverLetter = useSelector((state: State) => state.coverLetter);
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, updateForm] = useState(createForm({
    position: {
      value: '',
    },
    companyName: {
      value: '',
    },
    recipientType: {
      value: '',
    },
    recipient: {
      value: '',
    },
    shouldSave: {
      rules: ['nullable'],
      value: false,
    },
  }));

  const recipientOptions: InputSelectOption[] = [{
    title: 'Select Option', value: '',
  }, {
    title: 'Sir', value: 'Sir',
  }, {
    title: 'Ma', value: 'Ma',
  }, {
    title: 'Hiring Manager', value: 'Hiring Manager',
  }, {
    title: 'Hiring Manager\'s Name', value: 'name',
  }];

  const submitData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedForm = valdiateForm(form);
    updateForm(validatedForm);

    if (!validatedForm.valid) {
      return;
    }

    const data = getFormValues(form);

    dispatch(updateCoverLetter(data));

    if (form.fields.shouldSave.value) {
      setItem('cover-letter-data', data);
    }

    history.push('/');
  };

  useEffect(() => {
    updateForm(updateFields(form, {
      position: { value: coverLetter.position },
      companyName: { value: coverLetter.companyName },
      recipientType: { value: coverLetter.recipientType },
      recipient: { value: coverLetter.recipient },
      shouldSave: { value: coverLetter.shouldSave },
    }));
  }, [coverLetter]);

  return (
    <article className="app__edit">
      <main>
        <h1>Edit Cover Letter</h1>
        <h2>Set the parameters for the cover letter content.</h2>
        <Form name="editForm" onSubmit={submitData}>
          <div>
            <FormGroup field={form.fields.position}>
              <FormLabel htmlFor="position">Position</FormLabel>
              <Input
                id="position"
                placeholder="e.g. Senior Backend Developer"
                value={form.fields.position.value as string}
                onChange={(event) => updateForm(updateField(form, 'position', event.target.value))}
              />
            </FormGroup>
            <FormGroup field={form.fields.companyName}>
              <FormLabel htmlFor="companyName">Company Name</FormLabel>
              <Input
                id="companyName"
                placeholder="e.g. CredPal"
                value={form.fields.companyName.value as string}
                onChange={(event) => updateForm(updateField(form, 'companyName', event.target.value))}
              />
            </FormGroup>
            <FormGroup field={form.fields.recipientType}>
              <FormLabel htmlFor="recipientType">Recipient</FormLabel>
              <InputSelect
                id="recipientType"
                name="recipient"
                options={recipientOptions}
                placeholder="e.g. Hiring Manager"
                value={form.fields.recipientType.value}
                onChange={(value) => {
                  const newForm = updateField(form, 'recipientType', value);
                  updateForm(newForm);
                  updateForm(updateField(newForm, 'recipient', value !== 'name' ? value : ''));
                }}
              />
            </FormGroup>
            {
              form.fields.recipientType?.value === 'name' && (
                <FormGroup field={form.fields.recipient}>
                  <FormLabel htmlFor="recipient">Hiring Manager Name</FormLabel>
                  <Input
                    id="recipient"
                    name="recipient"
                    placeholder="e.g. Oiza Yekini"
                    value={form.fields.recipient.value as string}
                    onChange={(event) => updateForm(updateField(form, 'recipient', event.target.value))}
                  />
                </FormGroup>
              )
            }
            <FormGroup>
              <InputCheckbox
                checked={form.fields.shouldSave.value as boolean}
                onChange={(event) => updateForm(updateField(form, 'shouldSave', event.target.checked))}
              >
                Save data to local storage?
              </InputCheckbox>
            </FormGroup>
          </div>
          <div />
          <div>
            <div className="buttons">
              <ButtonSubmit>
                Update Cover Letter
              </ButtonSubmit>
              <Button href="/">
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </main>
    </article>
  );
}
