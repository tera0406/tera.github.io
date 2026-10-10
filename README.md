# 姜兆源 Chao-Yuan Chiang｜個人學術網站

中英雙語的個人學術網站，用 [Astro](https://astro.build/) 建置，透過 GitHub Actions 自動部署到 GitHub Pages。

- 英文版：<https://tera0406.github.io/resume/en/>
- 中文版：<https://tera0406.github.io/resume/zh/>
- 根網址 <https://tera0406.github.io/resume/> 會依「上次選的語言」或「瀏覽器語言」自動轉到對應版本。

---

## 1. 在本機預覽

需要 [Node.js](https://nodejs.org/) 22 版以上。

```bash
npm install        # 第一次才需要，安裝套件
npm run dev        # 啟動預覽伺服器
```

打開終端機顯示的網址（通常是 <http://localhost:4321/resume/>）。改了檔案存檔後，瀏覽器會自動更新。

要看「正式部署後」的樣子：

```bash
npm run build      # 建置到 dist/
npm run preview    # 預覽 dist/
```

## 2. 改內容（不用碰程式）

網站上所有文字都在這兩個檔案：

| 檔案 | 內容 |
|---|---|
| `content/zh.json` | 中文版 |
| `content/en.json` | 英文版 |

兩個檔案的**結構要一模一樣**，只有文字不同。改一邊時，記得另一邊也要改。

### 常見修改

- **簡介、研究興趣**：`hero` 底下的 `summary`、`interests`。
- **新增論文**：在 `publications` 陣列加一筆，可以複製現有的一筆來改。
  - `statusKind` 決定狀態標籤的顏色：`review` 是黃色（審查中），`ok` 是藍色（已接受），`plain` 是無色。
  - 論文正式刊出後，把 `status` 改成「已刊出／Published」，並在 `venue` 加上 DOI。
- **新增專案**：在 `research` 陣列加一筆。
  - 必填：`id`（英文、不要有空白）、`category`、`title`、`org`、`summary`、`brief`（我的角色）、`tags`、`thumb`（代表圖）、`thumbAlt`（代表圖的替代文字）。
  - 其他欄位都可以省略，例如 `method`、`results`、`challenges`、`next`、`images`、`video`。
- **新增影片**：在 `videos` 陣列加一筆。`youtubeId` 是 YouTube 網址 `watch?v=` 後面那 11 個字元。不要把影片檔放進 repo。
- **聯絡方式**：`contact`。
- **最後更新日期**：`updated`。
- **介面文字**（按鈕、區塊標題等）：`ui`。

### 加圖片

1. 把圖片放進 `src/assets/img/`，建議寬度 1600px 以內的 JPG。建置時會自動轉成 WebP 並產生多種尺寸。
2. 在 JSON 裡用**檔名**引用，例如 `"file": "my_photo.jpg"`。
3. 每張圖都要寫 `alt`（給看不到圖的人的描述）和 `caption`（圖說）。設 `"wide": true` 可以讓圖片佔兩欄。

### 改完先檢查

```bash
npm run check:content
```

這支檢查會擋下下列問題，GitHub Actions 部署前也會自動執行：
- 中英文結構不一致
- 圖片找不到、圖片沒有 alt
- YouTube ID 格式錯誤
- 內容裡還有 `TODO`
- 不小心放進成績、語言分數、學號、手機號碼
- 中文裡出現對岸用語，例如「優化」「信息」「網絡」

## 3. 重新部署

改好之後 commit 並 push 到 `main`，GitHub Actions 會自動建置並部署，約 1～2 分鐘後網站就會更新。

```bash
git add -A
git commit -m "更新內容"
git push origin main
```

部署進度可以在 GitHub repo 的 **Actions** 分頁查看。失敗時點進去看紅色的步驟；最常見的原因是 `check:content` 擋下了內容問題，照錯誤訊息修改即可。

想在不改內容的情況下重新部署：到 **Actions → Deploy to GitHub Pages → Run workflow**。

## 4. 改版面（需要一點程式基礎）

| 檔案 | 用途 |
|---|---|
| `src/styles/global.css` | 所有樣式。配色都在檔案開頭的 `:root`（淺色）和深色模式的區塊；列印樣式在檔案最後 |
| `src/pages/[lang]/index.astro` | 主頁面的結構 |
| `src/layouts/Base.astro` | `<head>`：SEO、分享預覽、字型 |
| `src/components/Video.astro` | YouTube 延遲載入：點了才從 youtube-nocookie.com 載入 |
| `src/pages/index.astro` | 根網址的語言自動轉址 |
| `public/og-zh.png`、`public/og-en.png` | 分享到社群時的預覽圖（1200×630） |
| `astro.config.mjs` | 網址設定。如果之後改用 `tera0406.github.io` 這個 repo，把 `base` 改成 `'/'` |

## 5. 隱私

`.gitignore` 已經排除這些檔案：證明文件、推薦信、`*.odt`、個人資料表、成績單、原始的 pptx 和 docx。網站只使用整理過的 `content/*.json` 和 `src/assets/img/` 裡的圖片。

新增檔案前，請先用 `git status` 確認沒有私人檔案被加進來。
