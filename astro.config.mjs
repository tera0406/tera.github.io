// @ts-check
import { defineConfig } from 'astro/config';

// 網址會依 GitHub repo 名稱自動決定（GitHub Actions 會提供 GITHUB_REPOSITORY）：
// - repo 名稱是「帳號.github.io」（例如 tera0406.github.io）→ https://tera0406.github.io/
// - 其他名稱（例如 portfolio）→ https://tera0406.github.io/portfolio/
// 在自己電腦上預覽時一律用根目錄（http://localhost:4321/）。
const [owner = 'tera0406', repo = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = !repo || repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

export default defineConfig({
  site: `https://${owner.toLowerCase()}.github.io`,
  base: isUserSite ? '/' : `/${repo}`,
  trailingSlash: 'always',
  build: { format: 'directory' },
});
