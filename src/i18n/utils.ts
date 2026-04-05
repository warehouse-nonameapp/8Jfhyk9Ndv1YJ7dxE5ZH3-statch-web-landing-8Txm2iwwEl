import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    const translationContext = ui[lang];
    if (translationContext && key in translationContext) {
      let text = translationContext[key as keyof typeof translationContext] as string;
      if (text.includes('{year}')) {
          text = text.replace('{year}', new Date().getFullYear().toString());
      }
      return text;
    }
    const defaultCtx = ui[defaultLang];
    return defaultCtx[key];
  }
}
