import axiosInstance from './axios';

const api = {
	auth: {
		login: async (credentials) => {
			const response = await axiosInstance.post('/api/auth/login', credentials);
			return response.data;
		},
		register: async (userData) => {
			const response = await axiosInstance.post('/api/auth/register', userData);
			return response.data;
		},
		getMe: async () => {
			const response = await axiosInstance.get('/api/auth/me');
			return response.data;
		},
	},
	news: {
		getAll: async () => {
			const response = await axiosInstance.get('/api/news');
			return response.data;
		},
		create: async (newsData) => {
			const response = await axiosInstance.post('/api/news', newsData);
			return response.data;
		},
		uploadImage: async (file) => {
			const formData = new FormData();
			formData.append('file', file);
			const response = await axiosInstance.post('/api/news/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return response.data;
		},
	},
};

export default api;
