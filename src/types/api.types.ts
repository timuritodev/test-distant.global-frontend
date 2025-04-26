export interface User {
	_id: string;
	username: string;
	email: string;
}

export interface Posts {
	_id: string;
	title: string;
	content: string;
	author: User | string;
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

export interface PostsCreateData {
	title: string;
	content: string;
	images?: string[];
	attachments?: string[];
	publishAt?: string;
}

export interface Notification {
	id: string;
	message: string;
	createdAt: string;
}
