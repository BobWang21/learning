import os
import re
from pathlib import Path

# 获取所有 HTML 文件（除了首页）
html_files = list(Path('/Users/wangbao/ts-model-survey').glob('*.html'))
html_files = [f for f in html_files if f.name not in ['index.html', 'add_toc.py']]

# 新的侧边栏结构
new_sidebar = '''        <div class="sidebar">
            <div class="logo">📚 索引</div>
            <ul class="toc">
                <li><a href="index.html">🏠 首页</a></li>
                <li><a href="index.html#ai">🤖 AI</a>
                    <ul>
                        <li><a href="ai-model.html">1. Model</a>
                            <ul>
                                <li><a href="ai-model-gpt-principles.html">GPT 模型原理</a></li>
                                <li><a href="ai-model-attention-mechanism.html">注意力机制</a></li>
                            </ul>
                        </li>
                        <li><a href="ai-pretraining.html">2. Pre-training</a>
                            <ul>
                                <li><a href="ai-pretraining-token-bpe.html">token-BPE 算法</a></li>
                            </ul>
                        </li>
                        <li><a href="ai-posttraining.html">3. Post-training</a>
                            <ul>
                                <li><a href="ai-posttraining-overview.html">Post-Training 全景指南</a></li>
                                <li><a href="ai-posttraining-peft.html">PEFT 详解</a></li>
                            </ul>
                        </li>
                        <li><a href="ai-agent.html">4. Agent</a>
                            <ul>
                                <li><a href="ai-agent-llm-survey.html">LLM Agent Survey</a></li>
                                <li><a href="ai-agent-agentic-reasoning.html">Agentic Reasoning</a></li>
                                <li><a href="ai-agent-memory.html">Memory</a></li>
                                <li><a href="ai-agent-self-evolving.html">Self-Evolving</a></li>
                                <li><a href="ai-agent-multi-agent.html">Multi-Agent Systems</a></li>
                                <li><a href="ai-agent-agentic-rl.html">Agentic RL</a></li>
                                <li><a href="ai-agent-knowledge-graph.html">Knowledge Graph</a></li>
                                <li><a href="ai-agent-rag.html">RAG</a></li>
                                <li><a href="ai-agent-tree-of-thoughts.html">Tree of Thoughts</a></li>
                                <li><a href="ai-agent-function-calling.html">Tools</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li><a href="decision.html">🔄 端到端</a></li>
                <li><a href="models.html">⏱️ 预测</a></li>
            </ul>
        </div>'''

# 处理每个文件
for html_file in sorted(html_files):
    print(f"处理: {html_file.name}")
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找旧的侧边栏
    sidebar_pattern = r'<div class="sidebar">.*?</div>\s*(?=<main|<header)'
    match = re.search(sidebar_pattern, content, re.DOTALL)
    
    if match:
        old_sidebar = match.group(0)
        # 替换为新的侧边栏
        content = content.replace(old_sidebar, new_sidebar + '\n\n        ')
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  成功: 更新侧边栏")
    else:
        print(f"  跳过: 找不到侧边栏")

print("\n完成！")
