import React from 'react'
import { Input } from '../../shadcn/components/ui/input';
import { cn } from '../../shadcn/lib/utils';

type InputComponentProps = {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    onChange: (name: string, value: string) => void;
    classname?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
    label,
    type,
    name,
    placeholder,
    required,
    value,
    onChange,
    classname
}) => {
  return (
    <div className={cn(classname, "")}>
        <label htmlFor={name}>{label}</label>
        <Input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
        />
    </div>
  )
}

export default InputComponent