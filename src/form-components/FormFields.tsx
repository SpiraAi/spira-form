import React from "react";
import { FormField } from "../types/FormSchema";
import InputComponent from "./ui/InputComponent";
import TextAreaComponent from "./ui/TextAreaComponent";
import SelectComponent from "./ui/SelectComponent";
import CheckboxField from "./ui/CheckboxComponent";

interface FormFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}

export const FormFieldComponent: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
}) => {
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    onChange(event.target.value);
  };

  switch (field.type) {
    case "text":
    case "email":
    case "tel":
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
    case "textarea":
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
    case "select":
      return (
        <div>
          <SelectComponent
            label={field.label}
            name={field.name}
            options={field.options || []}
            value={value}
            placeholder={field.placeholder}
            onChange={onChange}
          />
        </div>
      );
    case "checkbox":
      return (
        <div>
          {/* <label>{field.label}</label>
          {field.options?.map((option) => (
            <div key={option.value}>
              <input
                type="checkbox"
                name={field.name}
                value={option.value}
                checked={value.split(",").includes(option.value)}
                onChange={() => {
                  const newValue = value.split(",").includes(option.value)
                    ? value
                        .split(",")
                        .filter((v) => v !== option.value)
                        .join(",")
                    : [...value.split(","), option.value].join(",");
                  onChange(newValue);
                }}
              />
              <label>{option.label}</label>
            </div>
          ))} */}

          <CheckboxField
            field={{
              name: field.name,
              value: value,
              onChange: (value) => onChange(value),
            }}
            label={field.label}
            options={field.options || []}
          />
        </div>
      );
    case "radio":
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
    case "file":
      return (
        <div>
          <label>{field.label}</label>
          <input
            type="file"
            name={field.name}
            accept={field.accept}
            required={field.required}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange(event.target.files?.[0]?.name || "")
            }
          />
        </div>
      );
    default:
      return null;
  }
};
