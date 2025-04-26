import { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';

export const NotificationBell: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

	const toggleNotifications = () => {
		setIsOpen(!isOpen);
		if (!isOpen && unreadCount > 0) {
			markAllAsRead();
		}
	};

	return (
		<div className="notification-container">
			<button className="notification-bell" onClick={toggleNotifications}>
				🔔
				{unreadCount > 0 && <span className="badge">{unreadCount}</span>}
			</button>
			{isOpen && (
				<div className="notification-dropdown">
					<div className="notification-header">
						<h3>Уведомления</h3>
						{notifications.length > 0 && (
							<button onClick={markAllAsRead}>Отметить все как прочитанные</button>
						)}
					</div>
					{notifications.length === 0 ? (
						<div className="no-notifications">Нет уведомлений</div>
					) : (
						<div className="notification-list">
							{notifications.map(notification => (
								<div
									key={notification.id}
									className={`notification-item ${notification.read ? 'read' : 'unread'}`}
									onClick={() => markAsRead(notification.id)}
								>
									<div className="notification-message">{notification.message}</div>
									<div className="notification-time">
										{new Date(notification.createdAt).toLocaleString()}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}; 