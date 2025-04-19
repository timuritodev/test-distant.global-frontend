import { useEffect, useState } from 'react';
import { PostCard } from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { News } from '../types/api';

export const HomePage: React.FC = () => {
	const { token } = useAuth();
	const [posts, setPosts] = useState<News[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadNews();
	}, [token]);

	const loadNews = async () => {
		try {
			setLoading(true);
			const data = await api.news.getAll(token || undefined);
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
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</div>
	);
} 