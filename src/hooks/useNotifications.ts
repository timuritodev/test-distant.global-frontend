import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE } from '../config';

export default function useNotifications() {
	const [list, setList] = useState<Notification[]>([]);
	useEffect(() => {
		const socket = io(API_BASE);
		socket.on('postsEvent', (data: Notification) => {
			setList(prev => [data, ...prev]);
		});
		const cleanup = () => {
			socket.disconnect();
		};
		return cleanup;
	}, []);

	return list;
}
