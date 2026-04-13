# 时序模型调研

这是一个关于时间序列预测模型的综合调研文档，涵盖从传统深度学习方法到最新的基础模型（Foundation Models）的发展历程。

## 📋 内容概览

### 一、结论
- 模型选择的关键评估维度
- 不同模型类型的特性对比表

### 二、背景
- 预估问题的特点
- 选择深度模型的原因

### 三、深度模型
1. **TFT** (Temporal Fusion Transformer) - 牛津+谷歌云 (2020)
2. **NBEATSx** - Salesforce Research (2022)
3. **PatchTST** - 普林斯顿+IBM (2023)
4. **TiDE** - Google Research (2023)
5. **iTransformer** - 清华+蚂蚁 (2024)
6. **TimeXer** - 清华 (2024)

### 四、大模型
1. **TimesFM** - Google Research (2024)
2. **TimePFN** - University of Michigan (2024)
3. **Moirai 系列** - Salesforce AI Research (2024)
   - Moirai 1.0
   - Moirai-MOE
   - Moirai 2.0
4. **Chronos 系列** - AWS AI Labs (2024)
   - Chronos 1
   - Chronos 2
   - Chronos X

## 🚀 快速开始

### 本地查看
1. 克隆仓库
```bash
git clone https://github.com/BobWang21/ts-model-survey.git
cd ts-model-survey
```

2. 用浏览器打开 `index.html`
```bash
open index.html  # macOS
# 或在Windows中双击index.html
```

### 在线查看
访问 GitHub Pages: [https://bobwang21.github.io/ts-model-survey/](https://bobwang21.github.io/ts-model-survey/)

## 📊 主要特性

- 🎨 现代化的网页设计，支持深色侧边栏导航
- 📱 完全响应式设计，支持移动设备
- 🔗 快速导航和平滑滚动
- 📈 清晰的表格和对比
- 💾 可离线阅读

## 📁 项目结构

```
ts-model-survey/
├── index.html          # 主网页
├── styles.css          # 样式文件
├── README.md           # 本文件
└── .gitignore         # Git忽略文件
```

## 🔍 关键概念

### 模型分类
- **MLP类**: 简单高效，适合小规模数据
- **Transformer类**: 强大的长期依赖建模
- **LM类**: 通用的大模型方案

### 通道处理方式
- **通道独立**: 每个变量独立处理
- **通道混合**: 变量间完全交互
- **通道依赖**: 显式建模相关变量间的关系

### 协变量类型
- **静态协变量**: 时间不变的特征
- **过去已知协变量**: 历史可观测的特征
- **未来已知协变量**: 提前知道的外生变量

## 💡 核心洞察

1. **大模型的零样本能力**: TimesFM、Chronos等大模型在未见过的数据集上表现出色
2. **合成数据的重要性**: 高质量的合成数据对模型泛化能力至关重要
3. **架构演进**: 从编码器-解码器到解码器-only，再到混合专家等创新架构
4. **效率与精度的平衡**: 轻量级Adapter和参数高效微调成为新趋势

## 📚 参考资源

- 原始文档: [美团KM文档](https://km.sankuai.com/collabpage/2756971702)
- 相关论文和代码库链接详见各模型章节

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个文档！

## 📝 许可证

本项目采用 MIT 许可证

## ✨ 更新日志

- **2024年**: 初始版本，涵盖主流时序预测模型

---

**最后更新**: 2024年
**文档来源**: 美团内部研究综述
