export interface User {
	_id: string;
	username: string;
	email: string;
}

export interface News {
	_id: string;
	title: string;
	content: string;
	author: User;
	status: 'published' | 'draft';
	images: string[];
	attachments: string[];
	createdAt: string;
	updatedAt: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	username: string;
	email: string;
	password: string;
}

export interface NewsCreateData {
	title: string;
	content: string;
	images?: string[];
	attachments?: string[];
} 