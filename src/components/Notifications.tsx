import { useEffect, useState } from 'react';

interface Notification {
	id: number;
	message: string;
	type: 'success' | 'error' | 'info';
}

export const Notifications: React.FC = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	useEffect(() => {
		if (notifications.length > 0) {
			const timer = setTimeout(() => {
				setNotifications((prev) => prev.slice(1));
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [notifications]);

	return (
		<div className="notifications">
			{notifications.map((notification) => (
				<div
					key={notification.id}
					className={`notification notification-${notification.type}`}
				>
					{notification.message}
				</div>
			))}
		</div>
	);
}; 