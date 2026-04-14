#!/usr/bin/env python3
"""
批量添加编辑器引用到 HTML 文件
在每个文件的 </body> 前插入 Quill.js 和编辑器脚本
"""

import os
import glob

# 编辑器引用代码
EDITOR_SNIPPET = '''    <!-- 在线编辑器 - Quill.js + GitHub API -->
    <link rel="stylesheet" href="https://cdn.quilljs.com/1.3.7/quill.snow.css">
    <link rel="stylesheet" href="editor.css">
    <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
    <script src="editor.js"></script>
'''

def batch_add_editor():
    """批量添加编辑器引用"""

    # 获取所有 HTML 文件
    html_files = glob.glob('*.html')

    # 排除 index.html（首页结构不同，没有 .ai-section）
    html_files = [f for f in html_files if f != 'index.html']

    print(f"找到 {len(html_files)} 个需要处理的 HTML 文件")
    print("-" * 60)

    modified_count = 0
    skipped_count = 0

    for filepath in sorted(html_files):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # 检查是否已经添加过
            if 'editor.js' in content:
                print(f"⏭️  跳过（已存在）: {filepath}")
                skipped_count += 1
                continue

            # 检查是否有 </body> 标签
            if '</body>' not in content:
                print(f"❌ 错误（未找到 </body>）: {filepath}")
                continue

            # 插入编辑器引用
            new_content = content.replace('</body>', EDITOR_SNIPPET + '</body>')

            # 写回文件
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"✅ 已处理: {filepath}")
            modified_count += 1

        except Exception as e:
            print(f"⚠️  错误: {filepath} - {str(e)}")

    print("-" * 60)
    print(f"修改完成: {modified_count} 个文件已更新，{skipped_count} 个文件已跳过")

if __name__ == '__main__':
    batch_add_editor()
