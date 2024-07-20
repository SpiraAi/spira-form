import { create } from "zustand";

interface FormStore {
  name: string;
  setName: (name: string) => void;
}