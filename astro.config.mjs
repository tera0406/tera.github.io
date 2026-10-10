// @ts-check
import { defineConfig } from 'astro/config';

// 網址：https://tera0406.github.io/
// repo 名稱必須是 tera0406.github.io，網站才會放在網域根目錄。
// 如果改用其他 repo 名稱（例如 portfolio），把 base 改成 '/portfolio'。
export default defineConfig({
  site: 'https://tera0406.github.io',
  base: '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
