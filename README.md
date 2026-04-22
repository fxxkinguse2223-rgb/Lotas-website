# 株式会社Lotus コーポレートサイト

北九州発、人材紹介・採用支援・AI活用スタートアップ「株式会社Lotus」のコーポレートサイトです。

## 構成

- `index.html` … トップページ（ヒーロー／サービス概要／強み／CTA）
- `about.html` … 会社概要（ミッション／メンバー／設立経緯／会社情報）
- `services.html` … サービス（採用支援／AI活用）
- `contact.html` … お問い合わせ（バリデーション付きフォーム）
- `css/style.css` … 共通スタイル
- `js/main.js` … 共通スクリプト（スクロール演出・フォームバリデーション）

## 技術仕様

- HTML / CSS / JavaScript のみ（ビルド不要）
- レスポンシブ対応（スマートフォン〜PC）
- スクロール時の要素出現アニメーション（IntersectionObserver）
- お問い合わせフォーム：送信時バリデーション

## GitHub Pages 公開手順

### 1. GitHubリポジトリにプッシュ

```bash
git add .
git commit -m "Initial commit: Lotus corporate site"
git push -u origin main
```

### 2. GitHub Pages の有効化

1. GitHubでリポジトリを開く
2. **Settings** → **Pages** を選択
3. **Source** で「Deploy from a branch」を選択
4. **Branch** を `main`（または `claude/lotus-company-website-6i4id`）・`/（root）` に設定
5. **Save** をクリック

1〜2分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます。

### 3. カスタムドメインを使う場合（任意）

リポジトリ直下に `CNAME` ファイルを作成し、独自ドメインを記載。
DNS の CNAME レコードを `<ユーザー名>.github.io` に向ける。

## ローカルでの確認

```bash
# Python 3 がある場合
python3 -m http.server 8000

# または Node.js
npx serve .
```

ブラウザで `http://localhost:8000` を開いて確認できます。
