import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_BASE } from '../config';

export default function useNotifications() {
	const [list, setList] = useState([]);
	useEffect(() => {
		const socket = io(API_BASE);
		socket.on('newsEvent', (data) => {
			setList((l) => [data, ...l]);
		});
		return () => socket.disconnect();
	}, []);
	return list;
}
