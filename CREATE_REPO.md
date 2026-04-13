# 创建GitHub仓库步骤

## ✅ SSH连接已验证成功

你的SSH公钥已正确配置到GitHub。现在需要创建仓库。

## 📝 创建仓库

### 方式1: 通过网页创建（推荐）

1. **打开GitHub新建仓库页面**
   - 访问: https://github.com/new

2. **填写仓库信息**
   - Repository name: `ts-model-survey`
   - Description: `时序模型调研 - 深度学习与大模型在时间序列预测中的应用`
   - 选择: **Public** (公开)

3. **关键设置**
   - ❌ 不要勾选 "Add a README file"
   - ❌ 不要选择 .gitignore
   - ❌ 不要选择 license

4. **点击 "Create repository"**

### 方式2: 使用GitHub CLI创建

如果你安装了 `gh` CLI：

```bash
gh repo create ts-model-survey --public --source=. --remote=origin --push
```

## 🚀 创建完成后

创建完仓库后，运行以下命令推送代码：

```bash
cd /Users/wangbao/ts-model-survey
git push -u origin main
```

## ✨ 启用GitHub Pages

1. 进入仓库: https://github.com/BobWang21/ts-model-survey
2. 点击 **Settings**
3. 左侧选择 **Pages**
4. 在 "Build and deployment" 下：
   - Source: 选择 **Deploy from a branch**
   - Branch: 选择 **main** 分支
   - Folder: 选择 **/ (root)**
5. 点击 **Save**

## 🎉 完成！

稍等 1-3 分钟，你的网站就会发布到：

```
https://bobwang21.github.io/ts-model-survey/
```

---

## 问题排查

### 如果推送失败

```bash
# 检查远程配置
git remote -v

# 如果远程已存在，先删除
git remote remove origin

# 重新添加
git remote add origin git@github.com:BobWang21/ts-model-survey.git

# 再次推送
git push -u origin main
```

### 确认SSH密钥

```bash
# 测试SSH连接
ssh -T git@github.com

# 应该看到: "Hi BobWang21! You've successfully authenticated..."
```
