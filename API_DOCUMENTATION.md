# 📚 TÀI LIỆU API - E-CATALOG PRODUCT INTRODUCTION

## 🔧 Cấu hình Base URL

**Base URL**: `http://192.168.199.2:1416`  
**API Path**: `/api/services/app`  
**Full API Base URL**: `http://192.168.199.2:1416/api/services/app`

### Cấu hình trong code:
- **File**: `src/services/interceptor.jsx`
- **Base URL**: `http://192.168.199.2:1416/api/services/app`
- **Image Base URL**: `http://192.168.199.2:1416` (cho images, không có `/api/services/app`)

---

## 📋 DANH SÁCH API ENDPOINTS

### 1. 📂 GET /Category/GetListCategory

**Mô tả**: Lấy danh sách tất cả các danh mục sản phẩm (categories)

**Endpoint**: 
```
GET /api/services/app/Category/GetListCategory
```

**Query Parameters**:
| Parameter | Type | Required | Default | Mô tả |
|-----------|------|----------|---------|-------|
| `lang` | string | No | `"en"` | Ngôn ngữ (en, vi, ja...) |

**Request Example**:
```javascript
// Trong productService.js
const response = await axiosClient.get("/Category/GetListCategory", {
  params: { lang: "en" }
});
```

**Response Format** (ABP Framework):
```json
{
  "result": [
    {
      "id": 20,
      "parentId": null,
      "menuShow": null,
      "link": "raw-materials",
      "thumb": "/Upload/20250325/20250325100355_a888aa61-42b1-474e-a5c4-34ea113b13cc.webp",
      "categoryName": "Raw Materials",
      "shortDesc": null,
      "description": null,
      "filterList": null,
      "children": [
        {
          "id": 21,
          "parentId": 20,
          "link": "plastic-resins",
          "categoryName": "Plastic Resins",
          "thumb": "/Upload/...",
          "children": []
        }
      ]
    }
  ],
  "success": true,
  "error": null
}
```

**Response Data Structure**:
```typescript
interface Category {
  id: number;
  parentId: number | null;
  menuShow: any;
  link: string;              // URL slug cho category
  thumb: string;             // Relative path: /Upload/...
  categoryName: string;
  shortDesc: string | null;
  description: string | null;
  filterList: any | null;
  children: Category[];       // Danh sách category con
}
```

**Sử dụng trong code**:
- **File**: `src/pages/all-product.jsx`
- **Function**: `fetchCategories()`
- **Service**: `productService.getListCategory("en")`

**Lưu ý**:
- Response được xử lý bởi interceptor: `response.data.result` → trả về mảng categories
- Image URL cần thêm base URL: `/Upload/...` → `http://192.168.199.2:1416/Upload/...`

---

### 2. 📂 GET /Category/GetCategoryByUrl

**Mô tả**: Lấy thông tin chi tiết của một category theo URL slug

**Endpoint**: 
```
GET /api/services/app/Category/GetCategoryByUrl
```

**Query Parameters**:
| Parameter | Type | Required | Mô tả |
|-----------|------|----------|-------|
| `lang` | string | No | Ngôn ngữ (mặc định: "en") |
| `url` | string | Yes | URL slug của category (ví dụ: "raw-materials") |

**Request Example**:
```javascript
// Trong productService.js
const response = await axiosClient.get("/Category/GetCategoryByUrl", {
  params: { lang: "en", url: "raw-materials" }
});
```

**Response Format**:
```json
{
  "result": {
    "id": 20,
    "thumb": "/Upload/20250325/...",
    "categoryName": "Raw Materials",
    "description": "...",
    "children": [
      {
        "id": 21,
        "categoryName": "Plastic Resins",
        "link": "plastic-resins",
        ...
      }
    ],
    "filterList": [
      {
        "id": 1,
        "name": "Filter Name",
        "options": [...]
      }
    ]
  },
  "success": true
}
```

**Response Data Structure**:
```typescript
interface CategoryDetail {
  id: number;
  thumb: string;
  categoryName: string;
  description: string | null;
  children: Category[];       // Danh sách category con
  filterList: Filter[] | null; // Danh sách bộ lọc
}
```

**Sử dụng trong code**:
- **File**: `src/pages/category.jsx`
- **Function**: `fetchCategoryData()`
- **Service**: `productService.getCategoryByUrl(url, "en")`

**Lưu ý**:
- URL parameter lấy từ route: `/category/:url` → `url = "raw-materials"`

---

### 3. 📦 GET /Product/GetProductByCategory

**Mô tả**: Lấy danh sách sản phẩm theo category IDs với phân trang

**Endpoint**: 
```
GET /api/services/app/Product/GetProductByCategory
```

**Query Parameters**:
| Parameter | Type | Required | Mô tả |
|-----------|------|----------|-------|
| `lang` | string | No | Ngôn ngữ (mặc định: "en") |
| `page` | number | No | Số trang (mặc định: 1) |
| `ids` | number[] | Yes | Mảng các category ID (bao gồm category hiện tại và các category con) |

**Request Example**:
```javascript
// Trong productService.js
const response = await axiosClient.get("/Product/GetProductByCategory", {
  params: { 
    lang: "en", 
    page: 1,
    ids: [20, 21, 22, 23]  // Category ID và các children IDs
  }
});
```

**Response Format**:
```json
{
  "result": {
    "items": [
      {
        "id": 24,
        "thumb": "/Upload/20250401/...",
        "prodName": "SPC Flooring - Wood Looking",
        "slug": "spc-flooring-wood",
        "sku": "SPC-001"
      }
    ],
    "totalCount": 50
  },
  "success": true
}
```

**Response Data Structure**:
```typescript
interface ProductListResponse {
  items: Product[];
  totalCount: number;
}

interface Product {
  id: number;
  thumb: string;           // Relative path: /Upload/...
  prodName: string;
  slug: string;            // URL slug cho product
  sku: string | null;
}
```

**Sử dụng trong code**:
- **File**: `src/pages/category.jsx`
- **Function**: `fetchProducts(page)`
- **Service**: `productService.getProductByCategory(categoryIds, page, "en")`

**Lưu ý**:
- `ids` phải bao gồm ID của category hiện tại và tất cả category con
- Pagination: mỗi trang thường có 9 sản phẩm
- Response trả về `{ items: [], totalCount: 0 }` nếu có lỗi

---

### 4. 📦 GET /Product/GetProductByUrl

**Mô tả**: Lấy thông tin chi tiết của một sản phẩm theo URL slug

**Endpoint**: 
```
GET /api/services/app/Product/GetProductByUrl
```

**Query Parameters**:
| Parameter | Type | Required | Mô tả |
|-----------|------|----------|-------|
| `lang` | string | No | Ngôn ngữ (mặc định: "en") |
| `url` | string | Yes | URL slug của sản phẩm (ví dụ: "spc-flooring-wood") |

**Request Example**:
```javascript
// Trong productService.js
const response = await axiosClient.get("/Product/GetProductByUrl", {
  params: { lang: "en", url: "spc-flooring-wood" }
});
```

**Response Format**:
```json
{
  "result": {
    "id": 24,
    "sku": null,
    "thumb": "/Upload/20250401/20250401160906_0c93cb07-23c0-49c6-ba86-fa25704867dd.png",
    "prodName": "SPC Flooring - Wood Looking",
    "link": null,
    "shortDesc": "SPC Flooring has the newest generation...",
    "description": "<p><strong>Dimension</strong>...</p>",
    "specification": null,
    "dataSheet": "/Upload/Datasheet/",
    "seoTitle": null,
    "metaDescription": null,
    "media": [
      {
        "fileName": "20250401160906_c559792b-9976-4e55-8a42-1dc728f73747.png",
        "altText": null,
        "caption": null,
        "path": "/Upload/20250401/20250401160906_c559792b-9976-4e55-8a42-1dc728f73747.png"
      }
    ]
  },
  "success": true
}
```

**Response Data Structure**:
```typescript
interface ProductDetail {
  id: number;
  sku: string | null;
  thumb: string;                    // Relative path: /Upload/...
  prodName: string;
  link: string | null;
  shortDesc: string | null;
  description: string | null;       // HTML content
  specification: string | null;      // Có thể là string hoặc array
  dataSheet: string | null;         // Relative path: /Upload/Datasheet/...
  seoTitle: string | null;
  metaDescription: string | null;
  media: MediaItem[];               // Array các ảnh sản phẩm
}

interface MediaItem {
  fileName: string;
  altText: string | null;
  caption: string | null;
  path: string;                     // Relative path: /Upload/...
}
```

**Sử dụng trong code**:
- **File**: `src/pages/product-details.jsx`
- **Function**: `fetchProductData()`
- **Service**: `productService.getProductByUrl(url, "en")`

**Lưu ý**:
- `media` là array các object với `path` property, không phải array string
- `dataSheet` cần thêm base URL để download
- `description` có thể chứa HTML

---

### 5. 🔗 GET /Product/GetRelatedProducts

**Mô tả**: Lấy danh sách sản phẩm liên quan (thường là cùng category)

**Endpoint**: 
```
GET /api/services/app/Product/GetRelatedProducts
```

**Query Parameters**:
| Parameter | Type | Required | Mô tả |
|-----------|------|----------|-------|
| `lang` | string | No | Ngôn ngữ (mặc định: "en") |
| `id` | number | Yes | ID của sản phẩm hiện tại |

**Request Example**:
```javascript
// Trong productService.js
const response = await axiosClient.get("/Product/GetRelatedProducts", {
  params: { lang: "en", id: 24 }
});
```

**Response Format**:
```json
{
  "result": [
    {
      "id": 25,
      "thumb": "/Upload/...",
      "prodName": "Related Product Name",
      "slug": "related-product-slug",
      "sku": "REL-001"
    }
  ],
  "success": true
}
```

**Response Data Structure**:
```typescript
interface RelatedProduct {
  id: number;
  thumb: string;
  prodName: string;
  slug: string;
  sku: string | null;
}
```

**Sử dụng trong code**:
- **File**: `src/pages/product-details.jsx`
- **Function**: `fetchProductData()` (sau khi fetch product chính)
- **Service**: `productService.getRelatedProducts(productId, "en")`

**Lưu ý**:
- Thường hiển thị tối đa 6 sản phẩm liên quan
- Response trả về mảng rỗng `[]` nếu có lỗi

---

### 6. 🔍 GET /Product/SearchProducts

**Mô tả**: Tìm kiếm sản phẩm theo từ khóa

**Endpoint**: 
```
GET /api/services/app/Product/SearchProducts
```

**Query Parameters**:
| Parameter | Type | Required | Mô tả |
|-----------|------|----------|-------|
| `lang` | string | No | Ngôn ngữ (mặc định: "en") |
| `query` | string | Yes | Từ khóa tìm kiếm |

**Request Example**:
```javascript
// Trong productService.js
const response = await axiosClient.get("/Product/SearchProducts", {
  params: { lang: "en", query: "flooring" }
});
```

**Response Format**:
```json
{
  "result": {
    "products": [
      {
        "id": 24,
        "thumb": "/Upload/...",
        "prodName": "SPC Flooring",
        "slug": "spc-flooring-wood",
        "sku": "SPC-001"
      }
    ],
    "categories": [
      {
        "id": 20,
        "categoryName": "Raw Materials"
      }
    ],
    "filters": [
      {
        "id": 1,
        "name": "Filter Name",
        "options": [...]
      }
    ]
  },
  "success": true
}
```

**Response Data Structure**:
```typescript
interface SearchResponse {
  products: Product[];
  categories: Category[];      // Categories chứa sản phẩm tìm được
  filters: Filter[];          // Bộ lọc để filter thêm
}
```

**Sử dụng trong code**:
- **File**: `src/pages/search.jsx`
- **Service**: `productService.searchProducts(query, "en")`

**Lưu ý**:
- Response trả về `{ products: [], categories: [], filters: [] }` nếu có lỗi

---

### 7. 🔍 POST /Product/FilterSearchProduct

**Mô tả**: Lọc và tìm kiếm sản phẩm với nhiều tiêu chí (text search, categories, pagination)

**Endpoint**: 
```
POST /api/services/app/Product/FilterSearchProduct
```

**Request Body**:
```json
{
  "lang": "en",
  "textSearch": "flooring",
  "categories": [20, 21, 22],
  "page": 1
}
```

**Body Parameters**:
| Parameter | Type | Required | Mô tả |
|-----------|------|----------|-------|
| `lang` | string | No | Ngôn ngữ (mặc định: "en") |
| `textSearch` | string | No | Từ khóa tìm kiếm (có thể null/empty) |
| `categories` | number[] | No | Mảng category IDs để lọc (có thể null/empty) |
| `page` | number | No | Số trang (mặc định: 1) |

**Request Example**:
```javascript
// Trong productService.js
const response = await axiosClient.post("/Product/FilterSearchProduct", {
  lang: "en",
  textSearch: "flooring",
  categories: [20, 21],
  page: 1
});
```

**Response Format**:
```json
{
  "result": {
    "items": [
      {
        "id": 24,
        "thumb": "/Upload/...",
        "prodName": "SPC Flooring",
        "slug": "spc-flooring-wood",
        "sku": "SPC-001"
      }
    ],
    "totalCount": 15
  },
  "success": true
}
```

**Response Data Structure**:
```typescript
interface FilterSearchResponse {
  items: Product[];
  totalCount: number;
}
```

**Sử dụng trong code**:
- **File**: `src/pages/search.jsx`, `src/pages/category.jsx`
- **Service**: `productService.filterSearchProduct(textSearch, categories, page, "en")`

**Lưu ý**:
- Có thể chỉ dùng `textSearch` hoặc chỉ `categories`, hoặc cả hai
- Response trả về `{ items: [], totalCount: 0 }` nếu có lỗi

---

## 🔐 Authentication

### Token Header
Tất cả API requests tự động thêm token vào header:
```
Authorization: Bearer <token>
```

### Token Source
- **Cookie name**: `Abp.AuthToken`
- **Auto add**: Tự động thêm bởi `interceptor.jsx`
- **Format**: Bearer token (tự động thêm prefix "Bearer " nếu chưa có)

### Xử lý 401 (Unauthorized)
- Tự động xóa token
- Redirect về `/login` sau 1 giây
- Hiển thị thông báo lỗi

---

## 📸 Xử lý Image URLs

### Image Base URL
- **Base URL**: `http://192.168.199.2:1416`
- **Utility**: `src/utils/imageUtils.js`

### Format Image URLs từ API
API trả về relative paths:
```
/Upload/20250401/20250401160906_0c93cb07-23c0-49c6-ba86-fa25704867dd.png
```

### Convert sang Full URL
```javascript
import { getImageUrlWithFallback } from "../utils/imageUtils";

// Tự động convert
const fullUrl = getImageUrlWithFallback("/Upload/...");
// → http://192.168.199.2:1416/Upload/...
```

### Media Array Format
```javascript
// API trả về:
media: [
  {
    fileName: "...",
    path: "/Upload/...",
    altText: null
  }
]

// Code xử lý:
const imageUrl = typeof img === "string" 
  ? img 
  : (img?.path || img?.fileName || img);
```

---

## 🔄 Response Interceptor

### Xử lý ABP Framework Response
File: `src/services/interceptor.jsx`

**Response Format**:
```json
{
  "result": {...},      // Data thực tế
  "success": true,
  "error": null,
  "targetUrl": null,
  "unAuthorizedRequest": false,
  "__abp": true
}
```

**Interceptor tự động**:
- Trả về `response.data.result` thay vì toàn bộ response
- Xử lý error messages
- Xử lý 401 (Unauthorized)

---

## 📝 Cách sử dụng trong code

### 1. Import service
```javascript
import productService from "../services/productService";
```

### 2. Gọi API
```javascript
// Lấy danh sách categories
const categories = await productService.getListCategory("en");

// Lấy category theo URL
const category = await productService.getCategoryByUrl("raw-materials", "en");

// Lấy sản phẩm theo category
const { items, totalCount } = await productService.getProductByCategory(
  [20, 21, 22], 
  1, 
  "en"
);

// Lấy chi tiết sản phẩm
const product = await productService.getProductByUrl("spc-flooring-wood", "en");

// Tìm kiếm
const { products, categories, filters } = await productService.searchProducts(
  "flooring", 
  "en"
);
```

### 3. Error Handling
```javascript
try {
  const data = await productService.getListCategory("en");
  // Xử lý data
} catch (error) {
  console.error("Error:", error);
  // Service đã xử lý và trả về giá trị mặc định (mảng rỗng, object rỗng...)
}
```

---

## 🎯 Tóm tắt

| API | Method | Endpoint | Sử dụng trong |
|-----|--------|----------|---------------|
| GetListCategory | GET | `/Category/GetListCategory` | `all-product.jsx` |
| GetCategoryByUrl | GET | `/Category/GetCategoryByUrl` | `category.jsx` |
| GetProductByCategory | GET | `/Product/GetProductByCategory` | `category.jsx` |
| GetProductByUrl | GET | `/Product/GetProductByUrl` | `product-details.jsx` |
| GetRelatedProducts | GET | `/Product/GetRelatedProducts` | `product-details.jsx` |
| SearchProducts | GET | `/Product/SearchProducts` | `search.jsx` |
| FilterSearchProduct | POST | `/Product/FilterSearchProduct` | `search.jsx`, `category.jsx` |

---

## ⚠️ Lưu ý quan trọng

1. **Base URL**: Tất cả endpoints đều có prefix `/api/services/app`
2. **Response Format**: Tất cả response đều có wrapper ABP, interceptor tự động lấy `result`
3. **Image URLs**: Luôn là relative paths, cần thêm base URL
4. **Error Handling**: Service tự động trả về giá trị mặc định thay vì throw error
5. **Token**: Tự động thêm vào mọi request qua interceptor
6. **Media Array**: Là array objects với `path` property, không phải array strings

