// 讀取 content/*.json，提供給頁面使用。
// 改網站文字只需要改 content/zh.json 與 content/en.json，不用動這個檔案。
import type { ImageMetadata } from 'astro';
import zh from '../../content/zh.json';
import en from '../../content/en.json';

export const LANGS = ['zh', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const content = { zh, en } as const;
export type Content = typeof zh;

export const htmlLang: Record<Lang, string> = { zh: 'zh-Hant-TW', en: 'en' };
export const ogLocale: Record<Lang, string> = { zh: 'zh_TW', en: 'en_US' };

// src/assets/img/ 底下的圖片，依檔名對應；JSON 裡寫檔名即可。
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{jpg,jpeg,png,webp}', { eager: true });

export function img(file: string): ImageMetadata {
  const hit = Object.entries(images).find(([path]) => path.endsWith('/' + file));
  if (!hit) throw new Error(`找不到圖片：src/assets/img/${file}（請檢查 content/*.json 的檔名）`);
  return hit[1].default;
}

export function pageUrl(lang: Lang): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${lang}/`;
}
