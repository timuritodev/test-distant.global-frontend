import api from '@/api/api';
import { useEffect, useState } from 'react';
import { PostCard } from '../components/PostCard';
import { Posts } from '../types/api.types';

export const HomePage: React.FC = () => {
	const [posts, setPosts] = useState<Posts[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadPosts();
	}, []);

	const loadPosts = async () => {
		try {
			setLoading(true);
			const data = await api.posts.getAll();
			setPosts(data);
			setError(null);
		} catch (err) {
			setError('Ошибка при загрузке новостей');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="container">
			<h1>Новости</h1>
			<div className="posts-grid">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} onUpdate={loadPosts} />
				))}
			</div>
		</div>
	);
} 