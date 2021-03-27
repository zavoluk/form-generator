import { Schema, Validator } from 'jsonschema';

const validator = new Validator();

const items: Schema = {
    items: {
        additionalProperties: false,
        properties: {
            label: {
                required: true,
                type: 'string'
            },
            type: {
                oneOf: [{ enum: ['numberfield', 'textfield', 'textarea', 'checkbox', 'datefield', 'radio'] }],
                required: true
            }
        },
        type: 'object'
    },
    minItems: 1,
    type: 'array'
};

const title: Schema = { type: 'string' };
const controls: Schema = {
    items: {
        additionalProperties: false,
        properties: {
            label: { required: true, type: 'string' }
        }
    },
    type: 'array'
};

export default function validateJSON(data: string): Record<string, any> | string[] {
    let parsedData;

    try {
        parsedData = JSON.parse(data);
    } catch (error) {
        return ['is not valid json'];
    }

    const validation = validator.validate(parsedData, {
        additionalProperties: false,
        properties: {
            controls,
            items,
            title
        },
        required: ['items'],
        type: 'object'
    });

    if (validation.errors.length) {
        return validation.errors.map(({ stack }) => `${stack.replace('instance.', '')}`);
    }

    return parsedData;
}
