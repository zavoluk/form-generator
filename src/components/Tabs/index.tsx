import React, { FC, memo, useContext } from 'react';

import styled from 'styled-components';

import { Store } from 'components/App';
import { IStore } from 'components/App/Store';

const tabs: { name: string; value: IStore['view'] }[] = [
    {
        name: 'Config',
        value: 'config'
    },
    {
        name: 'Result',
        value: 'result'
    }
];

const Tabs: FC = () => {
    const { setView, view } = useContext(Store);

    return (
        <Wrapper>
            {tabs.map(({ name, value }, index) => (
                <Tab key={String(index)} onClick={() => setView(value)} active={view === value}>
                    {name}
                </Tab>
            ))}
        </Wrapper>
    );
};

export default memo(Tabs);

const Wrapper = styled.div`
    display: flex;
`;
const Tab = styled.div<{ active: boolean }>`
    border: 1px solid black;
    border-bottom: none;
    padding: 0.5rem 5rem;
    border-radius: 8px 8px 0 0;
    transition: background-color 0.2s;
    user-select: none;
    cursor: pointer;
    background-color: ${({ active }) => (active ? '#beff8d' : 'transparent')};
    &:hover {
        background-color: #acacac;
    }
`;
