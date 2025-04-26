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
		create: async (formData: FormData): Promise<Posts> => {
			const response = await axiosInstance.post<Posts>('/api/news', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		},
		edit: async (id: string, data: Partial<PostsCreateData>): Promise<Posts> => {
			const response = await axiosInstance.patch<Posts>(`/api/news/${id}`, data);
			return response.data;
		},
		delete: async (id: string): Promise<void> => {
			await axiosInstance.delete(`/api/news/${id}`);
		},
		publish: async (id: string): Promise<Posts> => {
			const response = await axiosInstance.post<Posts>(`/api/news/${id}/publish`);
			return response.data;
		},
		getById: async (id: string): Promise<Posts> => {
			const response = await axiosInstance.get<Posts>(`/api/news/${id}`);
			return response.data;
		},
		getMyNews: async (): Promise<Posts[]> => {
			const response = await axiosInstance.get<Posts[]>('/api/news/my');
			return response.data;
		}
	},
};

export default api;
