# CoreCMS
The lightweight CMS that runs on Cloudflare Workers (Wrangler)

## How to start
0. Create Cloudflare account (Required to use wrangler)
1. Install dependencies
```zsh
curl https://get.volta.sh | bash
corepack enable pnpm
pnpm i
```
2. Run following command:
```zsh
pnpm exec d1 create corecms_db
```
1. Rewrite db name and id at the `[[d1_database]]` part on wrangler.toml as shown on your shell.
