# 快速开始指南

## 🎯 5分钟快速上手

### 1️⃣ 本地查看网页

```bash
# 方式A: 直接打开 (macOS/Linux)
open index.html

# 方式B: 用浏览器打开
# Windows/Mac: 双击 index.html
# 或拖拽到浏览器

# 方式C: 启动本地服务器
python3 -m http.server 8000
# 访问 http://localhost:8000
```

### 2️⃣ 上传到GitHub

**前提**: 已安装 Git 和有 GitHub 账户

```bash
# 第一步: 在GitHub创建空仓库
# 访问 https://github.com/new
# 仓库名: ts-model-survey
# 选择: Public
# 不要初始化任何文件

# 第二步: 推送代码
cd /Users/wangbao/ts-model-survey

git remote add origin https://github.com/BobWang21/ts-model-survey.git
git branch -M main
git push -u origin main

# 完成!
```

### 3️⃣ 启用GitHub Pages

1. 打开仓库: https://github.com/BobWang21/ts-model-survey
2. 点击 **Settings** (设置)
3. 左侧选 **Pages**
4. Source 选择 `main` 分支
5. 点 **Save**
6. 等待 1-3 分钟

✅ 网站发布到: `https://bobwang21.github.io/ts-model-survey/`

---

## 📱 网页功能

| 功能 | 说明 |
|------|------|
| 侧边栏导航 | 快速跳转到各章节 |
| 平滑滚动 | 点击导航自动滚动到目标 |
| 响应式设计 | 在手机、平板、电脑上都能完美显示 |
| 离线阅读 | 下载后可离线使用 |
| 表格对比 | 清晰的模型对比表 |
| 搜索 | 浏览器Ctrl+F搜索 |

---

## 🎨 网页内容

### 主要章节
- **结论** - 模型选择的关键评估维度
- **背景** - 为什么选择深度学习
- **深度模型** - TFT, NBEATSx, PatchTST 等 6 个模型
- **大模型** - TimesFM, Moirai, Chronos 等基础模型
- **附录** - 关键概念和术语解释

### 特色内容
- 📊 模型特性对比表
- 🏆 机构和发表年份标记
- 📈 配置方案对比
- 🔗 快速导航

---

## 🔧 如何编辑

### 编辑网页内容

打开 `index.html`，找到对应章节，修改 HTML 内容：

```html
<!-- 例如修改标题 -->
<h2>新的标题名称</h2>

<!-- 修改表格 -->
<table>
  <tr>
    <td>新内容</td>
  </tr>
</table>
```

### 修改样式

编辑 `styles.css` 修改外观：

```css
/* 修改颜色 */
:root {
    --primary-color: #新颜色代码;
}

/* 修改字体大小 */
h1 {
    font-size: 新大小;
}
```

### 提交更改

```bash
git add .
git commit -m "描述你的修改"
git push origin main
```

GitHub Pages 会自动更新！

---

## ❓ 常见问题

### Q: 网站显示不了？
**A:**
- 检查是否启用了 GitHub Pages (Settings → Pages)
- 等待 2-3 分钟让 GitHub 构建
- 清除浏览器缓存 (Ctrl+Shift+Delete)

### Q: 样式加载不出来？
**A:**
- 刷新页面 (Ctrl+F5)
- 检查是否上传了 styles.css
- 查看浏览器控制台是否有错误

### Q: 想要用自己的域名？
**A:**
- Settings → Pages → Custom domain
- 配置域名的 DNS 记录指向 GitHub Pages

### Q: 如何分享网站？
**A:**
- 复制网址: `https://bobwang21.github.io/ts-model-survey/`
- 或在 GitHub 仓库中点击 "Share"

---

## 📚 文件说明

```
ts-model-survey/
├── index.html        ← 主网页，包含所有内容
├── styles.css        ← 样式表，控制外观
├── README.md         ← 项目说明
├── DEPLOY.md         ← 详细部署指南
├── QUICK_START.md    ← 本文件
├── .gitignore        ← Git 配置
└── .git/             ← Git 仓库数据
```

---

## 🚀 下一步

- [ ] 创建 GitHub 仓库
- [ ] 推送代码到 GitHub
- [ ] 启用 GitHub Pages
- [ ] 分享网址给朋友
- [ ] 根据需要编辑和更新内容

---

## 💡 小贴士

1. **本地测试**: 修改后先在本地用浏览器打开测试
2. **Git 提交**: 定期提交修改，便于版本管理
3. **浏览器支持**: 现代浏览器均支持，包括 Chrome、Firefox、Safari、Edge
4. **手机查看**: 网页已优化，手机上查看效果很好
5. **分享**: 可以在 Twitter、LinkedIn 等分享网址

---

需要帮助？查看 [DEPLOY.md](DEPLOY.md) 了解更多详情。
