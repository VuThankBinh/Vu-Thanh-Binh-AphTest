import axiosClient from "./interceptor";
import { mockCategories, mockProducts, mockFilterList } from "./mockData";

// Note: Đây là mock service, sẽ được thay thế bằng API calls thật khi phỏng vấn
const USE_MOCK_DATA = true; // Đổi thành false khi có API thật

const productService = {
  // GET /Category/GetListCategory
  getListCategory: async (lang = "en") => {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockCategories;
    }
    
    try {
      const response = await axiosClient.get("/Category/GetListCategory", {
        params: { lang }
      });
      return response;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // GET /Category/GetCategoryByUrl
  getCategoryByUrl: async (url, lang = "en") => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find category by URL
      let foundCategory = null;
      for (const cat of mockCategories) {
        if (cat.link === url) {
          foundCategory = cat;
          break;
        }
        // Check children
        if (cat.children && cat.children.length > 0) {
          const childCat = cat.children.find(c => c.link === url);
          if (childCat) {
            foundCategory = {
              ...childCat,
              filterList: mockFilterList
            };
            break;
          }
        }
      }
      
      if (foundCategory) {
        return {
          ...foundCategory,
          filterList: mockFilterList
        };
      }
      
      throw new Error("Category not found");
    }
    
    try {
      const response = await axiosClient.get("/Category/GetCategoryByUrl", {
        params: { lang, url }
      });
      return response;
    } catch (error) {
      console.error("Error fetching category by URL:", error);
      throw error;
    }
  },

  // GET /Product/GetProductByCategory
  getProductByCategory: async (categoryIds, page = 1, lang = "en") => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter products by category IDs
      const filteredProducts = mockProducts.filter(p => 
        categoryIds.includes(p.categoryId)
      );
      
      const pageSize = 9;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      
      return {
        items: paginatedProducts,
        totalCount: filteredProducts.length
      };
    }
    
    try {
      const response = await axiosClient.get("/Product/GetProductByCategory", {
        params: { 
          lang, 
          page,
          ids: categoryIds
        }
      });
      return response;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  // GET /Product/GetProductByUrl
  getProductByUrl: async (url, lang = "en") => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const product = mockProducts.find(p => p.slug === url);
      if (product) {
        return product;
      }
      
      throw new Error("Product not found");
    }
    
    try {
      const response = await axiosClient.get("/Product/GetProductByUrl", {
        params: { lang, url }
      });
      return response;
    } catch (error) {
      console.error("Error fetching product by URL:", error);
      throw error;
    }
  },

  // GET /Product/GetRelatedProducts
  getRelatedProducts: async (productId, lang = "en") => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get current product's category
      const currentProduct = mockProducts.find(p => p.id === productId);
      if (!currentProduct) return [];
      
      // Get other products from same category
      const relatedProducts = mockProducts
        .filter(p => p.categoryId === currentProduct.categoryId && p.id !== productId)
        .slice(0, 6); // Limit to 6 products
      
      return relatedProducts;
    }
    
    try {
      const response = await axiosClient.get("/Product/GetRelatedProducts", {
        params: { lang, id: productId }
      });
      return response;
    } catch (error) {
      console.error("Error fetching related products:", error);
      throw error;
    }
  },

  // GET /Product/SearchProducts
  searchProducts: async (query, lang = "en") => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const searchTerm = query.toLowerCase();
      const filteredProducts = mockProducts.filter(p => 
        p.prodName.toLowerCase().includes(searchTerm) ||
        p.shortDesc.toLowerCase().includes(searchTerm)
      );
      
      // Get unique categories from filtered products
      const categoryIds = [...new Set(filteredProducts.map(p => p.categoryId))];
      const categories = [];
      
      mockCategories.forEach(cat => {
        if (categoryIds.includes(cat.id)) {
          categories.push({ id: cat.id, categoryName: cat.categoryName });
        }
        if (cat.children) {
          cat.children.forEach(child => {
            if (categoryIds.includes(child.id)) {
              categories.push({ id: child.id, categoryName: child.categoryName });
            }
          });
        }
      });
      
      return {
        products: filteredProducts,
        categories: categories,
        filters: mockFilterList
      };
    }
    
    try {
      const response = await axiosClient.get("/Product/SearchProducts", {
        params: { lang, query }
      });
      return response;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },

  // POST /Product/FilterSearchProduct
  filterSearchProduct: async (textSearch, categories, page = 1, lang = "en") => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredProducts = [...mockProducts];
      
      // Filter by search text
      if (textSearch) {
        const searchTerm = textSearch.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.prodName.toLowerCase().includes(searchTerm) ||
          p.shortDesc.toLowerCase().includes(searchTerm)
        );
      }
      
      // Filter by categories
      if (categories && categories.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
          categories.includes(p.categoryId)
        );
      }
      
      const pageSize = 9;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      
      return {
        items: paginatedProducts,
        totalCount: filteredProducts.length
      };
    }
    
    try {
      const response = await axiosClient.post("/Product/FilterSearchProduct", {
        lang,
        textSearch,
        categories,
        page
      });
      return response;
    } catch (error) {
      console.error("Error filtering products:", error);
      throw error;
    }
  }
};

export default productService;

