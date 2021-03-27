import React, { createContext, useCallback, useMemo, useState } from 'react';

import styled from 'styled-components';

import Content from 'components/Content';
import GlobalStyles from 'components/Layout/GlobalStyles';
import Tabs from 'components/Tabs';

import { Config, IStore } from './Store';

export const Store = createContext<IStore>({} as IStore);

export const initialConfig: Partial<Config> = {
    controls: [{ label: 'My Button' }, { label: 'Another Button' }],
    items: [
        { label: 'My textfield', type: 'textfield' },
        { label: 'My checkbox', type: 'checkbox' },
        { label: 'My datefield', type: 'datefield' },
        { label: 'My numberfield', type: 'numberfield' },
        { label: 'My radio button', type: 'radio' },
        { label: 'My textarea', type: 'textarea' }
    ],
    title: 'Hi! This is form title'
};

const App: React.FC = () => {
    const [_view, _setView] = useState<IStore['view']>('config');
    const [_config, _setConfig] = useState<IStore['config']>(initialConfig);

    const setView = useCallback((view: typeof _view) => {
        _setView(view);
    }, []);

    const setConfig = useCallback((config: typeof _config) => {
        _setConfig(config);
    }, []);

    const ctxState = useMemo(
        () => ({
            config: _config,
            setConfig,
            setView,
            view: _view
        }),
        [_view, _config]
    );

    return (
        <Store.Provider value={ctxState}>
            <GlobalStyles />
            <Wrapper>
                <WrapperInner>
                    <Tabs />
                    <Content />
                </WrapperInner>
            </Wrapper>
        </Store.Provider>
    );
};

export default App;

const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
`;

const WrapperInner = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-flow: column;
`;
