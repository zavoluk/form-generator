import React, { FC, memo, useContext } from 'react';

import styled from 'styled-components';

import { Store } from 'components/App';

import Field from './Field';

const Result: FC = () => {
    const { config } = useContext(Store);

    return config?.items?.length ? (
        <Wrapper>
            <fieldset>
                {config?.title && <legend>{config.title}</legend>}
                {config.items.map(({ label, type }, i) => (
                    <label key={String(i)}>
                        <span>{label}</span>
                        <Field type={type} />
                    </label>
                ))}
                {!!config?.controls?.length && (
                    <Controls>
                        {config.controls.map(({ label }, i) => (
                            <button key={String(i)} type='button'>
                                {label}
                            </button>
                        ))}
                    </Controls>
                )}
            </fieldset>
        </Wrapper>
    ) : (
        <>Please provide config data</>
    );
};

export default memo(Result);

const Wrapper = styled.form`
    width: 100%;
    fieldset {
        min-height: 100%;
    }
    label {
        margin-bottom: 1rem;
        align-items: center;
        display: flex;
        span {
            width: 150px;
            margin-right: 1rem;
        }
        textarea {
            width: 200px;
            height: 100px;
            resize: none;
        }
    }
`;

const Controls = styled.div`
    margin-top: 3rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-wrap: wrap;
    button {
        &:not(:first-child) {
            margin-left: 1rem;
        }
        margin-bottom: 1rem;
    }
`;
