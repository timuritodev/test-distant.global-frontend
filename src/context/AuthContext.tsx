import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User } from '../types/api.types';

export interface AuthContextType {
	user: User | null;
	token: string | null;
	loading: boolean;
	login: (token: string, user: User) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const savedUser = localStorage.getItem('user');
		if (savedUser) {
			setUser(JSON.parse(savedUser));
		}
		setLoading(false);
	}, []);

	const login = (newToken: string, newUser: User) => {
		localStorage.setItem('token', newToken);
		localStorage.setItem('user', JSON.stringify(newUser));
		setToken(newToken);
		setUser(newUser);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}; 