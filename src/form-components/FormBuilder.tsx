import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodTypeAny } from "zod";
import { FormSchema } from "../types/FormSchema";
import { FormFieldComponent } from "./FormFields";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface FormBuilderProps {
  schema: FormSchema;
  classname?: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  schema,
  classname,
}) => {
  const zodSchema: { [key: string]: ZodTypeAny } = {};
  schema.fields.forEach((field) => {
    if (field.required) {
      zodSchema[field.name] = z
        .string({
          required_error: `${field.label} is required`,
        })
        .min(1, {
          message: `${field.label} is required`,
        });
    } else {
      zodSchema[field.name] = z.string().optional();
    }
  });

  const formSchema = z.object(zodSchema);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: schema.fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as { [key: string]: string }),
  });

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", JSON.stringify(data, null, 2));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(classname, "")}
      >
        <h1>{schema.title}</h1>
        <FormDescription>{schema.description}</FormDescription>
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
                <FormMessage>
                  {form.formState.errors[field.name]?.message as string}
                </FormMessage>
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
