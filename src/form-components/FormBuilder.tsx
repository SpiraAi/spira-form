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
import { TFormValues } from "@/types/form";
import useFormStore from "@/store/formStore";

interface FormBuilderProps {
  schema: FormSchema;
  classname?: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  schema,
  classname,
}) => {
  const formData = useFormStore((state) => state.formData);
  const setFormData = useFormStore((state) => state.setFormData);

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

  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...formData },
  });

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", JSON.stringify(data, null, 2));
    setFormData(data);
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
            render={({ field: controllerField, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FormFieldComponent
                    field={field}
                    value={controllerField.value}
                    onChange={(value: string) => {
                      controllerField.onChange(value);
                      console.log("error", fieldState);
                      setFormData({ ...form.getValues(), [field.name]: value });
                    }}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        ))}
        <Button variant="outline" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
