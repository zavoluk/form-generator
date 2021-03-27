import React, { createRef, FC, useContext, useMemo, useState } from 'react';

import styled from 'styled-components';

import { initialConfig, Store } from 'components/App';
import { Config as IConfig } from 'components/App/Store';

import validateJSON from './helpers/validateJSON';

function setValue(config: IConfig) {
    return JSON.stringify(config, undefined, ' ');
}

const Config: FC = () => {
    const { config, setConfig, setView } = useContext(Store);
    const [errors, setErrors] = useState<string[]>([]);
    const textAreaRef = createRef<HTMLTextAreaElement>();

    const handleJSONValidate = () => {
        const json = validateJSON(textAreaRef.current?.value || '');

        if (Array.isArray(json)) {
            setErrors(json);
            setConfig(undefined);
        } else {
            setErrors([]);
            setConfig(json as IConfig);
            setView('result');
        }
    };

    const handleSetConfig = (config: IConfig) => {
        if (textAreaRef.current) textAreaRef.current.value = config ? setValue(config) : '';
    };

    const manyItems = useMemo(() => {
        if (initialConfig?.items?.length) {
            const items = [];

            for (let i = 0, j = 0; i < 50; i++) {
                items.push(initialConfig.items[j]);
                if (j < initialConfig.items.length - 1) j++;
                else j = 0;
            }

            return items;
        }

        return initialConfig?.items;
    }, []);

    return (
        <Wrapper>
            <TextArea ref={textAreaRef} defaultValue={setValue(config)} />
            <Controls>
                <button onClick={() => handleSetConfig({ ...initialConfig, items: manyItems })}>Set Many Items</button>
                <button onClick={() => handleSetConfig(initialConfig)}>restore default value</button>
                <button onClick={() => handleSetConfig(undefined)}>clear</button>
                <button onClick={handleJSONValidate}>Apply</button>
            </Controls>
            <p>Form generates when you press &quot;Apply&quot; button</p>
            {!!errors.length && (
                <ErrorContainer>
                    {errors.map((error, i) => (
                        <p key={String(i)}>{error}</p>
                    ))}
                </ErrorContainer>
            )}
        </Wrapper>
    );
};

export default Config;

const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    flex: 1;
`;

const TextArea = styled.textarea`
    width: 100%;
    resize: none;
    flex: 1;
    margin-bottom: 1rem;
`;

const ErrorContainer = styled.div`
    color: red;
    margin-top: 1rem;
`;

const Controls = styled.div`
    display: flex;
    margin-bottom: 1rem;
    button {
        &:not(:last-child) {
            margin-right: 1rem;
        }
    }
`;
