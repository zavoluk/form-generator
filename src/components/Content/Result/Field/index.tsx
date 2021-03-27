import React, { FC } from 'react';

import { Field } from 'components/App/Store';

interface Props {
    type: Field;
}

const Field: FC<Props> = ({ type }) => {
    switch (type) {
        case 'checkbox':
            return <input type='checkbox' />;
        case 'datefield':
            return <input type='date' />;
        case 'numberfield':
            return <input type='number' />;
        case 'radio':
            return <input type='radio' />;
        case 'textarea':
            return <textarea />;
        case 'textfield':
            return <input type='text' />;

        default:
            return null;
    }
};

export default Field;
