# 部署指南

## 推送到 GitHub

### 步骤 1: 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com/new) 创建新仓库
2. 仓库名: `ts-model-survey`
3. 选择 **Public** (公开)
4. **不要** 初始化 README、.gitignore 或 license

### 步骤 2: 添加远程仓库并推送

在项目目录运行以下命令：

```bash
# 添加远程仓库 (替换 YOUR_USERNAME 为你的 GitHub 用户名)
git remote add origin https://github.com/BobWang21/ts-model-survey.git

# 验证远程仓库
git remote -v

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 3: 启用 GitHub Pages

1. 进入仓库设置: https://github.com/BobWang21/ts-model-survey/settings
2. 左侧菜单选择 **Pages**
3. 在 **Source** 下选择:
   - Branch: `main`
   - Folder: `/ (root)`
4. 点击 **Save**

稍等几分钟，你的网站就会在以下地址发布：
```
https://bobwang21.github.io/ts-model-survey/
```

## 本地开发

### 查看本地网页

```bash
# 方式 1: 直接打开
open index.html

# 方式 2: 使用 Python 简单服务器
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 更新内容

如果需要更新文档：

```bash
# 编辑文件
# ...修改 index.html、styles.css 等

# 提交更改
git add .
git commit -m "更新: 添加新的模型介绍"

# 推送到 GitHub
git push origin main
```

GitHub Pages 会自动更新网站内容。

## 常见问题

### Q: 网站没有显示？
A:
1. 确保已启用 GitHub Pages
2. 等待 2-3 分钟让 GitHub 构建网站
3. 检查浏览器缓存（Ctrl+Shift+Delete 或 Cmd+Shift+Delete）

### Q: 样式没有加载？
A:
1. 检查 CSS 文件是否正确上传
2. 清除浏览器缓存
3. 在浏览器开发者工具中检查是否有 404 错误

### Q: 想要使用自定义域名？
A:
1. 在仓库设置的 Pages 部分添加自定义域名
2. 在你的域名提供商处配置 DNS 记录

## 文件说明

- `index.html` - 主网页文件
- `styles.css` - 样式表
- `README.md` - 项目说明
- `.gitignore` - Git 忽略规则
- `DEPLOY.md` - 本部署指南

## 后续改进

可以考虑的改进方向：

- [ ] 添加搜索功能
- [ ] 添加打印/导出 PDF 功能
- [ ] 添加深色模式切换
- [ ] 添加评论功能
- [ ] 集成数据可视化图表
- [ ] 添加多语言支持

---

需要帮助？查看 [GitHub Pages 官方文档](https://docs.github.com/en/pages)
