import {
	AuthResponse,
	LoginCredentials,
	Posts,
	PostsCreateData,
	RegisterData,
	User,
} from '../types/api.types';
import axiosInstance from './axios';

const api = {
	auth: {
		login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
			const response = await axiosInstance.post<AuthResponse>('/api/auth/login', credentials);
			return response.data;
		},
		register: async (userData: RegisterData): Promise<AuthResponse> => {
			const response = await axiosInstance.post<AuthResponse>('/api/auth/register', userData);
			return response.data;
		},
		getMe: async (): Promise<User> => {
			const response = await axiosInstance.get<User>('/api/auth/me');
			return response.data;
		},
	},
	news: {
		getAll: async (): Promise<Posts[]> => {
			const response = await axiosInstance.get<Posts[]>('/api/news');
			return response.data;
		},
		create: async (newsData: PostsCreateData): Promise<Posts> => {
			const response = await axiosInstance.post<Posts>('/api/news', newsData);
			return response.data;
		},
		uploadImage: async (file: File): Promise<{ url: string }> => {
			const formData = new FormData();
			formData.append('file', file);
			const response = await axiosInstance.post<{ url: string }>('/api/news/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		},
	},
};

export default api;
