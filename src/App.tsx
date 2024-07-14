import React from "react";
import { formSchema } from "./schema/formSchema";
import { FormBuilder } from "./components/FormBuilder";

const App: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Form</h1>
      <FormBuilder schema={formSchema} />
    </>
  );
};

export default App;
