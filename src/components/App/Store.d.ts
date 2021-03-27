export type Field = 'numberfield' | 'textfield' | 'textarea' | 'checkbox' | 'datefield' | 'radio';

export type Config =
    | {
          controls?: { label: string }[];
          items?: { label: string; type: Field }[];
          title?: string;
      }
    | undefined;

export interface IStore {
    config?: Config;
    setConfig: (config: this['config']) => void;
    setView: (view: this['view']) => void;
    view: 'config' | 'result';
}
