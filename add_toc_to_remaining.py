import os
import re
from pathlib import Path

# 只处理 decision.html 和 models.html
html_files = [
    Path('/Users/wangbao/ts-model-survey/decision.html'),
    Path('/Users/wangbao/ts-model-survey/models.html')
]

def extract_headings(content):
    """提取页面中的 h2 和 h3 标题"""
    headings = []
    
    # 查找所有 h2 和 h3 标签
    h2_pattern = r'<h2[^>]*>([^<]+)</h2>'
    h3_pattern = r'<h3[^>]*>([^<]+)</h3>'
    
    h2_matches = re.finditer(h2_pattern, content)
    h3_matches = re.finditer(h3_pattern, content)
    
    # 收集所有标题及其位置
    all_headings = []
    
    for match in h2_matches:
        all_headings.append({
            'level': 2,
            'text': match.group(1).strip(),
            'pos': match.start()
        })
    
    for match in h3_matches:
        all_headings.append({
            'level': 3,
            'text': match.group(1).strip(),
            'pos': match.start()
        })
    
    # 按位置排序
    all_headings.sort(key=lambda x: x['pos'])
    
    return all_headings

def generate_toc_html(headings):
    """生成目录 HTML"""
    if not headings:
        return ""
    
    toc_html = '<div class="page-toc">\n'
    toc_html += '    <h4 style="margin-bottom: 15px; color: #1e40af;">📑 页面目录</h4>\n'
    toc_html += '    <ul style="list-style: none; padding: 0; margin: 0;">\n'
    
    for heading in headings:
        # 生成 ID
        heading_id = re.sub(r'[^\w\s-]', '', heading['text']).strip().replace(' ', '-').lower()
        heading_id = re.sub(r'-+', '-', heading_id)
        
        if heading['level'] == 2:
            toc_html += f'        <li style="margin-bottom: 8px;"><a href="#{heading_id}" style="color: #1e40af; text-decoration: none; font-weight: 600;">{heading["text"]}</a></li>\n'
        else:  # h3
            toc_html += f'        <li style="margin-left: 20px; margin-bottom: 6px;"><a href="#{heading_id}" style="color: #7c3aed; text-decoration: none; font-size: 0.95rem;">{heading["text"]}</a></li>\n'
    
    toc_html += '    </ul>\n'
    toc_html += '</div>\n'
    
    return toc_html

def add_ids_to_headings(content, headings):
    """为标题添加 ID"""
    for heading in headings:
        heading_id = re.sub(r'[^\w\s-]', '', heading['text']).strip().replace(' ', '-').lower()
        heading_id = re.sub(r'-+', '-', heading_id)
        
        # 更精确的替换
        pattern = f"<h{heading['level']}[^>]*>{re.escape(heading['text'])}</h{heading['level']}>"
        new_tag = f'<h{heading["level"]} id="{heading_id}">{heading["text"]}</h{heading["level"]}>'
        content = re.sub(pattern, new_tag, content)
    
    return content

# 处理每个文件
for html_file in sorted(html_files):
    print(f"处理: {html_file.name}")
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否已经有 TOC
    if 'page-toc' in content:
        print(f"  跳过: 已存在 TOC")
        continue
    
    # 提取标题
    headings = extract_headings(content)
    
    if not headings:
        print(f"  跳过: 没有找到标题")
        continue
    
    # 生成目录 HTML
    toc_html = generate_toc_html(headings)
    
    # 添加 ID 到标题
    content = add_ids_to_headings(content, headings)
    
    # 在 breadcrumb 或 header 后面插入目录
    # 先尝试找 breadcrumb
    breadcrumb_pattern = r'(<div class="breadcrumb">.*?</div>)'
    match = re.search(breadcrumb_pattern, content, re.DOTALL)
    
    if match:
        insert_pos = match.end()
        content = content[:insert_pos] + '\n\n            ' + toc_html + content[insert_pos:]
    else:
        # 如果没有 breadcrumb，在 header 后插入
        header_pattern = r'(</header>)'
        match = re.search(header_pattern, content)
        if match:
            insert_pos = match.end()
            content = content[:insert_pos] + '\n\n            ' + toc_html + content[insert_pos:]
    
    # 写回文件
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  成功: 添加了 {len(headings)} 个标题的目录")

print("\n完成！")
