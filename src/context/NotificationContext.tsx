import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface Notification {
	id: string;
	message: string;
	createdAt: string;
	read: boolean;
	newsId?: string;
}

interface NotificationContextType {
	notifications: Notification[];
	unreadCount: number;
	markAsRead: (id: string) => void;
	markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [_socket, setSocket] = useState<Socket | null>(null);
	const { token } = useAuth();

	useEffect(() => {
		if (!token) return;

		const newSocket = io('http://localhost:5000', {
			path: '/socket.io/',
			transports: ['websocket', 'polling'],
			auth: {
				token,
			},
			withCredentials: true,
		});

		newSocket.on('connect', () => {
			console.log('Connected to WebSocket');
		});

		newSocket.on('connect_error', (error) => {
			console.error('WebSocket connection error:', error);
		});

		newSocket.on('notification', (notification: Notification) => {
			setNotifications(prev => [notification, ...prev]);
		});

		setSocket(newSocket);

		return () => {
			newSocket.close();
		};
	}, [token]);

	const markAsRead = (id: string) => {
		setNotifications(prev =>
			prev.map(notification =>
				notification.id === id ? { ...notification, read: true } : notification
			)
		);
	};

	const markAllAsRead = () => {
		setNotifications(prev =>
			prev.map(notification => ({ ...notification, read: true }))
		);
	};

	const unreadCount = notifications.filter(n => !n.read).length;

	return (
		<NotificationContext.Provider
			value={{
				notifications,
				unreadCount,
				markAsRead,
				markAllAsRead,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotifications = () => {
	const context = useContext(NotificationContext);
	if (context === undefined) {
		throw new Error('useNotifications must be used within a NotificationProvider');
	}
	return context;
}; 