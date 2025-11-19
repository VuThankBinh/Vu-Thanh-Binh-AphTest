/**
 * Utility functions for handling image URLs
 */

// Base URL của API (dùng chung với API base URL)
const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://192.168.199.2:1416";

/**
 * Xử lý image URL từ API
 * Nếu URL đã là full URL (bắt đầu bằng http/https) thì giữ nguyên
 * Nếu là relative path (bắt đầu bằng /) thì thêm API base URL
 * @param {string} imageUrl - URL từ API (ví dụ: /Upload/20250509/...)
 * @returns {string} - Full URL hoặc null
 */
export const getImageUrl = (imageUrl) => {
  // Kiểm tra null, undefined, hoặc không phải string
  if (!imageUrl || typeof imageUrl !== "string") {
    return null;
  }

  // Loại bỏ khoảng trắng thừa
  const trimmedUrl = imageUrl.trim();
  
  if (!trimmedUrl) {
    return null;
  }

  // Nếu đã là full URL
  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl;
  }

  // Nếu là relative path (bắt đầu bằng /), thêm API base URL
  if (trimmedUrl.startsWith("/")) {
    return `${API_BASE_URL}${trimmedUrl}`;
  }

  // Trường hợp khác, trả về như cũ
  return trimmedUrl;
};

/**
 * Lấy image URL với fallback
 * @param {string} imageUrl - URL từ API
 * @param {string} fallback - URL fallback nếu imageUrl null/empty
 * @returns {string}
 */
export const getImageUrlWithFallback = (imageUrl, fallback = "/images/defaultImage.png") => {
  const url = getImageUrl(imageUrl);
  return url || fallback;
};

