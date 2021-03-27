import React, { FC, useContext } from 'react';

import styled from 'styled-components';

import { Store } from 'components/App';
import Config from 'components/Content/Config';

import Result from './Result';

const Content: FC = () => {
    const { view } = useContext(Store);

    return <Wrapper>{view === 'config' ? <Config /> : <Result />}</Wrapper>;
};

export default Content;

const Wrapper = styled.div`
    width: 600px;
    border: 1px solid;
    padding: 2rem;
    height: 500px;
    display: flex;
    overflow: auto;
`;
