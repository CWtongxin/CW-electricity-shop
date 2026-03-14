// ==================== 全局数据 ====================
// 模拟商品数据
const products = [
    {
        id: '1',
        name: '云服务器 ECS - 通用型 s6',
        category: 'ecs',
        price: 99.00,
        originalPrice: 199.00,
        sales: 12580,
        image: 'https://picsum.photos/400/300?random=1',
        images: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2', 'https://picsum.photos/400/300?random=3'],
        description: '高性能云服务器，适用于中小企业网站、应用服务器等场景',
        specs: {
            'CPU': ['2 核', '4 核', '8 核'],
            '内存': ['4GB', '8GB', '16GB'],
            '带宽': ['1Mbps', '3Mbps', '5Mbps']
        },
        params: {
            '处理器': 'Intel Xeon Platinum 8269CY',
            '内存类型': 'DDR4 2666MHz',
            '网络能力': '最高 10Gbps',
            '存储类型': 'ESSD 云盘'
        },
        rating: 4.8,
        reviews: [
            { user: '张***3', rating: 5, content: '性能很强大，运行稳定，性价比很高！', date: '2026-03-10' },
            { user: '李***8', rating: 5, content: '部署简单快捷，技术支持响应及时', date: '2026-03-08' },
            { user: '王***5', rating: 4, content: '整体不错，就是价格稍微有点贵', date: '2026-03-05' }
        ]
    },
    {
        id: '2',
        name: '对象存储 OSS - 标准存储包',
        category: 'storage',
        price: 158.00,
        originalPrice: 258.00,
        sales: 8960,
        image: 'https://picsum.photos/400/300?random=4',
        images: ['https://picsum.photos/400/300?random=4', 'https://picsum.photos/400/300?random=5'],
        description: '海量、安全、低成本、高可靠的云存储服务',
        specs: {
            '容量': ['100GB', '500GB', '1TB'],
            '有效期': ['1 年', '3 年', '5 年']
        },
        params: {
            '存储类型': '标准存储',
            '可靠性': '99.999999999%',
            '访问方式': 'RESTful API',
            '数据冗余': '多 AZ 冗余'
        },
        rating: 4.7,
        reviews: [
            { user: '赵***6', rating: 5, content: '存储速度快，安全性好', date: '2026-03-12' },
            { user: '钱***2', rating: 4, content: '价格实惠，适合备份使用', date: '2026-03-09' }
        ]
    },
    {
        id: '3',
        name: '云数据库 MySQL 高可用版',
        category: 'database',
        price: 368.00,
        originalPrice: 588.00,
        sales: 6520,
        image: 'https://picsum.photos/400/300?random=6',
        images: ['https://picsum.photos/400/300?random=6', 'https://picsum.photos/400/300?random=7'],
        description: '稳定可靠、便捷运维的数据库服务',
        specs: {
            '规格': ['基础版', '高可用版', '集群版'],
            '连接数': ['1000', '2000', '5000']
        },
        params: {
            '数据库版本': 'MySQL 8.0',
            '架构': '主从双节点',
            '自动备份': '支持',
            '监控告警': '7×24 小时'
        },
        rating: 4.9,
        reviews: [
            { user: '孙***9', rating: 5, content: '数据库性能优秀，运维很简单', date: '2026-03-11' }
        ]
    },
    {
        id: '4',
        name: 'DDoS 高防 IP 专业版',
        category: 'security',
        price: 588.00,
        originalPrice: 888.00,
        sales: 4580,
        image: 'https://picsum.photos/400/300?random=8',
        images: ['https://picsum.photos/400/300?random=8'],
        description: '为企业级用户提供全面的高级 DDOS 防护',
        specs: {
            '防护能力': ['30G', '60G', '100G'],
            '业务带宽': ['100Mbps', '300Mbps', '500Mbps']
        },
        params: {
            '防护类型': 'CC 攻击防护 + DDoS 防护',
            '响应时间': '< 10ms',
            '报表功能': '支持',
            '切换模式': '自动切换'
        },
        rating: 4.6,
        reviews: [
            { user: '周***1', rating: 5, content: '防护效果很好，业务稳定', date: '2026-03-10' }
        ]
    },
    {
        id: '5',
        name: '负载均衡 SLB - 性能保障型',
        category: 'network',
        price: 198.00,
        originalPrice: 298.00,
        sales: 7850,
        image: 'https://picsum.photos/400/300?random=9',
        images: ['https://picsum.photos/400/300?random=9', 'https://picsum.photos/400/300?random=10'],
        description: '对流量进行分发，提高系统的可用性',
        specs: {
            '规格': ['简约型 I', '简约型 II', '超强型 I'],
            '最大连接数': ['50,000', '100,000', '500,000']
        },
        params: {
            '实例类型': '性能保障型',
            '监听协议': 'TCP/UDP/HTTP/HTTPS',
            '健康检查': '支持',
            '会话保持': '支持'
        },
        rating: 4.7,
        reviews: []
    },
    {
        id: '6',
        name: '大数据计算服务 MaxCompute',
        category: 'bigdata',
        price: 1288.00,
        originalPrice: 1988.00,
        sales: 3250,
        image: 'https://picsum.photos/400/300?random=11',
        images: ['https://picsum.photos/400/300?random=11'],
        description: '快速、完全托管的 TB/PB 级数据仓库解决方案',
        specs: {
            '计算资源': ['CU 100', 'CU 300', 'CU 500'],
            '存储容量': ['1TB', '5TB', '10TB']
        },
        params: {
            '计算引擎': '自研分布式计算引擎',
            'SQL 支持': '标准 SQL',
            '开发工具': 'DataWorks',
            '数据安全': '多重加密'
        },
        rating: 4.8,
        reviews: []
    },
    {
        id: '7',
        name: '云服务器 ECS - 计算型 c7',
        category: 'ecs',
        price: 188.00,
        originalPrice: 288.00,
        sales: 9650,
        image: 'https://picsum.photos/400/300?random=12',
        images: ['https://picsum.photos/400/300?random=12'],
        description: '高性能计算服务器，适用于计算密集型应用',
        specs: {
            'CPU': ['4 核', '8 核', '16 核'],
            '内存': ['8GB', '16GB', '32GB']
        },
        params: {
            '处理器': 'Intel Xeon Platinum 8369B',
            '主频': '3.5GHz',
            '网络': '25Gbps',
            '适用场景': '批量处理、科学计算'
        },
        rating: 4.9,
        reviews: []
    },
    {
        id: '8',
        name: 'Redis 缓存数据库',
        category: 'database',
        price: 258.00,
        originalPrice: 398.00,
        sales: 5680,
        image: 'https://picsum.photos/400/300?random=13',
        images: ['https://picsum.photos/400/300?random=13'],
        description: '兼容 Redis 协议的内存数据库',
        specs: {
            '容量': ['1GB', '4GB', '8GB', '16GB'],
            '架构': ['主从版', '集群版']
        },
        params: {
            '版本': 'Redis 6.0',
            '持久化': 'RDB/AOF',
            '备份': '自动备份',
            '监控': '实时监控'
        },
        rating: 4.7,
        reviews: []
    }
];

// 模拟用户地址数据
let addresses = [
    {
        id: 1,
        name: '张三',
        phone: '138****1234',
        region: '北京市朝阳区',
        detail: '中关村大街 1 号海龙大厦',
        isDefault: true
    },
    {
        id: 2,
        name: '李四',
        phone: '139****5678',
        region: '上海市浦东新区',
        detail: '陆家嘴环路 1000 号',
        isDefault: false
    }
];

// 购物车数据（从 localStorage 读取）
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 当前用户
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// ==================== 页面初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    checkUserLogin();
    
    // 首页轮播图初始化
    if (document.getElementById('carousel')) {
        initCarousel();
    }
    
    // 首页商品加载
    if (document.getElementById('hotProducts')) {
        loadHomePage();
    }
});

// ==================== 导航栏功能 ====================
// 搜索功能
function handleSearch() {
    const keyword = document.getElementById('searchInput').value.trim();
    if (keyword) {
        window.location.href = `list.html?keyword=${encodeURIComponent(keyword)}`;
    } else {
        showToast('请输入搜索关键词');
    }
}

// 搜索框回车搜索
if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

// ==================== 轮播图功能 ====================
let currentSlide = 0;
let slideInterval;

function initCarousel() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const carouselInner = document.getElementById('carouselInner');
    const carouselContainer = document.getElementById('carousel');
    const items = carouselContainer.querySelectorAll('.carousel-item');
    
    // 创建指示器
    items.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.onclick = () => goToSlide(index);
        indicatorsContainer.appendChild(indicator);
    });
    
    // 自动轮播
    startAutoPlay();
    
    // 鼠标悬停暂停
    const carousel = document.getElementById('carousel');
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
}

function startAutoPlay() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoPlay() {
    clearInterval(slideInterval);
}

function changeSlide(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const total = items.length;
    
    currentSlide = (currentSlide + direction + total) % total;
    goToSlide(currentSlide);
}

function goToSlide(index) {
    const carouselInner = document.getElementById('carouselInner');
    const indicators = document.querySelectorAll('.indicator');
    
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
    
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
}

// ==================== 商品展示功能 ====================
// 加载首页商品
function loadHomePage() {
    // 热门商品（按销量排序）
    const hotProducts = [...products].sort((a, b) => b.sales - a.sales).slice(0, 4);
    renderProducts(hotProducts, 'hotProducts');
    
    // 新品上架（按 ID 倒序）
    const newProducts = [...products].reverse().slice(0, 4);
    renderProducts(newProducts, 'newProducts');
    
    // 分类推荐
    const categoryProducts = products.slice(0, 4);
    renderProducts(categoryProducts, 'categoryProducts');
}

// 渲染商品列表
function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = productList.map(product => createProductCard(product)).join('');
}

// 创建商品卡片
function createProductCard(product) {
    return `
        <div class="product-card" onclick="location.href='detail.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <button class="quick-add-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
                🛒 加入购物车
            </button>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">¥${product.price.toFixed(2)}</div>
                <div class="product-sales">销量：${product.sales}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); location.href='detail.html?id=${product.id}'">
                        立即购买
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 加载商品列表页
function loadProducts(category = '', sort = '', minPrice = null, maxPrice = null) {
    let filteredProducts = [...products];
    
    // 分类筛选
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // 价格筛选
    if (minPrice !== null && minPrice !== '') {
        filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    }
    if (maxPrice !== null && maxPrice !== '') {
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }
    
    // 排序
    switch(sort) {
        case 'price_asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price_desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'sales':
            filteredProducts.sort((a, b) => b.sales - a.sales);
            break;
        case 'new':
            filteredProducts.reverse();
            break;
    }
    
    // 更新商品数量显示
    document.getElementById('productCount').textContent = filteredProducts.length;
    
    // 渲染商品列表
    renderProducts(filteredProducts, 'productsList');
    
    // 渲染分页
    renderPagination(filteredProducts.length, 12);
}

// 应用价格筛选
function applyPriceFilter() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const activeCategory = document.querySelector('#categoryFilter .filter-option.active').dataset.category;
    const activeSort = document.querySelector('#sortFilter .filter-option.active').dataset.sort;
    
    loadProducts(activeCategory, activeSort, minPrice, maxPrice);
}

// 清除价格筛选
function clearPriceFilter() {
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    const activeCategory = document.querySelector('#categoryFilter .filter-option.active').dataset.category;
    loadProducts(activeCategory);
}

// 渲染分页
function renderPagination(total, pageSize = 12) {
    const totalPages = Math.ceil(total / pageSize);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<div class="page-item ${i === 1 ? 'active' : ''}" onclick="goToPage(${i})">${i}</div>`;
    }
    pagination.innerHTML = html;
}

function goToPage(page) {
    // 实际项目中应该请求对应页的数据
    document.querySelectorAll('.page-item').forEach((item, index) => {
        item.classList.toggle('active', index + 1 === page);
    });
    showToast(`第 ${page} 页`);
}

// ==================== 商品详情页功能 ====================
let currentProductId = null;
let selectedSpecs = {};
let currentPrice = 0;

function loadProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showToast('商品不存在');
        setTimeout(() => location.href = 'index.html', 1500);
        return;
    }
    
    currentProductId = productId;
    selectedSpecs = {};
    
    // 设置基本信息
    document.getElementById('mainImage').src = product.images[0];
    document.getElementById('productDetailTitle').textContent = product.name;
    document.getElementById('productDetailDesc').textContent = product.description;
    document.getElementById('productTitle').textContent = product.name;
    
    // 更新价格
    updateProductPrice(product);
    
    // 渲染缩略图
    renderThumbnails(product.images);
    
    // 渲染规格选项
    renderSpecifications(product);
    
    // 渲染参数表格
    renderParamsTable(product.params);
    
    // 渲染商品描述
    document.getElementById('productDescription').innerHTML = `
        <div style="line-height: 1.8; color: var(--text-secondary);">
            <p>${product.description}</p>
            <img src="${product.image}" style="width: 100%; margin: 20px 0; border-radius: 8px;">
            <h3 style="margin: 20px 0 10px; color: var(--text-primary);">产品特点</h3>
            <ul style="list-style: disc; padding-left: 20px;">
                <li>高品质云服务，稳定可靠</li>
                <li>弹性扩展，按需使用</li>
                <li>7×24 小时技术支持</li>
                <li>全国多地域覆盖</li>
            </ul>
        </div>
    `;
    
    // 渲染评价列表
    renderReviews(product.reviews || []);
}

function updateProductPrice(product) {
    currentPrice = product.price;
    document.getElementById('currentPrice').textContent = `¥${product.price.toFixed(2)}`;
    document.getElementById('originalPrice').textContent = `¥${product.originalPrice.toFixed(2)}`;
    const discount = Math.round((product.price / product.originalPrice) * 10);
    document.getElementById('discountTag').textContent = `${discount}折`;
}

function renderThumbnails(images) {
    const container = document.getElementById('thumbnailList');
    container.innerHTML = images.map((img, index) => `
        <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" 
             onclick="changeMainImage(this, '${img}')">
    `).join('');
}

function changeMainImage(thumbnail, src) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

function renderSpecifications(product) {
    const container = document.getElementById('specifications');
    container.innerHTML = Object.entries(product.specs).map(([specName, options]) => `
        <div class="spec-group">
            <div class="spec-label">${specName}</div>
            <div class="spec-options">
                ${options.map((option, index) => `
                    <div class="spec-option ${index === 0 ? 'active' : ''}" 
                         onclick="selectSpec('${specName}', '${option}', this)">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    // 初始化第一个选项为选中状态
    Object.keys(product.specs).forEach(key => {
        selectedSpecs[key] = product.specs[key][0];
    });
}

function selectSpec(specName, option, element) {
    selectedSpecs[specName] = option;
    
    // 更新选中样式
    element.parentElement.querySelectorAll('.spec-option').forEach(opt => {
        opt.classList.remove('active');
    });
    element.classList.add('active');
    
    // 根据规格调整价格（模拟）
    const product = products.find(p => p.id === currentProductId);
    let priceAdjustment = 0;
    
    // 简单的价格调整逻辑示例
    if (specName === 'CPU' && option.includes('8 核')) {
        priceAdjustment = 100;
    } else if (specName === '内存' && option.includes('16GB')) {
        priceAdjustment = 50;
    }
    
    currentPrice = product.price + priceAdjustment;
    document.getElementById('currentPrice').textContent = `¥${currentPrice.toFixed(2)}`;
}

function renderParamsTable(params) {
    const table = document.getElementById('paramsTable');
    table.innerHTML = Object.entries(params).map(([key, value]) => `
        <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 15px; width: 150px; color: var(--text-secondary); background-color: var(--bg-light);">${key}</td>
            <td style="padding: 15px; color: var(--text-primary);">${value}</td>
        </tr>
    `).join('');
}

function renderReviews(reviews) {
    const container = document.getElementById('reviewList');
    
    if (!reviews || reviews.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-light);">暂无评价</div>';
        return;
    }
    
    container.innerHTML = reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="reviewer-name">${review.user}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <div class="review-content">${review.content}</div>
        </div>
    `).join('');
}

function switchTab(tabName) {
    // 更新 Tab 样式
    document.querySelectorAll('.tab-item').forEach((tab, index) => {
        tab.classList.toggle('active', 
            (tabName === 'params' && index === 0) ||
            (tabName === 'description' && index === 1) ||
            (tabName === 'reviews' && index === 2)
        );
    });
    
    // 更新内容显示
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// 数量控制
function changeQuantity(delta) {
    const input = document.getElementById('quantityInput');
    let value = parseInt(input.value) + delta;
    value = Math.max(1, Math.min(100, value));
    input.value = value;
}

function updateQuantity(value) {
    value = parseInt(value);
    value = isNaN(value) ? 1 : Math.max(1, Math.min(100, value));
    document.getElementById('quantityInput').value = value;
}

// 从详情页加入购物车
function addToCartFromDetail() {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    addToCart(currentProductId, quantity, selectedSpecs);
}

function buyNow() {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    addToCart(currentProductId, quantity, selectedSpecs);
    window.location.href = 'checkout.html';
}

// ==================== 购物车功能 ====================
// 添加到购物车
function addToCart(productId, quantity = 1, specs = {}) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showToast('商品不存在');
        return;
    }
    
    // 生成唯一标识（考虑规格）
    const specKey = Object.entries(specs).sort().map(([k, v]) => `${k}:${v}`).join('|');
    const cartKey = `${productId}_${specKey}`;
    
    // 查找是否已存在
    const existingItem = cart.find(item => item.cartKey === cartKey);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            cartKey,
            productId,
            name: product.name,
            price: currentPrice || product.price,
            image: product.image,
            quantity,
            specs,
            specKey,
            selected: true
        });
    }
    
    // 保存到 localStorage
    saveCart();
    
    // 更新购物车数量
    updateCartCount();
    
    showToast('已成功添加到购物车');
}

// 保存购物车到 localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 更新购物车角标
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        el.textContent = count > 99 ? '99+' : count;
    });
}

// 加载购物车页面
function loadCart() {
    const emptyCartEl = document.getElementById('emptyCart');
    const cartContentEl = document.getElementById('cartContent');
    const cartItemsEl = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        emptyCartEl.style.display = 'block';
        cartContentEl.style.display = 'none';
        return;
    }
    
    emptyCartEl.style.display = 'none';
    cartContentEl.style.display = 'block';
    
    // 渲染购物车商品
    cartItemsEl.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <input type="checkbox" class="cart-checkbox" 
                   ${item.selected ? 'checked' : ''} 
                   onchange="toggleItemSelect(${index})">
            <div class="cart-product">
                <img src="${item.image}" alt="${item.name}" class="cart-product-img">
                <div class="cart-product-info">
                    <h4>${item.name}</h4>
                    <div class="cart-product-spec">${formatSpecs(item.specs)}</div>
                </div>
            </div>
            <div class="cart-price">¥${item.price.toFixed(2)}</div>
            <div class="cart-quantity">
                <button class="quantity-btn" onclick="updateCartItemQuantity(${index}, -1)">-</button>
                <input type="number" value="${item.quantity}" min="1" max="100" 
                       onchange="updateCartItemQuantityDirect(${index}, this.value)">
                <button class="quantity-btn" onclick="updateCartItemQuantity(${index}, 1)">+</button>
            </div>
            <div class="cart-total">¥${(item.price * item.quantity).toFixed(2)}</div>
            <div class="cart-delete" onclick="deleteCartItem(${index})">🗑️</div>
        </div>
    `).join('');
    
    updateCartTotal();
}

function formatSpecs(specs) {
    return Object.entries(specs).map(([k, v]) => `${k}: ${v}`).join('; ');
}

// 更新购物车商品数量
function updateCartItemQuantity(index, delta) {
    const item = cart[index];
    item.quantity += delta;
    item.quantity = Math.max(1, Math.min(100, item.quantity));
    
    saveCart();
    loadCart();
}

function updateCartItemQuantityDirect(index, value) {
    const item = cart[index];
    item.quantity = parseInt(value) || 1;
    item.quantity = Math.max(1, Math.min(100, item.quantity));
    
    saveCart();
    loadCart();
}

// 删除购物车商品
function deleteCartItem(index) {
    if (!confirm('确定要删除该商品吗？')) return;
    
    cart.splice(index, 1);
    saveCart();
    loadCart();
    updateCartCount();
}

// 全选/取消全选
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll').checked;
    cart.forEach(item => {
        item.selected = selectAll;
    });
    saveCart();
    updateCartTotal();
}

// 单选商品
function toggleItemSelect(index) {
    cart[index].selected = !cart[index].selected;
    saveCart();
    updateCartTotal();
}

// 更新购物车总计
function updateCartTotal() {
    const selectedItems = cart.filter(item => item.selected);
    const totalCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('selectedCount').textContent = totalCount;
    document.getElementById('cartTotalPrice').textContent = `¥${totalPrice.toFixed(2)}`;
}

// 清空购物车
function clearCart() {
    if (cart.length === 0) {
        showToast('购物车已经是空的');
        return;
    }
    
    if (!confirm('确定要清空购物车吗？')) return;
    
    cart = [];
    saveCart();
    loadCart();
    updateCartCount();
}

// 批量删除
function batchDelete() {
    const selectedItems = cart.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
        showToast('请先选择要删除的商品');
        return;
    }
    
    if (!confirm(`确定要删除选中的 ${selectedItems.length} 件商品吗？`)) return;
    
    cart = cart.filter(item => !item.selected);
    saveCart();
    loadCart();
    updateCartCount();
}

// 去结算
function checkout() {
    const selectedItems = cart.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
        showToast('请先选择要结算的商品');
        return;
    }
    
    // 将选中的商品保存到 sessionStorage 用于结算页
    sessionStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
    window.location.href = 'checkout.html';
}

// ==================== 结算页面功能 ====================
let selectedAddress = null;
let selectedPayment = 'alipay';

function loadCheckout() {
    // 加载收货地址
    loadAddresses();
    
    // 加载订单商品
    loadOrderProducts();
}

function loadAddresses() {
    const container = document.getElementById('addressList');
    
    if (addresses.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-light);">
                暂无收货地址，请点击右上角添加
            </div>
        `;
        return;
    }
    
    container.innerHTML = addresses.map((addr, index) => `
        <div class="address-card ${addr.isDefault && !selectedAddress ? 'selected' : ''}" 
             onclick="selectAddress(${index}, this)">
            <div class="address-name">${addr.name} ${addr.phone}</div>
            <div class="address-detail">${addr.region} ${addr.detail}</div>
            ${addr.isDefault ? '<div style="color: var(--primary-color); font-size: 12px; margin-top: 5px;">默认地址</div>' : ''}
        </div>
    `).join('') + `
        <div class="address-card add-address-btn" onclick="showAddAddressModal()">
            <div style="font-size: 30px; margin-bottom: 10px;">+</div>
            <div>添加新地址</div>
        </div>
    `;
}

function selectAddress(index, element) {
    selectedAddress = addresses[index];
    
    document.querySelectorAll('.address-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
}

function loadOrderProducts() {
    const checkoutItems = JSON.parse(sessionStorage.getItem('checkoutItems') || '[]');
    
    if (checkoutItems.length === 0) {
        showToast('没有要结算的商品');
        setTimeout(() => location.href = 'cart.html', 1500);
        return;
    }
    
    const container = document.getElementById('orderProducts');
    const total = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    container.innerHTML = checkoutItems.map(item => `
        <div style="display: flex; gap: 15px; padding: 15px 0; border-bottom: 1px solid var(--border-color);">
            <img src="${item.image}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
            <div style="flex: 1;">
                <div style="margin-bottom: 5px;">${item.name}</div>
                <div style="color: var(--text-light); font-size: 13px;">${formatSpecs(item.specs)}</div>
                <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--danger-color); font-weight: 500;">¥${item.price.toFixed(2)}</span>
                    <span style="color: var(--text-secondary);">x${item.quantity}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // 更新订单汇总
    document.getElementById('productTotal').textContent = `¥${total.toFixed(2)}`;
    document.getElementById('finalTotal').textContent = `¥${total.toFixed(2)}`;
}

function selectPayment(element, paymentType) {
    selectedPayment = paymentType;
    
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('active');
    });
    element.classList.add('active');
}

function submitOrder() {
    // 校验地址
    if (!selectedAddress) {
        showToast('请选择收货地址');
        return;
    }
    
    // 校验商品
    const checkoutItems = JSON.parse(sessionStorage.getItem('checkoutItems') || '[]');
    if (checkoutItems.length === 0) {
        showToast('没有要结算的商品');
        return;
    }
    
    // 模拟提交订单
    showToast('订单提交中...', 2000);
    
    setTimeout(() => {
        // 清空购物车中已结算的商品
        const checkoutIds = checkoutItems.map(item => item.cartKey);
        cart = cart.filter(item => !checkoutIds.includes(item.cartKey));
        saveCart();
        updateCartCount();
        
        // 清除结算数据
        sessionStorage.removeItem('checkoutItems');
        
        showToast('订单提交成功！', 3000);
        
        setTimeout(() => {
            location.href = 'index.html';
        }, 1500);
    }, 2000);
}

// 新增地址弹窗
function showAddAddressModal() {
    document.getElementById('addressModal').classList.add('active');
}

function closeAddAddressModal() {
    document.getElementById('addressModal').classList.remove('active');
}

function saveAddress(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const newAddress = {
        id: addresses.length + 1,
        name: formData.get('name') || '新用户',
        phone: formData.get('phone') || '138****0000',
        region: formData.get('region') || '北京市',
        detail: formData.get('detail') || '详细地址',
        isDefault: false
    };
    
    addresses.push(newAddress);
    
    closeAddAddressModal();
    loadAddresses();
    showToast('地址添加成功');
    form.reset();
}

// ==================== 登录/注册功能 ====================
function showLoginModal() {
    if (currentUser) {
        showToast(`已登录：${currentUser.username}`);
        return;
    }
    document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

function switchModalTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.modal-tab');
    
    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.getAll()[0]?.value || 'user';
    
    // 模拟登录
    currentUser = { username, token: 'mock_token' };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    closeLoginModal();
    checkUserLogin();
    showToast('登录成功');
}

function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const password = formData.getAll()[1]?.value;
    const confirmPassword = formData.getAll()[3]?.value;
    
    if (password !== confirmPassword) {
        showToast('两次密码输入不一致');
        return;
    }
    
    // 模拟注册
    showToast('注册成功，请登录');
    switchModalTab('login');
}

function sendCode() {
    showToast('验证码已发送');
}

function checkUserLogin() {
    const userText = document.getElementById('userText');
    if (currentUser && userText) {
        userText.textContent = currentUser.username;
    }
}

// ==================== 工具函数 ====================
// 提示弹窗
function showToast(message, duration = 3000) {
    // 移除已有的 toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, duration);
}

// 确认对话框
function confirm(message) {
    return window.confirm(message);
}

// 格式化日期
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
