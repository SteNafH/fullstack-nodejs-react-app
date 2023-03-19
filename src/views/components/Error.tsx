import React from 'react';
import './error.scss';

interface Props {
    message: string;
    onRemove: () => void | Promise<void>;
}

function Error({ message, onRemove }: Props) {
    return (
        <div className={'flex flex-row content-between p-3 gap-3 rounded-2 bg-error opacity-0 error'}>
            <p>{message}</p>
            <button onClick={onRemove}>x</button>
        </div>
    );
}

export default Error;
