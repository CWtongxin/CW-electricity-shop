# GitHub Personal Access Token 获取教程

## 步骤 1：进入开发者设置

1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 左侧菜单最下方 → **Developer settings**

## 步骤 2：创建 Token

1. 点击 **Personal access tokens** → **Tokens (classic)**
2. 点击右上角 **Generate new token** → **Generate new token (classic)**
3. 填写信息：
   - **Note**: `My Shop Token`（任意名称）
   - **Expiration**: `No expiration`（永久）
4. 勾选权限：
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (Update GitHub Action workflows)
5. 点击 **Generate token**

## 步骤 3：复制 Token

- 生成的 Token 格式：`ghp_xxxxxxxxxxxxxxxxxxxx`
- **立即复制！** 页面刷新后就看不到了
- 如果丢失，删除重新生成即可

## 步骤 4：在商店中使用

1. 访问您的商店首页
2. 首次访问会弹出提示框
3. 粘贴刚才复制的 Token
4. 点击确定

完成！现在您的数据会同步到 GitHub，实现云存储。

---

## 安全提示

- ⚠️ **不要分享 Token**！相当于您的密码
- ⚠️ Token 存储在浏览器本地，清除缓存会丢失
- ✅ 如需更换 Token，在浏览器控制台执行：
  ```javascript
  localStorage.removeItem('github_token');
  location.reload();
  ```
