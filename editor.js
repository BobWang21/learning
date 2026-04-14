/**
 * 在线编辑器 - Quill.js + GitHub API
 * 支持编辑页面内容和上传图片
 */

const EditorState = {
  isEditing: false,
  quillInstance: null,
  currentFilePath: null,
  currentFileSha: null,
  originalFileContent: null,
  originalSectionContent: null,
  githubToken: null,
  aiSection: null
};

const GITHUB_API_BASE = 'https://api.github.com/repos/BobWang21/learning/contents';
const GITHUB_PAGES_BASE = 'https://bobwang21.github.io/learning';

/**
 * 初始化编辑器 UI - 在页面加载时调用
 */
function initEditorUI() {
  // 检查页面是否有 .ai-section（首页没有）
  const aiSection = document.querySelector('.ai-section');
  if (!aiSection) {
    console.log('此页面无 .ai-section，跳过编辑器初始化');
    return;
  }

  EditorState.aiSection = aiSection;

  // 创建工具栏 HTML
  const toolbar = document.createElement('div');
  toolbar.id = 'editor-toolbar';
  toolbar.className = 'editor-toolbar';
  toolbar.innerHTML = `
    <div class="editor-status-bar" id="status-bar" style="display: none;"></div>
    <div class="editor-buttons">
      <button id="edit-btn" class="editor-btn editor-btn-edit" title="编辑此页面">
        ✏️ 编辑
      </button>
      <button id="token-btn" class="editor-btn editor-btn-token" title="设置 GitHub Token">
        🔑 Token
      </button>
    </div>
  `;
  document.body.appendChild(toolbar);

  // 事件监听
  document.getElementById('edit-btn').addEventListener('click', handleEditClick);
  document.getElementById('token-btn').addEventListener('click', handleTokenClick);

  // 从 localStorage 恢复 Token
  const savedToken = localStorage.getItem('github_editor_token');
  if (savedToken) {
    EditorState.githubToken = savedToken;
    updateTokenButtonStatus(true);
  }
}

/**
 * 处理编辑按钮点击
 */
async function handleEditClick() {
  if (EditorState.isEditing) {
    // 已在编辑模式，点击变成"保存"
    await saveContent();
  } else {
    // 进入编辑模式
    await enterEditMode();
  }
}

/**
 * 处理 Token 按钮点击
 */
function handleTokenClick() {
  const token = prompt('请输入 GitHub Personal Access Token:\n(需要 repo 权限)\n\n当前状态: ' +
    (EditorState.githubToken ? '已设置' : '未设置'));

  if (token === null) return; // 用户取消

  if (token.trim() === '') {
    localStorage.removeItem('github_editor_token');
    EditorState.githubToken = null;
    updateTokenButtonStatus(false);
    showStatus('Token 已清除', 'info');
  } else {
    // 验证 Token 是否有效
    verifyToken(token);
  }
}

/**
 * 验证 GitHub Token 是否有效
 */
async function verifyToken(token) {
  try {
    showStatus('正在验证 Token...', 'info');

    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    console.log('Token 验证响应状态:', response.status);

    if (response.status === 401 || response.status === 403) {
      throw new Error('Token 无效或权限不足');
    }

    if (!response.ok) {
      throw new Error(`验证失败: ${response.status} ${response.statusText}`);
    }

    const userData = await response.json();
    console.log('Token 有效，用户:', userData.login);

    // Token 有效，保存它
    EditorState.githubToken = token;
    localStorage.setItem('github_editor_token', token);
    updateTokenButtonStatus(true);
    showStatus(`✓ Token 已验证并保存 (用户: ${userData.login})`, 'success');
  } catch (error) {
    console.error('Token 验证失败:', error);
    EditorState.githubToken = null;
    localStorage.removeItem('github_editor_token');
    updateTokenButtonStatus(false);
    showStatus(`✗ Token 验证失败: ${error.message}`, 'error');
  }
}

/**
 * 更新 Token 按钮状态
 */
function updateTokenButtonStatus(hasToken) {
  const btn = document.getElementById('token-btn');
  if (hasToken) {
    btn.classList.add('token-set');
    btn.title = '已设置 Token（点击修改）';
  } else {
    btn.classList.remove('token-set');
    btn.title = '未设置 Token（点击设置）';
  }
}

/**
 * 显示状态信息
 */
function showStatus(message, type = 'info') {
  const statusBar = document.getElementById('status-bar');
  statusBar.textContent = message;
  statusBar.className = `editor-status-bar status-${type}`;
  statusBar.style.display = 'block';

  if (type === 'success') {
    setTimeout(() => {
      statusBar.style.display = 'none';
    }, 3000);
  }
}

/**
 * 获取当前文件路径（相对于仓库根目录）
 */
function getCurrentFilePath() {
  const pathname = window.location.pathname;

  // GitHub Pages 路径格式：/learning/ai-agent-rag.html
  const match = pathname.match(/^\/learning\/(.+\.html)$/);
  if (match) return match[1];

  // 首页特殊处理
  if (pathname === '/learning/' || pathname === '/learning/index.html') {
    return 'index.html';
  }

  // 本地开发时 pathname 可能是 /ai-agent-rag.html
  const localMatch = pathname.match(/\/([^/]+\.html)$/);
  if (localMatch) return localMatch[1];

  return 'index.html';
}

/**
 * 进入编辑模式
 */
async function enterEditMode() {
  // 检查 Token
  if (!EditorState.githubToken) {
    showStatus('请先设置 GitHub Token', 'error');
    handleTokenClick();
    return;
  }

  try {
    showStatus('正在加载文件...', 'info');

    const filePath = getCurrentFilePath();
    EditorState.currentFilePath = filePath;

    // 从 GitHub 获取文件
    const fileData = await fetchFileFromGitHub(filePath);
    EditorState.currentFileSha = fileData.sha;
    EditorState.originalFileContent = fileData.content;

    // 提取 .ai-section 内容
    const sectionContent = extractSectionContent(fileData.content);
    EditorState.originalSectionContent = sectionContent;

    // 创建编辑器容器
    createEditorContainer();

    // 初始化 Quill
    initQuill(sectionContent);

    // 更新 UI
    EditorState.isEditing = true;
    updateEditUI();
    showStatus('编辑模式已启用', 'success');

  } catch (error) {
    console.error('进入编辑模式失败:', error);
    showStatus(`错误: ${error.message}`, 'error');
  }
}

/**
 * 从 GitHub 获取文件
 */
async function fetchFileFromGitHub(filePath) {
  const url = `${GITHUB_API_BASE}/${filePath}`;
  console.log('正在获取文件:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `token ${EditorState.githubToken}`,
      'Accept': 'application/vnd.github.v3.raw'
    }
  });

  console.log('第一次请求状态:', response.status);

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('github_editor_token');
    EditorState.githubToken = null;
    updateTokenButtonStatus(false);
    throw new Error('Token 无效或已过期，请重新设置');
  }

  if (!response.ok) {
    throw new Error(`GitHub API 错误: ${response.status} ${response.statusText}`);
  }

  // 获取原始内容
  const content = await response.text();

  // 再次调用获取 SHA（用于提交）
  const jsonResponse = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `token ${EditorState.githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  console.log('第二次请求状态:', jsonResponse.status);

  if (jsonResponse.status === 401 || jsonResponse.status === 403) {
    localStorage.removeItem('github_editor_token');
    EditorState.githubToken = null;
    updateTokenButtonStatus(false);
    throw new Error('Token 无效或已过期，请重新设置');
  }

  if (!jsonResponse.ok) {
    throw new Error(`GitHub API 错误: ${jsonResponse.status} ${jsonResponse.statusText}`);
  }

  let jsonData;
  try {
    jsonData = await jsonResponse.json();
  } catch (error) {
    console.error('JSON 解析错误:', error);
    throw new Error(`无法解析 GitHub API 响应: ${error.message}`);
  }

  return {
    sha: jsonData.sha,
    content: content
  };
}

/**
 * 提取 .ai-section 内容
 */
function extractSectionContent(htmlContent) {
  const regex = /<section[^>]*class="[^"]*\bai-section\b[^"]*"[^>]*>([\s\S]*?)<\/section>/;
  const match = htmlContent.match(regex);

  if (!match) {
    throw new Error('无法在文件中找到 .ai-section，可能页面结构不兼容');
  }

  return match[1].trim();
}

/**
 * 创建编辑器容器
 */
function createEditorContainer() {
  // 隐藏原始内容
  EditorState.aiSection.style.display = 'none';

  // 创建编辑器容器
  const container = document.createElement('div');
  container.id = 'editor-container-wrapper';
  container.className = 'editor-container-wrapper';
  container.innerHTML = `
    <div id="editor-container" class="ql-editor-custom"></div>
    <div class="editor-actions">
      <button id="save-btn" class="editor-action-btn editor-action-save">💾 保存</button>
      <button id="cancel-btn" class="editor-action-btn editor-action-cancel">✕ 取消</button>
    </div>
  `;

  EditorState.aiSection.parentNode.insertBefore(container, EditorState.aiSection);

  // 事件监听
  document.getElementById('save-btn').addEventListener('click', saveContent);
  document.getElementById('cancel-btn').addEventListener('click', cancelEdit);
}

/**
 * 初始化 Quill 编辑器
 */
function initQuill(content) {
  const container = document.getElementById('editor-container');

  EditorState.quillInstance = new Quill(container, {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'code'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['blockquote', 'code-block'],
        ['clean']
      ]
    }
  });

  // 设置初始内容
  container.innerHTML = content;

  // 自定义图片上传处理
  const toolbar = EditorState.quillInstance.getModule('toolbar');
  toolbar.addHandler('image', handleImageUpload);
}

/**
 * 处理图片上传
 */
function handleImageUpload() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;

    try {
      showStatus('正在上传图片...', 'info');
      const imageUrl = await uploadImage(file);

      // 在 Quill 中插入图片
      const range = EditorState.quillInstance.getSelection();
      EditorState.quillInstance.insertEmbed(range.index, 'image', imageUrl);

      showStatus('图片上传成功', 'success');
    } catch (error) {
      console.error('图片上传失败:', error);
      showStatus(`图片上传失败: ${error.message}`, 'error');
    }
  };
}

/**
 * 上传图片到 GitHub
 */
async function uploadImage(file) {
  const timestamp = Date.now();
  const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const imagePath = `images/${timestamp}_${fileName}`;

  // 读取文件并转换为 Base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Content = reader.result.split(',')[1]; // 去掉 data:image/... 前缀

        const response = await fetch(`${GITHUB_API_BASE}/${imagePath}`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${EditorState.githubToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Upload image: ${fileName}`,
            content: base64Content
          })
        });

        if (!response.ok) {
          throw new Error(`GitHub API 错误: ${response.status}`);
        }

        // 返回 GitHub Pages 可访问的 URL
        const imageUrl = `${GITHUB_PAGES_BASE}/${imagePath}`;
        resolve(imageUrl);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsDataURL(file);
  });
}

/**
 * 保存内容
 */
async function saveContent() {
  if (!EditorState.isEditing) return;

  try {
    showStatus('正在保存...', 'info');

    // 获取编辑器内容
    const editorContent = document.getElementById('editor-container').innerHTML;
    const cleanedContent = cleanQuillHTML(editorContent);

    // 重建完整 HTML 文件
    const newFileContent = rebuildFullHTML(EditorState.originalFileContent, cleanedContent);

    // 提交到 GitHub
    await commitToGitHub(EditorState.currentFilePath, newFileContent);

    // 退出编辑模式
    exitEditMode(cleanedContent);
    showStatus('保存成功！约 1-2 分钟后 GitHub Pages 将更新', 'success');

  } catch (error) {
    console.error('保存失败:', error);
    showStatus(`保存失败: ${error.message}`, 'error');
  }
}

/**
 * 清理 Quill 输出的 HTML
 */
function cleanQuillHTML(html) {
  return html
    .replace(/ class="ql-[^"]*"/g, '')  // 去掉 ql-* class
    .replace(/<p><br><\/p>/g, '')       // 去掉空段落
    .replace(/\n\s*\n/g, '\n')          // 去掉多余空行
    .trim();
}

/**
 * 重建完整 HTML 文件
 */
function rebuildFullHTML(originalContent, newSectionContent) {
  // 匹配 .ai-section 内容（处理多行）
  const regex = /(<section[^>]*class="[^"]*\bai-section\b[^"]*"[^>]*>)([\s\S]*?)(<\/section>)/;

  if (!regex.test(originalContent)) {
    throw new Error('无法在原始文件中找到 .ai-section');
  }

  return originalContent.replace(regex, `$1\n${newSectionContent}\n$3`);
}

/**
 * 提交到 GitHub
 */
async function commitToGitHub(filePath, fileContent) {
  const url = `${GITHUB_API_BASE}/${filePath}`;

  // Base64 编码文件内容
  const base64Content = btoa(unescape(encodeURIComponent(fileContent)));

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${EditorState.githubToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Update content via online editor: ${filePath}`,
      content: base64Content,
      sha: EditorState.currentFileSha
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `GitHub API 错误: ${response.status}`);
  }
}

/**
 * 取消编辑
 */
function cancelEdit() {
  if (confirm('确认放弃编辑吗？所有更改将丢失。')) {
    exitEditMode(EditorState.originalSectionContent);
    showStatus('已取消编辑', 'info');
  }
}

/**
 * 退出编辑模式
 */
function exitEditMode(sectionContent) {
  // 移除编辑器容器
  const container = document.getElementById('editor-container-wrapper');
  if (container) container.remove();

  // 显示原始内容
  EditorState.aiSection.style.display = 'block';

  // 如果内容有更新，更新原始内容的显示
  if (sectionContent && sectionContent !== EditorState.originalSectionContent) {
    EditorState.aiSection.innerHTML = sectionContent;
  }

  // 重置编辑器状态
  EditorState.isEditing = false;
  EditorState.quillInstance = null;
  updateEditUI();
}

/**
 * 更新编辑 UI
 */
function updateEditUI() {
  const editBtn = document.getElementById('edit-btn');
  if (EditorState.isEditing) {
    editBtn.textContent = '💾 保存';
    editBtn.className = 'editor-btn editor-btn-save';
    EditorState.aiSection.classList.add('editing');
  } else {
    editBtn.textContent = '✏️ 编辑';
    editBtn.className = 'editor-btn editor-btn-edit';
    if (EditorState.aiSection) {
      EditorState.aiSection.classList.remove('editing');
    }
  }
}

/**
 * 页面加载时初始化
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEditorUI);
} else {
  initEditorUI();
}
