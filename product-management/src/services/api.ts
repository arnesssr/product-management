import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${import.meta.env.VITE_API_KEY}`;
  return config;
});

export const pmsApi = {
  async publishProduct(data: any) {
    const response = await api.post('/products', data);
    return response.data;
  },
  
  async updateProduct(id: string, data: any) {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },
  
  async unpublishProduct(id: string) {
    await api.delete(`/products/${id}`);
  },

  async syncInventory(data: any) {
    const response = await api.post('/inventory/sync', data);
    return response.data;
  }
};
