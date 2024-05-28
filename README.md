# CoreCMS
The lightweight CMS that runs on Cloudflare Workers (Wrangler)

## How to start
1. Install dependencies
2. Run following command:
```zsh
pnpm exec d1 create corecms_db
```
3. Rewrite db name and id at the `[[d1_database]]` part on wrangler.toml as shown on your shell.
