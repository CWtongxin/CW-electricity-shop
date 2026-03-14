// ==================== 数据层封装 - 使用 localStorage ====================
// 注意：这是演示版本，数据存储在浏览器本地
// 正式版本将使用 GitHub Issues API 作为后端

const DB_VERSION = '1.0';

/**
 * 初始化数据库
 */
function initDB() {
    // 初始化商品数据（如果不存在）
    if (!localStorage.getItem('products')) {
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
                specs: {'CPU': ['2 核', '4 核', '8 核'], '内存': ['4GB', '8GB', '16GB']},
                params: {'处理器': 'Intel Xeon Platinum 8269CY', '内存类型': 'DDR4 2666MHz'},
                stock: 100,
                isOnSale: true,
                rating: 4.8,
                reviews: [],
                createTime: Date.now()
            }
        ];
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }
    
    // 初始化订单数据
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
    
    // 初始化店铺配置
    if (!localStorage.getItem('shopConfig')) {
        localStorage.setItem('shopConfig', JSON.stringify({
            shopName: '我的云商店',
            contactPhone: '400-888-8888',
            contactWechat: 'wechat123'
        }));
    }
    
    // 初始化管理员账号
    if (!localStorage.getItem('admins')) {
        localStorage.setItem('admins', JSON.stringify([{
            username: 'admin',
            password: 'win112233',
            role: 'admin'
        }]));
    }
}

/**
 * 商品数据操作
 */
const ProductDAO = {
    // 获取所有上架商品
    getAll() {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        return products.filter(p => p.isOnSale);
    },
    
    // 根据分类筛选
    getByCategory(category) {
        const products = this.getAll();
        if (!category) return products;
        return products.filter(p => p.category === category);
    },
    
    // 搜索商品
    search(keyword) {
        const products = this.getAll();
        return products.filter(p => 
            p.name.toLowerCase().includes(keyword.toLowerCase()) ||
            p.description.toLowerCase().includes(keyword.toLowerCase())
        );
    },
    
    // 获取商品详情
    getById(id) {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        return products.find(p => p.id === id);
    },
    
    // 添加商品
    add(productData) {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const newProduct = {
            ...productData,
            id: 'P' + Date.now(),
            sales: 0,
            isOnSale: true,
            createTime: Date.now()
        };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        return newProduct.id;
    },
    
    // 更新商品
    update(id, productData) {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
            localStorage.setItem('products', JSON.stringify(products));
        }
    },
    
    // 删除商品
    delete(id) {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(filtered));
    },
    
    // 更新库存
    updateStock(id, stockChange) {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const product = products.find(p => p.id === id);
        if (product) {
            product.stock += stockChange;
            localStorage.setItem('products', JSON.stringify(products));
        }
    },
    
    // 更新销量
    updateSales(id, quantity) {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const product = products.find(p => p.id === id);
        if (product) {
            product.sales += quantity;
            localStorage.setItem('products', JSON.stringify(products));
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
    create(orderData) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const newOrder = {
            ...orderData,
            orderNo: this.generateOrderNo(),
            status: 'pending',
            paymentStatus: 'unpaid',
            createTime: Date.now()
        };
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        return newOrder;
    },
    
    // 获取订单列表
    getAll() {
        return JSON.parse(localStorage.getItem('orders') || '[]');
    },
    
    // 根据 ID 获取订单
    getById(id) {
        const orders = this.getAll();
        return orders.find(o => o._id === id);
    },
    
    // 根据订单号获取订单
    getByOrderNo(orderNo) {
        const orders = this.getAll();
        return orders.find(o => o.orderNo === orderNo);
    },
    
    // 更新订单
    update(id, orderData) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const index = orders.findIndex(o => o._id === id);
        if (index !== -1) {
            orders[index] = { ...orders[index], ...orderData };
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    },
    
    // 上传支付凭证
    uploadPaymentProof(orderNo, proofUrl) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const order = orders.find(o => o.orderNo === orderNo);
        if (order) {
            order.paymentProof = proofUrl;
            order.paymentStatus = 'paid';
            order.paidTime = Date.now();
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    },
    
    // 确认收款
    confirmPayment(orderNo) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const order = orders.find(o => o.orderNo === orderNo);
        if (order) {
            order.status = 'paid';
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    },
    
    // 发货
    ship(orderNo, company, trackingNo) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const order = orders.find(o => o.orderNo === orderNo);
        if (order) {
            order.status = 'shipped';
            order.shippingCompany = company;
            order.trackingNo = trackingNo;
            order.shippedTime = Date.now();
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    },
    
    // 获取待确认支付的订单
    getPendingPayments() {
        const orders = this.getAll();
        return orders.filter(o => o.paymentStatus === 'paid' && o.status === 'pending');
    }
};

/**
 * 用户认证
 */
const UserDAO = {
    // 管理员登录
    login(username, password) {
        const admins = JSON.parse(localStorage.getItem('admins') || '[]');
        const admin = admins.find(a => a.username === username && a.password === password);
        
        if (!admin) {
            throw new Error('用户名或密码错误');
        }
        
        localStorage.setItem('currentAdmin', JSON.stringify(admin));
        return admin;
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
