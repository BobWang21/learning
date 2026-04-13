#!/bin/bash

# GitHub Pages启用脚本
# 使用GitHub API启用Pages

set -e

# 配置
OWNER="BobWang21"
REPO="learning"
TOKEN="${GITHUB_TOKEN}"

if [ -z "$TOKEN" ]; then
    echo "❌ 错误: 需要GitHub token"
    echo ""
    echo "使用方法:"
    echo "  export GITHUB_TOKEN=your_token"
    echo "  bash enable_pages.sh"
    echo ""
    echo "或者:"
    echo "  bash enable_pages.sh your_token"
    exit 1
fi

# 如果token作为参数传入
if [ -z "$GITHUB_TOKEN" ] && [ ! -z "$1" ]; then
    TOKEN="$1"
fi

echo "🚀 启用GitHub Pages..."
echo "仓库: $OWNER/$REPO"
echo ""

# 调用GitHub API启用Pages
echo "📝 发送请求到GitHub API..."
RESPONSE=$(curl -s -X POST \
  https://api.github.com/repos/$OWNER/$REPO/pages \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{
    "source": {
      "branch": "main",
      "path": "/"
    }
  }')

# 检查响应
if echo "$RESPONSE" | grep -q '"status"'; then
    STATUS=$(echo "$RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    echo "✅ Pages已启用!"
    echo "状态: $STATUS"
    echo ""
    echo "🌐 网站地址: https://$OWNER.github.io/$REPO/"
    echo ""
    echo "⏳ 等待1-3分钟让GitHub构建网站..."
elif echo "$RESPONSE" | grep -q '"message"'; then
    MESSAGE=$(echo "$RESPONSE" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)
    echo "ℹ️  信息: $MESSAGE"
    echo ""
    if [[ "$MESSAGE" == *"already exists"* ]]; then
        echo "✅ Pages已经启用！"
        echo "🌐 网站地址: https://$OWNER.github.io/$REPO/"
        echo ""
        echo "如果网站显示404，请等待1-3分钟后刷新。"
    else
        echo "❌ 出错: $MESSAGE"
        echo ""
        echo "完整响应:"
        echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
        exit 1
    fi
else
    echo "❌ 未知错误"
    echo ""
    echo "完整响应:"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
    exit 1
fi
