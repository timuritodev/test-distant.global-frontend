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
	posts: {
		getAll: async (): Promise<Posts[]> => {
			const response = await axiosInstance.get<Posts[]>('/api/posts');
			return response.data;
		},
		create: async (formData: FormData): Promise<Posts> => {
			const response = await axiosInstance.post<Posts>('/api/posts', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		},
		edit: async (id: string, data: Partial<PostsCreateData>): Promise<Posts> => {
			const response = await axiosInstance.patch<Posts>(`/api/posts/${id}`, data);
			return response.data;
		},
		delete: async (id: string): Promise<void> => {
			await axiosInstance.delete(`/api/posts/${id}`);
		},
		publish: async (id: string): Promise<Posts> => {
			const response = await axiosInstance.post<Posts>(`/api/posts/${id}/publish`);
			return response.data;
		},
		getById: async (id: string): Promise<Posts> => {
			const response = await axiosInstance.get<Posts>(`/api/posts/${id}`);
			return response.data;
		},
		getMyPosts: async (): Promise<Posts[]> => {
			const response = await axiosInstance.get<Posts[]>('/api/posts/my');
			return response.data;
		}
	},
};

export default api;
