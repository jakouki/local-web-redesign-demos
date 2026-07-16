# 株式会社シーズン リデザイン内容対応表

## トップページ代表画像について

- シーズンディスプレイ、イルミネーション、フラワー＆グリーン、什器の代表画像は、元サイト掲載写真の構図と対象物を保ったまま、生成AIで解像感・ノイズ・圧縮劣化を補正した高画質復元版を使用。
- オープン＆イベントの代表画像は、元サイト内に掲載されていた高解像度の実績写真を使用。
- 各詳細ページのギャラリーには元サイトから取得した写真をそのまま掲載。

## 限定公開について

- 全ページに共通の閲覧用パスワード画面を表示。正しいパスワードを入力した同一タブでは、ページ移動・再読み込み時の再入力を省略する。
- GitHub Pagesは静的ホスティングのため、このパスワード画面は通常閲覧を防ぐ簡易ロック。機密情報を保護するサーバー認証ではない。
- `noindex, nofollow, noarchive, nosnippet` は継続して設定。

| 元サイト | 内容 | 新しいページ | 状態 |
|---|---|---|---|
| `/` | ごあいさつ・業務内容 | `/season-demo/` | matched |
| `/company/` | 会社概要・アクセス | `/season-demo/company/` | matched |
| `/signature/` | 各種サイン・掲載写真5点 | `/season-demo/signature/` | matched |
| `/season-display/` | シーズンディスプレイ・掲載写真7点 | `/season-demo/season-display/` | matched |
| `/illumination/` | イルミネーション・掲載写真14点 | `/season-demo/illumination/` | matched |
| `/open-event/` | オープン＆イベント・掲載写真16点 | `/season-demo/open-event/` | matched |
| `/flower/` | フラワー＆グリーンディスプレイ・掲載写真6点 | `/season-demo/flower/` | matched |
| `/fixture/` | 什器・掲載写真2点 | `/season-demo/fixture/` | matched |
| `/contact/` | 連絡先・フォーム・プライバシーポリシー | `/season-demo/contact/` | demo only |

お問い合わせフォームは元サイトのCGIへ接続せず、デザイン確認用として送信を停止している。実運用時は元のCGIまたは承認された新しい送信環境への接続が必要。
