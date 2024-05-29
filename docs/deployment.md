# デプロイ方法
GitHub Actionsで自動化しています。

Actionsに渡すSecretsを変えれば各々のデプロイ環境を作ることができます。


## 事前準備
CloudflareにAPIトークンを取りに行く
1. [CloudflareのAPIキーを発行する画面](https://dash.cloudflare.com/profile/api-tokens)に行く
  ![step1](https://github.com/chuo-u-ids-iio/pet-backend/assets/49401718/443a931b-813a-4c23-838f-ec2f62546b1e)
2. 以下の通り項目を設定（Workersのテンプレート＋Workers AIおよびD1へのEDIT許可）
  ![step2](https://github.com/chuo-u-ids-iio/pet-backend/assets/49401718/ea1089c3-f93f-4626-996b-0c75480295db)
3. APIキーをコピーする
  ![step3](https://github.com/chuo-u-ids-iio/pet-backend/assets/49401718/f3ccc556-bbad-434b-926c-ac0dbf5e7e96)
4. レポジトリ設定画面の Security -> Secrets and Variables -> Repository secretsに追加
  ![step4](https://github.com/chuo-u-ids-iio/pet-backend/assets/49401718/d6e0ead5-be75-4d01-87ec-f8b569ca7f64)
5. その他、以下の環境変数を同様に設定する
  * CLOUDFLARE_ACCOUNT_ID: ([ココ](https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/)から検索可能)
  * TOKEN_KEY: 認証キーの作成等に使用。ランダムな文字列でよい。
  * SALT: パスワードの暗号化に使う文字列。ランダムな文字列でよい。

## Actionsを回す
release-deploy.yaml を回す。
![DB](https://github.com/chuo-u-ids-iio/pet-backend/assets/49401718/25eb9376-1453-4c37-b051-a2b952612ecf)

