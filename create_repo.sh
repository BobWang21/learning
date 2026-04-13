#!/bin/bash

# GitHub仓库创建脚本
# 需要GitHub token作为环境变量或命令行参数

set -e

# 配置
REPO_NAME="ts-model-survey"
REPO_DESCRIPTION="时序模型调研 - 深度学习与大模型在时间序列预测中的应用"
USERNAME="BobWang21"

# 获取token
if [ -z "$GITHUB_TOKEN" ]; then
    if [ -z "$1" ]; then
        echo "❌ 错误: 需要GitHub token"
        echo ""
        echo "使用方法:"
        echo "  方式1: 设置环境变量"
        echo "    export GITHUB_TOKEN=your_token"
        echo "    bash create_repo.sh"
        echo ""
        echo "  方式2: 作为命令行参数"
        echo "    bash create_repo.sh your_token"
        echo ""
        echo "如何获取GitHub token:"
        echo "  1. 访问: https://github.com/settings/tokens"
        echo "  2. 点击 'Generate new token (classic)'"
        echo "  3. 选择 'repo' 权限"
        echo "  4. 生成并复制token"
        exit 1
    fi
    GITHUB_TOKEN="$1"
fi

echo "🚀 开始创建GitHub仓库..."
echo "仓库名: $REPO_NAME"
echo "用户: $USERNAME"
echo ""

# 创建仓库
echo "📝 创建仓库..."
RESPONSE=$(curl -s -X POST https://api.github.com/user/repos \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d "{
    \"name\": \"$REPO_NAME\",
    \"description\": \"$REPO_DESCRIPTION\",
    \"private\": false,
    \"auto_init\": false
  }")

# 检查是否成功
if echo "$RESPONSE" | grep -q '"id"'; then
    echo "✅ 仓库创建成功！"
    echo ""
    echo "📤 推送代码..."

    # 推送代码
    git push -u origin main

    echo ""
    echo "✨ 完成！"
    echo ""
    echo "🌐 仓库地址: https://github.com/$USERNAME/$REPO_NAME"
    echo ""
    echo "📋 后续步骤:"
    echo "  1. 访问仓库: https://github.com/$USERNAME/$REPO_NAME"
    echo "  2. 进入 Settings → Pages"
    echo "  3. 选择 main 分支"
    echo "  4. 点击 Save"
    echo ""
    echo "🎉 网站将发布到: https://$USERNAME.github.io/$REPO_NAME/"
else
    echo "❌ 仓库创建失败！"
    echo ""
    echo "错误信息:"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
    exit 1
fi
