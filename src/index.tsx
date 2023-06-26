import 'uno.css';
import { render } from 'solid-js/web';

import App from './App';
import { I18nContext } from '@solid-primitives/i18n';
import { context } from './i18n';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <I18nContext.Provider value={context}><App /></I18nContext.Provider>, root!);
