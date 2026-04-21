// ==================== 家校联合智慧教育平台 v4.0 - 现代化JavaScript ====================
// 适配新的标签页设计和现代化UI交互
// 版本：v4.0 | 现代化优化版 | 2026年教育信息化示范项目

// ==================== 系统配置 ====================
const SYSTEM_CONFIG = {
    TEACHER_ACCOUNTS: [
        { id: 1, username: 'admin', password: 'admin123', name: '管理员', isAdmin: true },
        { id: 2, username: 'teacher', password: '123456', name: '张老师', isAdmin: false }
    ],
    // 系统颜色主题
    COLORS: {
        primary: '#1e3c72',
        secondary: '#2a5298',
        success: '#4caf50',
        warning: '#ff9800',
        danger: '#f44336'
    }
};

// ==================== 核心数据结构 ====================
let appData = {
    teachers: [],
    classes: [],
    students: [],
    scores: [],
    aiReports: [],
    feedbacks: [],
    performances: [],
    parentAccounts: [],
    subjects: [
        { id: 1, name: '语文', code: 'chinese' },
        { id: 2, name: '数学', code: 'math' },
        { id: 3, name: '英语', code: 'english' },
        { id: 4, name: '科学', code: 'science' },
        { id: 5, name: '社会', code: 'social' }
    ],
    examTypes: ['单元测验', '期中考试', '期末考试', '模拟考试', '日常练习']
};

let currentUser = null;
let currentRole = 'teacher'; // teacher, parent, admin

// ==================== 系统初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 家校联合智慧教育平台 v4.0 启动中...');
    initializeNewApp();
});

function initializeNewApp() {
    loadAppData();
    initializeLoginInterface();
    addDemoTestData();
}

// ==================== 现代化登录界面交互 ====================
function initializeLoginInterface() {
    // 标签页切换功能
    const loginTabs = document.querySelectorAll('.login-tab');
    const loginForms = document.querySelectorAll('.login-form');
    
    loginTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (targetId) {
                switchTab(targetId);
            }
        });
    });
    
    // 表单提交事件
    document.querySelectorAll('.login-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(this.id);
        });
    });
}

// 标签页切换函数
function switchTab(tabId) {
    // 更新活跃标签页
    document.querySelectorAll('.login-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.login-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // 根据点击的标签页设置对应的表单为活跃状态
    const activeTab = document.querySelector(`.login-tab[onclick*="'${tabId}'"]`);
    const activeForm = document.getElementById(tabId);
    
    if (activeTab && activeForm) {
        activeTab.classList.add('active');
        activeForm.classList.add('active');
    }
}

// 家长端功能
function showStudentProgress() {
    const parentPanel = document.getElementById('parentPanel');
    if (parentPanel) {
        parentPanel.innerHTML = `
            <div class="progress-detail-page">
                <button class="back-btn" onclick="loadParentTabContent()">
                    <span class="material-icons">arrow_back</span> 返回主页
                </button>
                
                <h2><span class="material-icons">trending_up</span> 详细学习进度</h2>
                
                <!-- 详细成绩分析 -->
                <div class="detailed-analysis">
                    <div class="analysis-chart">
                        <h3>各科成绩趋势</h3>
                        <div class="chart-container">
                            <div style="height: 300px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                                <div style="text-align: center;">
                                    <span class="material-icons" style="font-size: 4em; margin-bottom: 10px;">assessment</span>
                                    <p>成绩趋势图表</p>
                                    <small>数学: ↗ 92分 | 语文: ↗ 88分 | 英语: → 85分</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="subject-breakdown">
                        <h3>各科详细分析</h3>
                        <div class="subject-list">
                            <div class="subject-item">
                                <h4>数学</h4>
                                <p>掌握度: 优秀</p>
                                <p>薄弱知识点: 立体几何</p>
                                <div class="suggestions">建议加强空间想象能力训练</div>
                            </div>
                            <div class="subject-item">
                                <h4>语文</h4>
                                <p>掌握度: 良好</p>
                                <p>薄弱知识点: 作文表达</p>
                                <div class="suggestions">建议多阅读范文，积累好词好句</div>
                            </div>
                            <div class="subject-item">
                                <h4>英语</h4>
                                <p>掌握度: 良好</p>
                                <p>薄弱知识点: 听力理解</p>
                                <div class="suggestions">建议每天听英语对话，提高语感</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function showAttendanceRecords() {
    const parentPanel = document.getElementById('parentPanel');
    if (parentPanel) {
        parentPanel.innerHTML = `
            <div class="attendance-detail-page">
                <button class="back-btn" onclick="loadParentTabContent()">
                    <span class="material-icons">arrow_back</span> 返回主页
                </button>
                
                <h2><span class="material-icons">calendar_today</span> 考勤记录</h2>
                
                <!-- 月度统计 -->
                <div class="monthly-summary">
                    <h3>本月统计</h3>
                    <div class="attendance-stats">
                        <div class="stat-item present">
                            <span class="count">18</span>
                            <span class="label">到校</span>
                        </div>
                        <div class="stat-item absent">
                            <span class="count">1</span>
                            <span class="label">缺席</span>
                        </div>
                        <div class="stat-item late">
                            <span class="count">2</span>
                            <span class="label">迟到</span>
                        </div>
                    </div>
                </div>
                
                <!-- 详细记录 -->
                <div class="attendance-records">
                    <h3>详细记录</h3>
                    <table class="attendance-table">
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>状态</th>
                                <th>备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-04-15</td>
                                <td><span class="status present">到校</span></td>
                                <td>正常</td>
                            </tr>
                            <tr>
                                <td>2025-04-14</td>
                                <td><span class="status late">迟到</span></td>
                                <td>交通堵塞</td>
                            </tr>
                            <tr>
                                <td>2025-04-10</td>
                                <td><span class="status absent">请假</span></td>
                                <td>感冒生病</td>
                            </tr>
                            <tr>
                                <td>2025-04-08</td>
                                <td><span class="status present">到校</span></td>
                                <td>正常</td>
                            </tr>
                            <tr>
                                <td>2025-04-07</td>
                                <td><span class="status present">到校</span></td>
                                <td>正常</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

function initHomeworkUpload() {
    // 创建作业上传模态框
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><span class="material-icons">file_upload</span> 作业上传</h3>
                <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="modal-body">
                <!-- 上传区 -->
                <div class="homework-upload-section">
                    <div class="upload-area" onclick="document.getElementById('homeworkFile').click()">
                        <span class="material-icons">cloud_upload</span>
                        <h4>点击上传作业图片</h4>
                        <p>支持 JPG、PNG、PDF 格式</p>
                        <span class="upload-hint">最大文件大小：5MB</span>
                    </div>
                    <input type="file" id="homeworkFile" accept="image/*,.pdf" style="display: none" 
                           onchange="handleFileSelect(event)">
                </div>

                <!-- AI分析区 -->
                <div class="ai-analysis-section">
                    <h4>🤖 AI 智能分析</h4>
                    <div class="analysis-summary">
                        <div class="summary-card correct">
                            <span class="material-icons">check_circle</span>
                            <h5>正确题数</h5>
                            <span class="correct-count">0</span>
                        </div>
                        <div class="summary-card wrong">
                            <span class="material-icons">cancel</span>
                            <h5>错题数</h5>
                            <span class="wrong-count">0</span>
                        </div>
                        <div class="summary-card accuracy">
                            <span class="material-icons">trending_up</span>
                            <h5>正确率</h5>
                            <span class="accuracy">0%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">取消</button>
                <button class="btn btn-primary" onclick="submitHomework()">提交作业</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function showCommunicationBoard() {
    const parentPanel = document.getElementById('parentPanel');
    if (parentPanel) {
        parentPanel.innerHTML = `
            <div class="communication-page">
                <button class="back-btn" onclick="loadParentTabContent()">
                    <span class="material-icons">arrow_back</span> 返回主页
                </button>
                
                <h2><span class="material-icons">chat</span> 家校沟通</h2>
                
                <!-- 聊天界面 -->
                <div class="chat-container">
                    <div class="chat-header">
                        <div class="teacher-info">
                            <span class="material-icons">person</span>
                            <div>
                                <h4>张老师</h4>
                                <p>三年级一班班主任</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-messages">
                        <div class="message teacher">
                            <div class="message-content">
                                <p>李某明家长您好，孩子最近数学进步很大</p>
                                <span class="time">今天 10:30</span>
                            </div>
                        </div>
                        
                        <div class="message parent">
                            <div class="message-content">
                                <p>谢谢老师鼓励，我们会继续配合学校工作</p>
                                <span class="time">今天 10:35</span>
                            </div>
                        </div>
                        
                        <div class="message teacher">
                            <div class="message-content">
                                <p>本周作业已布置，请督促孩子按时完成</p>
                                <span class="time">今天 10:40</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-input">
                        <input type="text" placeholder="请输入消息..." id="messageInput">
                        <button onclick="sendMessage()" class="send-btn">
                            <span class="material-icons">send</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// 作业相关函数
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        // 模拟文件分析
        setTimeout(() => {
            simulateAIAnalysis();
            showToast('文件上传成功，AI分析中...', 'success');
        }, 1500);
    }
}

function simulateAIAnalysis() {
    // 生成随机分析结果
    const correct = Math.floor(Math.random() * 10) + 5;
    const wrong = Math.floor(Math.random() * 5) + 1;
    const accuracy = Math.round((correct / (correct + wrong)) * 100);
    
    // 更新分析结果
    setTimeout(() => {
        const summaryCards = document.querySelectorAll('.analysis-summary .summary-card');
        if (summaryCards[0]) {
            summaryCards[0].querySelector('.correct-count').textContent = correct;
            summaryCards[1].querySelector('.wrong-count').textContent = wrong;
            summaryCards[2].querySelector('.accuracy').textContent = accuracy + '%';
        }
    }, 2000);
}

function submitHomework() {
    // 记录提交历史
    const submission = {
        date: new Date().toLocaleString('zh-CN'),
        subject: '数学',
        status: '已提交',
        correct: Math.floor(Math.random() * 10) + 5,
        wrong: Math.floor(Math.random() * 5) + 1
    };
    
    showToast('作业提交成功！AI分析将在后台运行', 'success');
    
    // 关闭模态框
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    if (input && input.value.trim()) {
        console.log('发送消息:', input.value);
        input.value = '';
        showToast('消息发送成功', 'success');
    }
}

// 教师登录函数
function loginTeacher() {
    handleLogin('teacher-login');
}

// 家长登录函数
function loginParent() {
    handleLogin('parent-login');
}

// 管理员登录函数
function loginAdmin() {
    handleLogin('admin-login');
}

// 统一登录处理函数
function handleLogin(formId) {
    let usernameInput, passwordInput, usernameField, passwordField;
    
    // 根据表单类型获取对应的输入框
    if (formId === 'teacher-login') {
        usernameInput = document.getElementById('teacherUsername');
        passwordInput = document.getElementById('teacherPassword');
        usernameField = 'username';
        passwordField = 'password';
    } else if (formId === 'parent-login') {
        usernameInput = document.getElementById('parentUsername');
        passwordInput = document.getElementById('parentPassword');
        usernameField = 'phone';
        passwordField = 'password';
    } else if (formId === 'admin-login') {
        usernameInput = document.getElementById('adminUsername');
        passwordInput = document.getElementById('adminPassword');
        usernameField = 'username';
        passwordField = 'password';
    }
    
    if (!usernameInput || !passwordInput) {
        console.error('找不到登录表单元素');
        showToast('登录表单错误，请刷新页面');
        return;
    }
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    if (!username || !password) {
        showToast('请输入用户名和密码');
        return;
    }
    
    // 验证登录信息
    if (formId === 'teacher-login' || formId === 'admin-login') {
        const account = SYSTEM_CONFIG.TEACHER_ACCOUNTS.find(acc => 
            acc.username === username && acc.password === password
        );
        
        if (account) {
            currentUser = account;
            currentRole = account.isAdmin ? 'admin' : 'teacher';
            showMainApp();
            showToast(`欢迎您，${account.name}！`);
        } else {
            showToast('账号或密码错误');
        }
    } else if (formId === 'parent-login') {
        // 家长登录逻辑
        const parentAccount = appData.parentAccounts.find(acc => 
            acc.phone === username && acc.password === password
        );
        
        if (parentAccount) {
            currentUser = parentAccount;
            currentRole = 'parent';
            showMainApp();
            showToast(`欢迎您，${parentAccount.name}！`);
        } else {
            showToast('手机号或密码错误，请确认后重试');
        }
    }
}

// 显示主应用界面
function showMainApp() {
    const loginPage = document.getElementById('loginPage');
    const appContainer = document.getElementById('appContainer');
    
    if (loginPage && appContainer) {
        loginPage.style.display = 'none';
        appContainer.classList.remove('hidden');
        updateUserInterface();
    }
}

// 更新用户界面
function updateUserInterface() {
    const userNameElement = document.getElementById('currentUserName');
    if (userNameElement && currentUser) {
        userNameElement.textContent = `欢迎您，${currentUser.name}！`;
    }
    
    // 根据用户角色显示对应的面板
    document.querySelectorAll('.main-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    const activePanel = document.getElementById(`${currentRole}Panel`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    // 更新角色切换按钮状态
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.role-btn[onclick*="'${currentRole}'"`).classList.add('active');
}

// 退出登录
function logout() {
    currentUser = null;
    currentRole = 'teacher';
    const loginPage = document.getElementById('loginPage');
    const appContainer = document.getElementById('appContainer');
    
    if (loginPage && appContainer) {
        appContainer.classList.add('hidden');
        loginPage.style.display = 'flex';
    }
    
    showToast('您已安全退出');
}

// ==================== 增加演示数据 ====================
function addDemoTestData() {
    if (appData.parentAccounts.length === 0) {
        appData.parentAccounts = [
            { id: 1, phone: '13800138001', password: '123456', name: '李小明家长', studentId: 'S001' },
            { id: 2, phone: '13800138002', password: '123456', name: '张小红家长', studentId: 'S002' }
        ];
    }
    
    if (appData.students.length === 0) {
        appData.students = [
            { id: 1, studentId: 'S001', name: '李小明', grade: '三年级', class: '一班', parentContact: '13800138001' },
            { id: 2, studentId: 'S002', name: '张小红', grade: '三年级', class: '一班', parentContact: '13800138002' }
        ];
    }
    
    saveAppData();
}

// ==================== 测试登录按钮（仅在开发环境） ====================
function addTestLoginButtons() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const loginPage = document.getElementById('loginPage');
        if (loginPage) {
            const testButtons = document.createElement('div');
            testButtons.className = 'test-buttons';
            testButtons.innerHTML = `
                <div style="margin-top: 20px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 20px;">
                    <p style="color: #666; margin-bottom: 10px;">快速测试账号：</p>
                    <button onclick="document.getElementById('teacherUsername').value='admin'; document.getElementById('teacherPassword').value='admin123'; loginTeacher();" 
                            class="btn btn-sm" style="margin: 5px;">试用管理员</button>
                    <button onclick="document.getElementById('teacherUsername').value='teacher'; document.getElementById('teacherPassword').value='123456'; loginTeacher();" 
                            class="btn btn-sm" style="margin: 5px;">试用教师</button>
                </div>
            `;
            loginPage.querySelector('.login-container').appendChild(testButtons);
        }
    }
}

// ==================== 缺失的关键函数 ====================

// 显示提示消息
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastIcon && toastMessage) {
        // 设置图标和颜色
        if (type === 'success') {
            toastIcon.textContent = 'check_circle';
            toast.style.backgroundColor = '#4caf50';
        } else if (type === 'error') {
            toastIcon.textContent = 'error';
            toast.style.backgroundColor = '#f44336';
        } else if (type === 'warning') {
            toastIcon.textContent = 'warning';
            toast.style.backgroundColor = '#ff9800';
        }
        
        toastMessage.textContent = message;
        toast.style.display = 'flex';
        
        // 3秒后自动隐藏
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
}

// 显示标签页内容
function showTab(tabId) {
    console.log('切换到标签页:', tabId);
    
    // 获取当前活动面板
    const activePanel = document.querySelector('.main-panel.active');
    if (!activePanel) return;
    
    // 在当前活动面板内隐藏所有标签页内容
    activePanel.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 在当前活动面板内移除所有标签页按钮的活跃状态
    activePanel.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 显示选中的标签页
    let activeTab = activePanel.querySelector(`#tab-${tabId}`);
    if (!activeTab) {
        // 如果没有前缀的id，尝试精确匹配
        activeTab = activePanel.querySelector(`#${tabId}`);
    }
    
    // 查找对应的按钮
    let activeBtn = activePanel.querySelector(`.tab-btn[onclick*="'${tabId}'"], .tab-btn[onclick*="\"${tabId}\""]`);
    
    if (activeTab) {
        activeTab.classList.add('active');
        console.log('✅ 标签页内容已激活:', tabId);
    } else {
        console.error('❌ 找不到对应的标签页:', tabId);
    }
    
    if (activeBtn) {
        activeBtn.classList.add('active');
        console.log('✅ 标签页按钮已激活:', tabId);
    } else {
        console.error('❌ 找不到对应的标签页按钮:', tabId);
    }
}

// 切换角色
function switchRole(role) {
    const previousRole = currentRole;
    currentRole = role;
    
    // 更新角色按钮状态
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.role-btn[onclick*="'${role}'"]`).classList.add('active');
    
    // 更新面板显示
    document.querySelectorAll('.main-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    const activePanel = document.getElementById(`${role}Panel`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    // 如果切换的是管理员面板，需要重新初始化管理员界面
    if (role === 'admin' && previousRole !== 'admin') {
        initAdminPanel();
    }
}

// 数据存储和加载函数
function saveAppData() {
    try {
        localStorage.setItem('appData', JSON.stringify(appData));
    } catch (error) {
        console.error('保存数据失败:', error);
    }
}

function loadAppData() {
    try {
        const savedData = localStorage.getItem('appData');
        if (savedData) {
            appData = { ...appData, ...JSON.parse(savedData) };
        }
    } catch (error) {
        console.error('加载数据失败:', error);
    }
}

// 初始化管理员面板（如果需要）
function initAdminPanel() {
    // 这里可以添加管理员面板的初始化逻辑
}

// ==================== 简单的学生管理函数 ====================

function addStudent() {
    const name = prompt('请输入学生姓名:');
    if (name && name.trim()) {
        const newStudent = {
            id: Date.now(),
            studentId: 'S' + (appData.students.length + 1).toString().padStart(3, '0'),
            name: name.trim(),
            grade: '三年级',
            class: '一班',
            parentContact: ''
        };
        
        appData.students.push(newStudent);
        saveAppData();
        showToast(`学生 ${name} 添加成功`);
        
        // 刷新学生列表显示
        renderStudentList();
    }
}

function renderStudentList() {
    const studentsTable = document.getElementById('studentsData');
    if (studentsTable) {
        let html = '';
        appData.students.forEach(student => {
            html += `
                <tr>
                    <td>${student.studentId}</td>
                    <td>${student.name}</td>
                    <td>${student.grade}</td>
                    <td>${student.class}</td>
                    <td>${student.parentContact || '未设置'}</td>
                    <td>
                        <button class="btn btn-sm" onclick="editStudent('${student.id}')">编辑</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.id}')">删除</button>
                    </td>
                </tr>
            `;
        });
        studentsTable.innerHTML = html;
    }
}

function editStudent(studentId) {
    const student = appData.students.find(s => s.id === studentId);
    if (student) {
        const newName = prompt('请输入学生姓名:', student.name);
        if (newName && newName.trim()) {
            student.name = newName.trim();
            saveAppData();
            showToast('学生信息更新成功');
            renderStudentList();
        }
    }
}

function deleteStudent(studentId) {
    if (confirm('确定要删除这个学生吗？相关的成绩数据也将被删除。')) {
        appData.students = appData.students.filter(s => s.id !== studentId);
        // 同时删除相关的成绩数据
        appData.scores = appData.scores.filter(s => s.studentId !== studentId);
        saveAppData();
        showToast('学生信息已删除');
        renderStudentList();
    }
}

// 页面加载完成后初始化学生列表
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(renderStudentList, 100);
});

// ==================== 考勤管理功能 ====================

// 考勤类型定义
const ATTENDANCE_TYPES = {
    PRESENT: { code: 'present', label: '到校', color: '#4caf50' },
    ABSENT: { code: 'absent', label: '请假', color: '#ff9800' },
    LATE: { code: 'late', label: '迟到', color: '#ff5722' },
    ABSENT_CLASS: { code: 'absent_class', label: '缺课', color: '#f44336' }
};

// 加载考勤数据
function loadAttendanceData(classId) {
    const today = new Date().toISOString().split('T')[0];
    let attendanceRecords = appData.attendance || [];
    
    // 如果没有今天的记录，创建默认记录
    const todayRecords = attendanceRecords.filter(record => 
        record.date === today && record.classId === classId
    );
    
    if (todayRecords.length === 0) {
        // 为班级的每个学生创建默认考勤记录
        const classStudents = appData.students.filter(s => s.class === classId);
        classStudents.forEach(student => {
            attendanceRecords.push({
                date: today,
                classId: classId,
                studentId: student.studentId,
                status: 'present',
                remark: '',
                recordedAt: new Date().toLocaleTimeString('zh-CN', { hour12: false })
            });
        });
        
        appData.attendance = attendanceRecords;
        saveAppData();
    }
    
    // 更新统计数据
    updateAttendanceStats(today, classId);
    
    return attendanceRecords.filter(record => record.date === today && record.classId === classId);
}

// 录入今日考勤
function recordTodayAttendance() {
    const dateInput = document.getElementById('attendanceDate');
    const classSelect = document.getElementById('attendanceClass');
    
    const date = dateInput ? dateInput.value || new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const classId = classSelect ? classSelect.value : '三年级一班';
    
    if (!classId || classId === '') {
        showToast('请选择班级', 'error');
        return;
    }
    
    // 显示考勤录入界面
    loadClassStudents(classId, date);
}

// 加载班级学生列表（匹配HTML结构）
function loadClassStudents(classId, date) {
    const students = appData.students.filter(s => s.class === classId);
    let attendanceRecords = appData.attendance || [];
    
    // 获取指定日期的考勤记录
    const dateRecords = attendanceRecords.filter(record => 
        record.date === date && record.classId === classId
    );
    
    // 显示今日考勤录入区域
    const todaySection = document.getElementById('todayAttendanceSection');
    if (todaySection) {
        todaySection.style.display = 'block';
    }
    
    // 生成学生考勤表格HTML（匹配现有结构）
    let tableBody = '';
    
    students.forEach(student => {
        const record = dateRecords.find(r => r.studentId === student.studentId);
        const status = record ? record.status : 'present';
        const remark = record ? record.remark : '';
        
        tableBody += `
            <tr>
                <td>${student.studentId}</td>
                <td>${student.name}</td>
                <td>
                    <select class="attendance-status" data-student-id="${student.studentId}" data-date="${date}" data-class="${classId}">
                        <option value="present" ${status === 'present' ? 'selected' : ''}>到校</option>
                        <option value="absent" ${status === 'absent' ? 'selected' : ''}>请假</option>
                        <option value="late" ${status === 'late' ? 'selected' : ''}>迟到</option>
                        <option value="absent_class" ${status === 'absent_class' ? 'selected' : ''}>缺课</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="attendance-remark" 
                           value="${remark}" 
                           placeholder="备注信息"
                           data-student-id="${student.studentId}" 
                           data-date="${date}" 
                           data-class="${classId}">
                </td>
                <td style="display: none;">
                    <button class="btn btn-sm">保存</button>
                </td>
            </tr>
        `;
    });
    
    // 显示表格
    const tableContainer = document.getElementById('attendanceTableContainer');
    const tableBodyElement = document.getElementById('attendanceTableBody');
    
    if (tableContainer && tableBodyElement) {
        tableContainer.style.display = 'block';
        tableBodyElement.innerHTML = tableBody;
    }
    
    // 添加事件监听
    addAttendanceEventListeners(date, classId);
    
    // 更新统计
    updateAttendanceStats(date, classId);
}

// 添加考勤事件监听
function addAttendanceEventListeners(date, classId) {
    // 状态更改事件
    document.querySelectorAll('.attendance-status').forEach(select => {
        select.addEventListener('change', function() {
            const studentId = this.getAttribute('data-student-id');
            const status = this.value;
            
            saveAttendanceRecord(studentId, date, classId, status, '');
            updateAttendanceStats(date, classId);
        });
    });
    
    // 备注更改事件
    document.querySelectorAll('.attendance-remark').forEach(input => {
        input.addEventListener('input', function() {
            const studentId = this.getAttribute('data-student-id');
            const statusSelect = document.querySelector(`.attendance-status[data-student-id="${studentId}"]`);
            const remark = this.value;
            
            if (statusSelect) {
                saveAttendanceRecord(studentId, date, classId, statusSelect.value, remark);
            }
        });
    });
}

// 保存考勤记录
function saveAttendanceRecord(studentId, date, classId, status, remark) {
    let attendanceRecords = appData.attendance || [];
    
    // 查找现有记录
    const existingIndex = attendanceRecords.findIndex(record => 
        record.studentId === studentId && 
        record.date === date && 
        record.classId === classId
    );
    
    const record = {
        studentId: studentId,
        date: date,
        classId: classId,
        status: status,
        remark: remark,
        recordedAt: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
        recordedBy: currentUser ? currentUser.name : '系统'
    };
    
    if (existingIndex >= 0) {
        attendanceRecords[existingIndex] = record;
    } else {
        attendanceRecords.push(record);
    }
    
    appData.attendance = attendanceRecords;
    saveAppData();
    
    showToast(`${studentId} 考勤记录已保存`, 'success');
}

// 更新考勤统计
function updateAttendanceStats(date, classId) {
    const attendanceRecords = appData.attendance || [];
    const dateRecords = attendanceRecords.filter(record => 
        record.date === date && record.classId === classId
    );
    
    const stats = {
        present: dateRecords.filter(r => r.status === 'present').length,
        absent: dateRecords.filter(r => r.status === 'absent').length,
        late: dateRecords.filter(r => r.status === 'late').length,
        absent_class: dateRecords.filter(r => r.status === 'absent_class').length
    };
    
    const totalStudents = appData.students.filter(s => s.class === classId).length;
    const presentRate = totalStudents > 0 ? Math.round((stats.present / totalStudents) * 100) : 0;
    
    // 更新概览统计
    const presentRateElement = document.getElementById('presentRate');
    const absentCountElement = document.getElementById('absentCount');
    const lateCountElement = document.getElementById('lateCount');
    const leaveCountElement = document.getElementById('leaveCount');
    
    if (presentRateElement) presentRateElement.textContent = presentRate + '%';
    if (absentCountElement) absentCountElement.textContent = stats.absent_class;
    if (lateCountElement) lateCountElement.textContent = stats.late;
    if (leaveCountElement) leaveCountElement.textContent = stats.absent;
}

// 更新考勤概览统计数据
function updateAttendanceOverview() {
    const dateInput = document.getElementById('attendanceDate');
    const classSelect = document.getElementById('attendanceClass');
    
    const date = dateInput ? dateInput.value || new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const classId = classSelect ? classSelect.value : '三年级一班';
    
    if (classId && classId !== '') {
        const attendanceRecords = appData.attendance || [];
        const dateRecords = attendanceRecords.filter(record => 
            record.date === date && record.classId === classId
        );
        
        const stats = {
            present: dateRecords.filter(r => r.status === 'present').length,
            absent: dateRecords.filter(r => r.status === 'absent').length,
            late: dateRecords.filter(r => r.status === 'late').length,
            absent_class: dateRecords.filter(r => r.status === 'absent_class').length
        };
        
        const totalStudents = appData.students.filter(s => s.class === classId).length;
        const presentRate = totalStudents > 0 ? Math.round((stats.present / totalStudents) * 100) : 0;
        
        // 更新概览统计
        const presentRateElement = document.getElementById('presentRate');
        const absentCountElement = document.getElementById('absentCount');
        const lateCountElement = document.getElementById('lateCount');
        const leaveCountElement = document.getElementById('leaveCount');
        
        if (presentRateElement) presentRateElement.textContent = presentRate + '%';
        if (absentCountElement) absentCountElement.textContent = stats.absent_class;
        if (lateCountElement) lateCountElement.textContent = stats.late;
        if (leaveCountElement) leaveCountElement.textContent = stats.absent;
    }
}

// 提交考勤
function submitAttendance() {
    const dateInput = document.getElementById('attendanceDate');
    const classSelect = document.getElementById('attendanceClass');
    
    const date = dateInput ? dateInput.value || new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const classId = classSelect ? classSelect.value : '三年级一班';
    
    if (!classId || classId === '') {
        showToast('请选择班级', 'error');
        return;
    }
    
    const students = appData.students.filter(s => s.class === classId);
    let allSaved = true;
    
    students.forEach(student => {
        const statusSelect = document.querySelector(`.attendance-status[data-student-id="${student.studentId}"]`);
        const remarkInput = document.querySelector(`.attendance-remark[data-student-id="${student.studentId}"]`);
        
        if (!statusSelect) {
            allSaved = false;
            return;
        }
        
        saveAttendanceRecord(
            student.studentId,
            date,
            classId,
            statusSelect.value,
            remarkInput ? remarkInput.value : ''
        );
    });
    
    if (allSaved) {
        showToast(`考勤记录已提交 - ${date} ${classId}`, 'success');
        
        // 隐藏录入表格，显示统计概览
        const tableContainer = document.getElementById('attendanceTableContainer');
        const todaySection = document.getElementById('todayAttendanceSection');
        
        if (tableContainer) tableContainer.style.display = 'none';
        if (todaySection) todaySection.style.display = 'none';
        
        // 更新统计数据
        updateAttendanceOverview();
    }
}

// 加载默认考勤视图
function loadDefaultAttendanceView() {
    // 这里可以加载考勤统计概览页面
    showTab('attendance');
}

// ==================== 家长端作业提交功能 ====================

// 初始化家长作业提交界面
function initParentHomeworkSubmission() {
    const homeworkTab = document.getElementById('tab-parent-homework');
    if (homeworkTab) {
        homeworkTab.innerHTML = `
            <div class="homework-submission-section">
                <h3>作业提交</h3>
                
                <!-- 作业列表 -->
                <div class="homework-list">
                    <div class="homework-item">
                        <div class="homework-info">
                            <h4>数学作业：小数加减法</h4>
                            <p>布置时间：2025-04-18 09:00</p>
                            <p>截止时间：2025-04-20 18:00</p>
                            <p class="assignment-desc">完成教材第35-36页练习题</p>
                        </div>
                        <div class="homework-status">
                            <span class="status-badge pending">待提交</span>
                            <button class="btn btn-primary" onclick="showHomeworkUploadForm('MATH001')">
                                <span class="material-icons">upload</span> 提交作业
                            </button>
                        </div>
                    </div>
                    
                    <div class="homework-item completed">
                        <div class="homework-info">
                            <h4>语文作业：古诗背诵</h4>
                            <p>布置时间：2025-04-17 14:30</p>
                            <p>提交时间：2025-04-18 19:15</p>
                            <p class="assignment-desc">背诵《静夜思》、《春晓》</p>
                        </div>
                        <div class="homework-status">
                            <span class="status-badge submitted">已提交</span>
                            <span class="submission-time">04-18 19:15</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// 显示作业上传表单
function showHomeworkUploadForm(homeworkId) {
    // 创建作业上传模态框
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><span class="material-icons">file_upload</span> 作业上传</h3>
                <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="homework-upload-section">
                    <div class="upload-area" onclick="document.getElementById('homeworkFile').click()">
                        <span class="material-icons">cloud_upload</span>
                        <h4>点击上传作业图片</h4>
                        <p>支持 JPG、PNG、PDF 格式</p>
                        <span class="upload-hint">最大文件大小：5MB</span>
                    </div>
                    <input type="file" id="homeworkFile" accept="image/*,.pdf" style="display: none" 
                           onchange="handleHomeworkFileSelect(event, '${homeworkId}')">
                </div>

                <div class="ai-analysis-section">
                    <h4>🤖 AI 智能分析</h4>
                    <div class="analysis-summary">
                        <div class="summary-card correct">
                            <span class="material-icons">check_circle</span>
                            <h5>正确题数</h5>
                            <span class="correct-count">0</span>
                        </div>
                        <div class="summary-card wrong">
                            <span class="material-icons">cancel</span>
                            <h5>错题数</h5>
                            <span class="wrong-count">0</span>
                        </div>
                        <div class="summary-card accuracy">
                            <span class="material-icons">trending_up</span>
                            <h5>正确率</h5>
                            <span class="accuracy">0%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">取消</button>
                <button class="btn btn-primary" onclick="submitHomework('${homeworkId}')">提交作业</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 处理作业文件选择
function handleHomeworkFileSelect(event, homeworkId) {
    const file = event.target.files[0];
    if (file) {
        // 模拟文件分析
        setTimeout(() => {
            simulateHomeworkAnalysis(homeworkId);
            showToast('文件上传成功，AI分析中...', 'success');
        }, 1500);
    }
}

// 模拟作业AI分析
function simulateHomeworkAnalysis(homeworkId) {
    // 生成随机分析结果
    const correct = Math.floor(Math.random() * 10) + 5;
    const wrong = Math.floor(Math.random() * 5) + 1;
    const accuracy = Math.round((correct / (correct + wrong)) * 100);
    
    // 更新分析结果
    setTimeout(() => {
        const summaryCards = document.querySelectorAll('.analysis-summary .summary-card');
        if (summaryCards[0]) {
            summaryCards[0].querySelector('.correct-count').textContent = correct;
            summaryCards[1].querySelector('.wrong-count').textContent = wrong;
            summaryCards[2].querySelector('.accuracy').textContent = accuracy + '%';
        }
    }, 2000);
}

// 提交作业
function submitHomework(homeworkId) {
    // 记录提交历史
    const submission = {
        homeworkId: homeworkId,
        date: new Date().toLocaleString('zh-CN'),
        studentId: currentUser ? currentUser.studentId : 'S001',
        status: '已提交',
        correct: Math.floor(Math.random() * 10) + 5,
        wrong: Math.floor(Math.random() * 5) + 1
    };
    
    // 保存到应用数据
    if (!appData.homeworkSubmissions) {
        appData.homeworkSubmissions = [];
    }
    appData.homeworkSubmissions.push(submission);
    saveAppData();
    
    showToast('作业提交成功！AI分析将在后台运行', 'success');
    
    // 关闭模态框并刷新界面
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
    
    // 刷新作业列表显示
    setTimeout(() => {
        initParentHomeworkSubmission();
    }, 1000);
}

// ==================== 初始化函数 ====================

// 在主应用显示时初始化相关功能
document.addEventListener('DOMContentLoaded', function() {
    // 页面加载时先检查是否有演示数据
    if (!appData.students || appData.students.length === 0) {
        addDemoTestData();
    }
    
    // 初始化考勤数据
    addAttendanceDemoData();
    
    // 监听面板切换
    document.querySelectorAll('.main-panel').forEach(panel => {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.classList.contains('active')) {
                    const panelId = mutation.target.id;
                    
                    if (panelId === 'teacherPanel') {
                        // 教师面板激活时 - 重置考勤界面到概览状态
                        setTimeout(() => {
                            const todaySection = document.getElementById('todayAttendanceSection');
                            const tableContainer = document.getElementById('attendanceTableContainer');
                            if (todaySection) todaySection.style.display = 'none';
                            if (tableContainer) tableContainer.style.display = 'none';
                            
                            // 初始化日期选择器为今天
                            const dateInput = document.getElementById('attendanceDate');
                            if (dateInput && !dateInput.value) {
                                dateInput.value = new Date().toISOString().split('T')[0];
                            }
                            
                            // 更新考勤概览
                            updateAttendanceOverview();
                        }, 100);
                    } else if (panelId === 'parentPanel') {
                        // 家长面板激活时初始化作业提交功能
                        setTimeout(() => {
                            // 检查是否有作业标签页并初始化
                            const homeworkTab = document.querySelector('[onclick*="homework"]');
                            if (homeworkTab) {
                                initParentHomeworkSubmission();
                            }
                        }, 100);
                    }
                }
            });
        });
        
        observer.observe(panel, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
});

// ==================== 补充演示数据 ====================

function addAttendanceDemoData() {
    // 只有在没有考勤数据的情况下才添加演示数据
    if (!appData.attendance || appData.attendance.length === 0) {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        appData.attendance = [
            {
                date: today,
                classId: '一班',
                studentId: 'S001',
                status: 'present',
                remark: '正常到校',
                recordedAt: '08:15',
                recordedBy: '张老师'
            },
            {
                date: today,
                classId: '一班',
                studentId: 'S002',
                status: 'late',
                remark: '迟到5分钟',
                recordedAt: '08:40',
                recordedBy: '张老师'
            },
            {
                date: yesterday,
                classId: '一班',
                studentId: 'S001',
                status: 'present',
                remark: '',
                recordedAt: '08:10',
                recordedBy: '张老师'
            }
        ];
        saveAppData();
    }
}

// 重写renderAttendance页面函数以支持新的考勤功能
function renderAttendanceView() {
    const attendanceContent = document.getElementById('tab-attendance');
    if (!attendanceContent) return;
    
    attendanceContent.innerHTML = `
        <div class="attendance-management">
            <div class="attendance-controls">
                <div class="date-selector">
                    <label for="attendanceDate">日期：</label>
                    <input type="date" id="attendanceDate" value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="class-selector">
                    <label for="attendanceClass">班级：</label>
                    <select id="attendanceClass">
                        <option value="一班">三年级一班</option>
                        <option value="二班">三年级二班</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="recordTodayAttendance()">
                    <span class="material-icons">edit</span> 录入今日考勤
                </button>
            </div>
            
            <div class="attendance-stats">
                <h3>今日考勤概览</h3>
                <div class="stats-grid">
                    <div class="stat-card present">
                        <span class="material-icons">check_circle</span>
                        <div class="stat-info">
                            <span class="count">${appData.attendance ? appData.attendance.filter(a => a.status === 'present' && a.date === new Date().toISOString().split('T')[0]).length : 0}</span>
                            <span class="label">到校</span>
                        </div>
                    </div>
                    <div class="stat-card absent">
                        <span class="material-icons">event_busy</span>
                        <div class="stat-info">
                            <span class="count">${appData.attendance ? appData.attendance.filter(a => a.status === 'absent' && a.date === new Date().toISOString().split('T')[0]).length : 0}</span>
                            <span class="label">请假</span>
                        </div>
                    </div>
                    <div class="stat-card late">
                        <span class="material-icons">schedule</span>
                        <div class="stat-info">
                            <span class="count">${appData.attendance ? appData.attendance.filter(a => a.status === 'late' && a.date === new Date().toISOString().split('T')[0]).length : 0}</span>
                            <span class="label">迟到</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 初始化测试按钮
addTestLoginButtons();