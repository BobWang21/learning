import os
import re
from pathlib import Path

# 获取所有 HTML 文件（除了首页）
html_files = list(Path('/Users/wangbao/ts-model-survey').glob('*.html'))
html_files = [f for f in html_files if f.name != 'index.html']

# 处理每个文件
for html_file in sorted(html_files):
    print(f"处理: {html_file.name}")
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找并删除 article-link 相关的行
    # 模式：<a href="..." class="article-link">查看详情 →</a>
    pattern = r'\s*<a href="[^"]*" class="article-link">查看详情 →</a>\s*'
    
    # 替换为空
    new_content = re.sub(pattern, '', content)
    
    # 检查是否有变化
    if new_content != content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  ✓ 删除了 'article-link' 链接")
    else:
        print(f"  - 没有找到 'article-link' 链接")

print("\n完成！")
