// ==================== 数据层封装 - 使用 GitHub Issues API ====================
// 配置信息
const GITHUB_CONFIG = {
    owner: 'CWtongxin',
    repo: 'CW-electricity-shop',
    token: '' // 需要用户填写 Personal Access Token
};

/**
 * GitHub API 调用封装
 */
const GitHubAPI = {
    // 基础请求方法
    async request(method, endpoint, data = null) {
        const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}${endpoint}`;
        
        const options = {
            method,
            headers: {
                'Authorization': `token ${GITHUB_CONFIG.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status}`);
        }
        
        return await response.json();
    },
    
    // 创建 Issue（用于存储数据）
    async createIssue(title, body, labels = ['data']) {
        return await this.request('POST', '/issues', {
            title,
            body: JSON.stringify(body),
            labels
        });
    },
    
    // 获取所有 Issue
    async getIssues(labels = 'data') {
        return await this.request('GET', `/issues?labels=${labels}&state=all&per_page=100`);
    },
    
    // 更新 Issue
    async updateIssue(issueNumber, data) {
        return await this.request('PATCH', `/issues/${issueNumber}`, data);
    },
    
    // 关闭 Issue（删除数据）
    async closeIssue(issueNumber) {
        return await this.request('PATCH', `/issues/${issueNumber}`, {
            state: 'closed'
        });
    },
    
    // 上传文件到 GitHub（使用 Base64）
    async uploadFile(path, content, message = 'Upload file') {
        return await this.request('PUT', `/contents/${path}`, {
            message,
            content // Base64 编码
        });
    },
    
    // 获取文件内容
    async getFileContent(path) {
        try {
            const result = await this.request('GET', `/contents/${path}`);
            // GitHub 返回的是 Base64，需要解码
            return atob(result.content.replace(/\n/g, ''));
        } catch (error) {
            return null;
        }
    }
};

/**
 * 初始化数据库
 */
async function initDB() {
    // 检查是否已配置 Token
    const savedToken = localStorage.getItem('github_token');
    if (!savedToken) {
        // 首次使用，提示输入 Token
        setTimeout(() => {
            const token = prompt(
                '欢迎使用云商店！\n\n' +
                '这是第一次使用，需要配置 GitHub Token 以实现云存储\n\n' +
                '获取方式：\n' +
                '1. 访问 https://github.com/settings/tokens\n' +
                '2. 点击 Generate new token\n' +
                '3. 勾选 repo 和 workflow 权限\n' +
                '4. 复制生成的 Token\n\n' +
                '（如果只想本地测试，点取消即可）',
                ''
            );
            
            if (token && token.trim()) {
                GITHUB_CONFIG.token = token.trim();
                localStorage.setItem('github_token', token);
                alert('配置成功！数据将保存到 GitHub');
            } else {
                alert('已切换到本地存储模式\n数据仅保存在当前浏览器');
            }
        }, 1000);
        return;
    }
    
    GITHUB_CONFIG.token = savedToken;
    
    // 初始化数据文件
    await initializeDataFiles();
}

/**
 * 初始化数据文件（创建初始数据）
 */
async function initializeDataFiles() {
    try {
        // 检查并初始化商品数据
        let productsData = await GitHubAPI.getFileContent('data/products.json');
        if (!productsData) {
            const initialProducts = [
                {
                    id: '1',
                    name: '云服务器 ECS - 通用型 s6',
                    category: 'ecs',
                    price: 9900,
                    originalPrice: 19900,
                    sales: 12580,
                    image: 'https://picsum.photos/400/300?random=1',
                    images: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
                    description: '高性能云服务器，适用于中小企业网站、应用服务器等场景',
                    specs: {CPU: ['2 核', '4 核', '8 核'], '内存': ['4GB', '8GB', '16GB']},
                    params: {'处理器': 'Intel Xeon Platinum 8269CY', '内存类型': 'DDR4 2666MHz'},
                    stock: 100,
                    isOnSale: true,
                    rating: 4.8,
                    reviews: [],
                    createTime: Date.now()
                }
            ];
            
            await GitHubAPI.uploadFile(
                'data/products.json',
                btoa(JSON.stringify(initialProducts)),
                '初始化商品数据'
            );
        }
        
        // 检查并初始化管理员数据
        let adminsData = await GitHubAPI.getFileContent('data/admins.json');
        if (!adminsData) {
            const initialAdmins = [
                {
                    username: 'admin',
                    password: 'win112233',
                    role: 'admin',
                    createTime: Date.now()
                }
            ];
            
            await GitHubAPI.uploadFile(
                'data/admins.json',
                btoa(JSON.stringify(initialAdmins)),
                '初始化管理员账号'
            );
        }
        
        // 检查并初始化订单数据
        let ordersData = await GitHubAPI.getFileContent('data/orders.json');
        if (!ordersData) {
            await GitHubAPI.uploadFile(
                'data/orders.json',
                btoa(JSON.stringify([])),
                '初始化订单数据'
            );
        }
    } catch (error) {
        console.error('初始化失败:', error);
    }
}

/**
 * 商品数据操作
 */
const ProductDAO = {
    // 获取所有上架商品
    async getAll() {
        try {
            const data = await GitHubAPI.getFileContent('data/products.json');
            if (!data) return [];
            const products = JSON.parse(data);
            return products.filter(p => p.isOnSale);
        } catch (error) {
            console.error('获取商品失败:', error);
            return [];
        }
    },
    
    // 根据分类筛选
    async getByCategory(category) {
        const products = await this.getAll();
        if (!category) return products;
        return products.filter(p => p.category === category);
    },
    
    // 搜索商品
    async search(keyword) {
        const products = await this.getAll();
        return products.filter(p => 
            p.name.toLowerCase().includes(keyword.toLowerCase()) ||
            p.description.toLowerCase().includes(keyword.toLowerCase())
        );
    },
    
    // 获取商品详情
    async getById(id) {
        const data = await GitHubAPI.getFileContent('data/products.json');
        if (!data) return null;
        const products = JSON.parse(data);
        return products.find(p => p.id === id);
    },
    
    // 添加商品
    async add(productData) {
        const data = await GitHubAPI.getFileContent('data/products.json');
        const products = data ? JSON.parse(data) : [];
        
        const newProduct = {
            ...productData,
            id: 'P' + Date.now(),
            sales: 0,
            isOnSale: true,
            createTime: Date.now()
        };
        
        products.push(newProduct);
        
        // 保存到 GitHub
        await GitHubAPI.uploadFile(
            'data/products.json',
            btoa(JSON.stringify(products)),
            `添加商品：${newProduct.name}`
        );
        
        return newProduct.id;
    },
    
    // 更新商品
    async update(id, productData) {
        const data = await GitHubAPI.getFileContent('data/products.json');
        if (!data) return;
        
        const products = JSON.parse(data);
        const index = products.findIndex(p => p.id === id);
        
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
            await GitHubAPI.uploadFile(
                'data/products.json',
                btoa(JSON.stringify(products)),
                `更新商品：${products[index].name}`
            );
        }
    },
    
    // 删除商品
    async delete(id) {
        const data = await GitHubAPI.getFileContent('data/products.json');
        if (!data) return;
        
        const products = JSON.parse(data);
        const filtered = products.filter(p => p.id !== id);
        
        await GitHubAPI.uploadFile(
            'data/products.json',
            btoa(JSON.stringify(filtered)),
            '删除商品'
        );
    },
    
    // 更新库存
    async updateStock(id, stockChange) {
        const data = await GitHubAPI.getFileContent('data/products.json');
        if (!data) return;
        
        const products = JSON.parse(data);
        const product = products.find(p => p.id === id);
        
        if (product) {
            product.stock += stockChange;
            await GitHubAPI.uploadFile(
                'data/products.json',
                btoa(JSON.stringify(products)),
                `更新库存：${product.name}`
            );
        }
    },
    
    // 更新销量
    async updateSales(id, quantity) {
        const data = await GitHubAPI.getFileContent('data/products.json');
        if (!data) return;
        
        const products = JSON.parse(data);
        const product = products.find(p => p.id === id);
        
        if (product) {
            product.sales += quantity;
            await GitHubAPI.uploadFile(
                'data/products.json',
                btoa(JSON.stringify(products)),
                `更新销量：${product.name}`
            );
        }
    }
};

/**
 * 订单数据操作
 */
const OrderDAO = {
    // 生成订单号
    generateOrderNo() {
        return 'SO' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    },
    
    // 创建订单
    async create(orderData) {
        const data = await GitHubAPI.getFileContent('data/orders.json');
        const orders = data ? JSON.parse(data) : [];
        
        const newOrder = {
            ...orderData,
            orderNo: this.generateOrderNo(),
            status: 'pending',
            paymentStatus: 'unpaid',
            createTime: Date.now()
        };
        
        orders.push(newOrder);
        
        await GitHubAPI.uploadFile(
            'data/orders.json',
            btoa(JSON.stringify(orders)),
            `创建订单：${newOrder.orderNo}`
        );
        
        return newOrder;
    },
    
    // 获取订单列表
    async getAll() {
        try {
            const data = await GitHubAPI.getFileContent('data/orders.json');
            if (!data) return [];
            return JSON.parse(data);
        } catch (error) {
            console.error('获取订单失败:', error);
            return [];
        }
    },
    
    // 根据 ID 获取订单
    async getById(id) {
        const orders = await this.getAll();
        return orders.find(o => o._id === id);
    },
    
    // 根据订单号获取订单
    async getByOrderNo(orderNo) {
        const orders = await this.getAll();
        return orders.find(o => o.orderNo === orderNo);
    },
    
    // 更新订单
    async update(id, orderData) {
        const data = await GitHubAPI.getFileContent('data/orders.json');
        if (!data) return;
        
        const orders = JSON.parse(data);
        const index = orders.findIndex(o => o._id === id);
        
        if (index !== -1) {
            orders[index] = { ...orders[index], ...orderData };
            await GitHubAPI.uploadFile(
                'data/orders.json',
                btoa(JSON.stringify(orders)),
                `更新订单：${orders[index].orderNo}`
            );
        }
    },
    
    // 上传支付凭证
    async uploadPaymentProof(orderNo, proofUrl) {
        const data = await GitHubAPI.getFileContent('data/orders.json');
        if (!data) return;
        
        const orders = JSON.parse(data);
        const order = orders.find(o => o.orderNo === orderNo);
        
        if (order) {
            order.paymentProof = proofUrl;
            order.paymentStatus = 'paid';
            order.paidTime = Date.now();
            
            await GitHubAPI.uploadFile(
                'data/orders.json',
                btoa(JSON.stringify(orders)),
                `上传支付凭证：${orderNo}`
            );
        }
    },
    
    // 确认收款
    async confirmPayment(orderNo) {
        const data = await GitHubAPI.getFileContent('data/orders.json');
        if (!data) return;
        
        const orders = JSON.parse(data);
        const order = orders.find(o => o.orderNo === orderNo);
        
        if (order) {
            order.status = 'paid';
            await GitHubAPI.uploadFile(
                'data/orders.json',
                btoa(JSON.stringify(orders)),
                `确认收款：${orderNo}`
            );
        }
    },
    
    // 发货
    async ship(orderNo, company, trackingNo) {
        const data = await GitHubAPI.getFileContent('data/orders.json');
        if (!data) return;
        
        const orders = JSON.parse(data);
        const order = orders.find(o => o.orderNo === orderNo);
        
        if (order) {
            order.status = 'shipped';
            order.shippingCompany = company;
            order.trackingNo = trackingNo;
            order.shippedTime = Date.now();
            
            await GitHubAPI.uploadFile(
                'data/orders.json',
                btoa(JSON.stringify(orders)),
                `发货：${orderNo}`
            );
        }
    },
    
    // 获取待确认支付的订单
    async getPendingPayments() {
        const orders = await this.getAll();
        return orders.filter(o => o.paymentStatus === 'paid' && o.status === 'pending');
    }
};

/**
 * 用户认证
 */
const UserDAO = {
    // 管理员登录
    async login(username, password) {
        try {
            const data = await GitHubAPI.getFileContent('data/admins.json');
            const admins = data ? JSON.parse(data) : [];
            
            const admin = admins.find(a => a.username === username && a.password === password);
            
            if (!admin) {
                throw new Error('用户名或密码错误');
            }
            
            localStorage.setItem('currentAdmin', JSON.stringify(admin));
            return admin;
        } catch (error) {
            // 如果 GitHub API 失败，使用本地存储
            const admins = JSON.parse(localStorage.getItem('admins') || '[]');
            const admin = admins.find(a => a.username === username && a.password === password);
            
            if (!admin) {
                throw new Error('用户名或密码错误');
            }
            
            localStorage.setItem('currentAdmin', JSON.stringify(admin));
            return admin;
        }
    },
    
    // 检查是否已登录
    isLoggedIn() {
        const adminStr = localStorage.getItem('currentAdmin');
        return !!adminStr;
    },
    
    // 获取当前管理员
    getCurrent() {
        const adminStr = localStorage.getItem('currentAdmin');
        return adminStr ? JSON.parse(adminStr) : null;
    },
    
    // 退出登录
    logout() {
        localStorage.removeItem('currentAdmin');
    }
};

/**
 * 文件上传（模拟）
 */
const FileDAO = {
    async upload(fileInput) {
        return new Promise((resolve, reject) => {
            const file = fileInput.files[0];
            if (!file) {
                reject(new Error('请选择文件'));
                return;
            }
            
            // 读取文件并转换为 Base64
            const reader = new FileReader();
            reader.onload = (e) => {
                // 实际应用中应该上传到服务器，这里简单返回 Base64
                resolve(e.target.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
};

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    initDB();
});
