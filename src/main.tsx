import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { FormBuilder } from "./form-components/FormBuilder.js";
import { formSchema } from "./schema/formSchema.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return <FormBuilder schema={formSchema} classname="w-[70%]" />;
}
