import React, { useState } from 'react';
import { FormSchema } from '../types/FormSchema';
import { FormFieldComponent } from './FormFields';

interface FormBuilderProps {
  schema: FormSchema;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ schema }) => {
  const initialFormState = schema.fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as { [key: string]: string });

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (name: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{schema.title}</h1>
      <p>{schema.description}</p>
      {schema.fields.map((field) => (
        <FormFieldComponent
          key={field.name}
          field={field}
          value={formState[field.name]}
          onChange={handleChange}
        />
      ))}
      <button type="submit">Submit Application</button>
    </form>
  );
};
