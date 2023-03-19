import React from 'react';
import { ErrorContext } from '../contexts/ErrorContext';

export function useError() {
    return React.useContext(ErrorContext);
}
