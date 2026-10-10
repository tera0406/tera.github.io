// @ts-check
import { defineConfig } from 'astro/config';

// 網址：https://tera0406.github.io/resume/
// 如果之後改用 tera0406.github.io 這個 repo，把 base 改成 '/'。
export default defineConfig({
  site: 'https://tera0406.github.io',
  base: '/resume',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
