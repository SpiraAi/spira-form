import React from 'react'
import { Input } from '../../shadcn/components/ui/input';
import { cn } from '../../shadcn/lib/utils';
import { Textarea } from '../../shadcn/components/ui/textarea';

type TextAreaComponentProps = {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    onChange: (name: string, value: string) => void;
    classname?: string;
}

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
    label,
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
        <Textarea
            name={name}
            id={name}
            placeholder={placeholder}
            required={required}
            value={value}
            cols={30}
            onChange={(e) => onChange(name, e.target.value)}
        />
    </div>
  )
}

export default TextAreaComponent