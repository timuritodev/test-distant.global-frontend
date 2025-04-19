import { API_BASE } from '../config';
import {
	AuthResponse,
	LoginCredentials,
	News,
	NewsCreateData,
	RegisterData,
	User,
} from '../types/api';

const api = {
	auth: {
		login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
			const response = await fetch(`${API_BASE}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			});
			return response.json();
		},
		register: async (userData: RegisterData): Promise<AuthResponse> => {
			const response = await fetch(`${API_BASE}/api/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userData),
			});
			return response.json();
		},
		getMe: async (token: string): Promise<User> => {
			const response = await fetch(`${API_BASE}/api/auth/me`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response.json();
		},
	},
	news: {
		getAll: async (token?: string): Promise<News[]> => {
			const headers: HeadersInit = {};
			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}
			const response = await fetch(`${API_BASE}/api/news`, {
				headers,
			});
			return response.json();
		},
		create: async (newsData: NewsCreateData, token: string): Promise<News> => {
			const response = await fetch(`${API_BASE}/api/news`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newsData),
			});
			return response.json();
		},
		uploadImage: async (file: File, token: string): Promise<{ url: string }> => {
			const formData = new FormData();
			formData.append('file', file);
			const response = await fetch(`${API_BASE}/api/news/upload`, {
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
				body: formData,
			});
			return response.json();
		},
	},
};

export default api; 