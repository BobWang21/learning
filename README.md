# 📚 AI 学习平台

一个系统化的 AI 学习资源平台，涵盖大语言模型的基础理论、预训练、后训练和智能体应用等前沿研究。

🌐 **在线访问**: [https://bobwang21.github.io/learning/](https://bobwang21.github.io/learning/)

---

## 📋 平台概览

本学习平台分为三个主要学习方向：

### 🤖 AI 研究
大语言模型与智能体的系统化学习路径，包括基础理论和前沿应用。

#### 🏗️ 基座（Foundation）
- **1. Model** - 大语言模型的基础架构与设计原理
  - [GPT 模型原理](https://bobwang21.github.io/learning/ai-model-gpt-principles.html)
  - [注意力机制](https://bobwang21.github.io/learning/ai-model-attention-mechanism.html)

- **2. Pre-training** - 预训练阶段的关键技术与方法
  - [token-BPE 算法](https://bobwang21.github.io/learning/ai-pretraining-token-bpe.html)

- **3. Post-training** - 后训练阶段的优化与对齐方法
  - [Post-Training 全景指南](https://bobwang21.github.io/learning/ai-posttraining-overview.html) - 从 RLHF 到 GRPO 再到 Agentic RL
  - [PEFT 详解](https://bobwang21.github.io/learning/ai-posttraining-peft.html) - 参数高效微调技术

#### 🤖 Agent（智能体）
- **Tools** - [Function Calling、MCP 和 Skills 详解](https://bobwang21.github.io/learning/ai-agent-function-calling.html)
- **Planning** - [ReAct、Plan-and-Solve 等规划框架](https://bobwang21.github.io/learning/ai-agent.html)
- **Memory** - [智能体的记忆机制](https://bobwang21.github.io/learning/ai-agent-memory.html)
- **Self-Evolving** - [自我进化智能体的调查](https://bobwang21.github.io/learning/ai-agent-self-evolving.html)
- **Multi-Agent** - [多智能体系统的设计与优化](https://bobwang21.github.io/learning/ai-agent-multi-agent.html)
- **RAG** - [检索增强生成完全指南](https://bobwang21.github.io/learning/ai-agent-rag.html)
- **LLM Agent Survey** - [LLM 智能体的全面调查](https://bobwang21.github.io/learning/ai-agent-llm-survey.html)
- **Agentic Reasoning** - [智能体的推理能力](https://bobwang21.github.io/learning/ai-agent-agentic-reasoning.html)
- **Knowledge Graph** - [知识图谱与智能体](https://bobwang21.github.io/learning/ai-agent-knowledge-graph.html)
- **Tree of Thoughts** - [思维树推理方法](https://bobwang21.github.io/learning/ai-agent-tree-of-thoughts.html)
- **Agentic RL** - [智能体强化学习](https://bobwang21.github.io/learning/ai-agent-agentic-rl.html)

### 🔄 端到端（End-to-End）
[预测与决策结合的范式](https://bobwang21.github.io/learning/decision.html) - 系统梳理三大主流范式（SO、E2E、DL）的理论基础、优势和局限。

### ⏱️ 预测（Time Series）
[时序模型调研](https://bobwang21.github.io/learning/models.html) - 系统梳理了深度学习模型和大模型在时间序列预测中的应用。

---

## 🚀 快速开始

### 本地查看
1. 克隆仓库
```bash
git clone https://github.com/BobWang21/learning.git
cd learning
```

2. 用浏览器打开 `index.html`
```bash
open index.html  # macOS
# 或在 Windows 中双击 index.html
```

### 在线查看
访问 GitHub Pages: [https://bobwang21.github.io/learning/](https://bobwang21.github.io/learning/)

---

## ✨ 主要特性

- 🎨 **现代化设计** - 清爽的界面，支持深色侧边栏导航
- 📱 **响应式布局** - 完全支持移动设备和各种屏幕尺寸
- 🔗 **完整导航** - 统一的侧边栏导航贯穿所有页面
- 📑 **自动目录** - 每个页面都有自动生成的目录（TOC）
- 🎯 **快速访问** - 卡片直接导航，无需额外按钮
- 💾 **离线阅读** - 所有资源本地存储，支持离线访问

---

## 📁 项目结构

```
learning/
├── index.html                              # 首页
├── styles.css                              # 全局样式
├── README.md                               # 本文件
│
├── 🤖 AI 研究
│   ├── ai-model.html                       # 1. Model
│   │   ├── ai-model-gpt-principles.html    # GPT 模型原理
│   │   └── ai-model-attention-mechanism.html # 注意力机制
│   │
│   ├── ai-pretraining.html                 # 2. Pre-training
│   │   └── ai-pretraining-token-bpe.html   # token-BPE 算法
│   │
│   ├── ai-posttraining.html                # 3. Post-training
│   │   ├── ai-posttraining-overview.html   # Post-Training 全景指南
│   │   └── ai-posttraining-peft.html       # PEFT 详解
│   │
│   └── ai-agent.html                       # 4. Agent
│       ├── ai-agent-function-calling.html  # Tools
│       ├── ai-agent-llm-survey.html        # LLM Agent Survey
│       ├── ai-agent-agentic-reasoning.html # Agentic Reasoning
│       ├── ai-agent-memory.html            # Memory
│       ├── ai-agent-self-evolving.html     # Self-Evolving
│       ├── ai-agent-multi-agent.html       # Multi-Agent Systems
│       ├── ai-agent-agentic-rl.html        # Agentic RL
│       ├── ai-agent-knowledge-graph.html   # Knowledge Graph
│       ├── ai-agent-rag.html               # RAG
│       └── ai-agent-tree-of-thoughts.html  # Tree of Thoughts
│
├── 🔄 端到端
│   └── decision.html                       # 预测与决策结合的范式
│
└── ⏱️ 预测
    └── models.html                         # 时序模型调研
```

---

## 📚 核心内容

### AI 基座（Foundation）

#### 1. Model - 大语言模型基础
- 模型架构与设计原理
- Transformer 的演进
- 注意力机制的深度理解
- GPT、BERT 等经典模型

#### 2. Pre-training - 预训练技术
- Tokenization 与 BPE 算法
- 大规模语言模型预训练
- 数据处理与优化
- 预训练的最佳实践

#### 3. Post-training - 后训练优化
- **SFT** (Supervised Fine-Tuning) - 监督微调
- **RLHF** (Reinforcement Learning from Human Feedback) - 人类反馈强化学习
- **DPO** (Direct Preference Optimization) - 直接偏好优化
- **GRPO** (Group Relative Policy Optimization) - 组相对策略优化
- **RLVR** (Reinforcement Learning with Verifiable Rewards) - 可验证奖励强化学习
- **PPO** (Proximal Policy Optimization) - 近端策略优化
- **PEFT** (Parameter-Efficient Fine-Tuning) - 参数高效微调
  - LoRA (Low-Rank Adaptation)
  - QLoRA (Quantized LoRA)
  - Prefix Tuning
  - Adapter

### AI Agent（智能体）

#### 工具与能力
- **Function Calling** - 函数调用机制
- **MCP** - Model Context Protocol
- **Skills** - 智能体技能系统

#### 规划与推理
- **ReAct** - Reasoning + Acting
- **Plan-and-Solve** - 规划与求解
- **Tree of Thoughts** - 思维树
- **Agentic Reasoning** - 智能体推理

#### 记忆与学习
- **Memory** - 短期、长期、工作记忆
- **Self-Evolving** - 自我进化能力
- **Agentic RL** - 强化学习

#### 高级能力
- **RAG** - 检索增强生成
- **Multi-Agent** - 多智能体协作
- **Knowledge Graph** - 知识图谱集成
- **LLM Agent Survey** - 智能体调查综述

### 端到端学习（E2E）
- 预测与决策的结合
- SPO (Smart Predict-then-Optimize)
- 隐式微分方法
- 近似方法

### 时间序列预测
- 深度学习模型（TFT、NBEATSx、PatchTST、TiDE 等）
- 大模型应用（TimesFM、Chronos、Moirai 等）
- 模型对比与性能评估

---

## 🔑 关键概念

### LLM 训练流程
```
Pre-training (预训练)
    ↓
Post-training (后训练)
    ├── SFT (监督微调)
    ├── RL (强化学习)
    └── 偏好优化 (DPO/GRPO/RLVR)
    ↓
Deployment (部署应用)
    ├── Fine-tuning (PEFT)
    ├── Agent (智能体)
    └── RAG (知识增强)
```

### 后训练方法对比

| 方法 | 类型 | 特点 | 应用场景 |
|------|------|------|---------|
| SFT | 监督学习 | 基础、直接 | 初始对齐 |
| RLHF | 强化学习 | 需要 Reward Model | 人类偏好对齐 |
| DPO | 离线优化 | 无需 Reward Model | 直接偏好学习 |
| GRPO | 在线 RL | 轻量级、高效 | 大规模训练 |
| RLVR | 验证奖励 | 可验证性强 | 推理任务 |

---

## 🌟 学习路径建议

### 初学者
1. 从 **Model** 开始，理解 Transformer 和注意力机制
2. 学习 **Pre-training** 中的基础概念
3. 浏览 **Post-training** 的直观理解部分

### 进阶学习者
1. 深入学习 **Post-training** 的核心方法
2. 探索 **Agent** 中的规划和推理能力
3. 理解 **RAG** 和知识增强

### 研究者
1. 全面学习所有 **Post-training** 技术
2. 深入研究 **Agent** 的各个方向
3. 关注最新的 **Agentic RL** 和 **Self-Evolving** 研究

---

## 📊 统计信息

- **总页面数**: 23 个
- **主要类别**: 7 个（首页 + 3 个基座 + 10 个 Agent + 2 个其他）
- **文章总数**: 16 个子页面
- **内容覆盖**:
  - AI 基础：4 个页面
  - AI Agent：10 个页面
  - 端到端学习：1 个页面
  - 时间序列预测：1 个页面

---

## 🔄 更新日志

- **2026-04-13** - 完成 Post-Training 全景指南的上传，包含 5 张图片、6 个表格和完整的参考文献
- **2026-04-** - 优化卡片导航，实现直接点击访问
- **2026-04-** - 添加页面目录（TOC）功能到所有子页面
- **2026-03-** - 完成 AI Agent 10 个子页面的创建
- **2026-03-** - 建立学习平台的基本框架

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个学习平台！

### 如何贡献
1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

---

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 📞 联系方式

- **GitHub**: [BobWang21](https://github.com/BobWang21)
- **项目链接**: [https://github.com/BobWang21/learning](https://github.com/BobWang21/learning)
- **在线平台**: [https://bobwang21.github.io/learning/](https://bobwang21.github.io/learning/)

---

## 🎓 致谢

感谢所有为这个学习平台做出贡献的研究者和开发者！

---

**最后更新**: 2026-04-13
