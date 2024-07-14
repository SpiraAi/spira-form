import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodTypeAny } from "zod";
import { FormSchema } from '../types/FormSchema';
import { FormFieldComponent } from './FormFields';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormBuilderProps {
  schema: FormSchema;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ schema }) => {
  // Create a Zod schema dynamically based on the provided form schema
  const zodSchema: { [key: string]: ZodTypeAny } = {};
  schema.fields.forEach((field) => {
    if (field.required) {
      zodSchema[field.name] = z.string().nonempty(`${field.label} is required`);
    } else {
      zodSchema[field.name] = z.string().optional();
    }
  });

  const formSchema = z.object(zodSchema);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: schema.fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {} as { [key: string]: string }),
  });

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {schema.title && <h1>{schema.title}</h1>}
        {schema.description && <FormDescription>{schema.description}</FormDescription>}
        {schema.fields.map((field, index) => (
          <FormField
            key={index}
            control={form.control}
            name={field.name}
            render={({ field: controllerField }) => (
              <FormItem>
                <FormControl>
                  <FormFieldComponent
                    field={field}
                    value={controllerField.value}
                    onChange={controllerField.onChange}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors[field.name]?.message as string}</FormMessage>
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
