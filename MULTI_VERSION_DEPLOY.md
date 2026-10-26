# Tankbot 双版本构建与部署

| 版本标识 | 页面显示名称 | 正式访问地址 |
| --- | --- | --- |
| `tankbotaI` | Tankbot—AI Module | https://wiki.hiwonder.com/projects/Tankbot/en/tankbotaI/ |
| `latest` | Tankbot | https://wiki.hiwonder.com/projects/Tankbot/en/latest/ |

路径区分大小写：`tankbotaI` 的最后一个字符是大写字母 `I`。普通版路径使用 `latest`。

## 内容目录

- `content/latest/docs/`：普通版 Markdown，包括 Getting Ready、Quick User Experience 等教程。
- `content/latest/_static/`：普通版图片、附件。
- `content/tankbotaI/docs/`：AI Module 版 Markdown。
- `content/tankbotaI/_static/`：AI Module 版图片、附件。

编辑内容时修改 `content/<版本>/`，不要修改自动生成的 `docs/docs/`、`docs/_static/` 或 `projects/`。

两个版本共用 `docs/.vitepress/site.config.mjs`，该文件定义名称、路径以及首篇文档。普通版入口是 `docs/1. Getting Ready.html`，AI Module 版入口是 `docs/1. Getting Started.html`。访问各版本地址会直接打开对应教程，可在顶部 Version 菜单中切换版本。

## 本地运行与构建

```bash
npm ci
npm run dev:latest
# 或启动 AI Module 版（不要同时运行两个版本）
npm run dev:tankbotaI
```

构建全部版本：

```bash
npm run build:all
```

也可以分别运行 `npm run build:latest`、`npm run build:tankbotaI`。

构建脚本会复制对应版本的源文件、设置 VitePress base、构建并生成部署目录：

```text
projects/Tankbot/en/latest/
projects/Tankbot/en/tankbotaI/
```

构建完成后会恢复 `docs/index.md`。两个版本共用临时工作目录，必须串行构建；`build:all` 已按顺序执行。

本地检查两个版本及切换菜单，在仓库根目录运行：

```bash
python -m http.server 4174
```

- http://localhost:4174/projects/Tankbot/en/latest/
- http://localhost:4174/projects/Tankbot/en/tankbotaI/

## 部署到正式站点

将两个构建目录上传到站点根目录下，保持完整路径：

```text
<站点根目录>/projects/Tankbot/en/latest/
<站点根目录>/projects/Tankbot/en/tankbotaI/
```

若站点使用 Nginx 本地静态文件，可在现有 `server` 配置中加入以下规则，并确认站点 `root` 正确：

```nginx
location /projects/Tankbot/en/latest/ {
    index index.html;
    try_files $uri $uri/ =404;
}

location /projects/Tankbot/en/tankbotaI/ {
    index index.html;
    try_files $uri $uri/ =404;
}
```

若采用 GitHub Pages + Nginx 反向代理，先提交并推送构建目录，在仓库 Settings > Pages 中选择 `main` 分支的 `/(root)`。两个版本的代理目标分别为：

```text
https://<GitHub用户名>.github.io/Tankbot-vite/projects/Tankbot/en/latest/
https://<GitHub用户名>.github.io/Tankbot-vite/projects/Tankbot/en/tankbotaI/
```

每个 `location` 的 `proxy_pass` 保持对应的完整版本路径和末尾 `/`，`Host` 设置为 `<GitHub用户名>.github.io`，并启用 `proxy_ssl_server_name on`。

仅完成本地构建不会改变线上站点；正式地址需要服务器上传或仓库发布后才能更新。
