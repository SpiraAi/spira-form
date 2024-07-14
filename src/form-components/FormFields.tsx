import React from 'react';
import { FormField } from '../types/FormSchema';
import InputComponent from './ui/InputComponent';
import TextAreaComponent from './ui/TextAreaComponent';

interface FormFieldProps {
  field: FormField;
  value: string;
  onChange: (name: string, value: string) => void;
}

export const FormFieldComponent: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(field.name, event.target.value);
  };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'tel':
      return (
        <div>
          <InputComponent
            label={field.label}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={value}
            onChange={onChange}
          />
        </div>
      );
    case 'textarea':
      return (
        <div>
          <TextAreaComponent
            label={field.label}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={value}
            onChange={onChange}
          />
        </div>
      );
    case 'select':
      return (
        <div>
          <label>{field.label}</label>
          <select name={field.name} required={field.required} value={value} onChange={handleChange}>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div>
          <label>{field.label}</label>
          {field.options?.map((option) => (
            <div key={option.value}>
              <input
                type="checkbox"
                name={field.name}
                value={option.value}
                checked={value.split(',').includes(option.value)}
                onChange={() => {
                  const newValue = value.split(',').includes(option.value)
                    ? value.split(',').filter((v) => v !== option.value).join(',')
                    : [...value.split(','), option.value].join(',');
                  onChange(field.name, newValue);
                }}
              />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      );
    case 'radio':
      return (
        <div>
          <label>{field.label}</label>
          {field.options?.map((option) => (
            <div key={option.value}>
              <input
                type="radio"
                name={field.name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
              />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      );
    case 'file':
      return (
        <div>
          <label>{field.label}</label>
          <input
            type="file"
            name={field.name}
            accept={field.accept}
            required={field.required}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange(field.name, event.target.files?.[0]?.name || '')
            }
          />
        </div>
      );
    default:
      return null;
  }
};
