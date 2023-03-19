import React from 'react';
import Error from '../components/Error';

interface ErrorContext {
    addError: (token: string) => void;
}

export const ErrorContext = React.createContext<ErrorContext>(null);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
    const [errors, setErrors] = React.useState<string[]>([]);

    const addError = (error: string) => {
        setErrors([...errors, error]);
    };

    const removeError = (index: number) => {
        const newErrors = [...errors];
        newErrors.splice(index, 1);
        setErrors(newErrors);
    }

    let value = { addError };

    return <ErrorContext.Provider value={value}>
        {children}
        <div className={'position-fixed bottom-0 m-3 flex flex-col-reverse gap-3'}>
            {errors.map((error: string, index: number) => (
                <Error key={'error-' + index} message={error} onRemove={() => removeError(index)}/>
            ))}
        </div>
    </ErrorContext.Provider>;
}
