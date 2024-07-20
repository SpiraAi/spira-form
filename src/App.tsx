import React from "react";
import { formSchema } from "./schema/formSchema";
import { FormBuilder } from "./form-components/FormBuilder";

const App: React.FC = () => {
  return (
    <>
      <FormBuilder schema={formSchema} classname="w-[70%]" />
    </>
  );
};

export default App;
