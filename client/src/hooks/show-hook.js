import {useState} from 'react';

export const useShow = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    return{
        value,
        setValue,
        show: () => {
            if(value === 'password')
                setValue('text');
            else if(value === 'text')
                setValue('password');
        }
    }
}