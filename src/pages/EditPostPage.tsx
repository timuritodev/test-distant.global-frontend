import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import { Editor } from '../components/Editor';
import { useAuth } from '../context/AuthContext';
import { Posts } from '../types/api.types';

export const EditPostPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [post, setPost] = useState<Posts | null>(null);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { token } = useAuth();

	useEffect(() => {
		const fetchPost = async () => {
			if (!id) return;
			try {
				const data = await api.posts.getById(id);
				setPost(data);
				setTitle(data.title);
				setContent(data.content);
			} catch (err) {
				setError('Не удалось загрузить статью');
				console.error('Ошибка при загрузке статьи:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [id]);

	const handleSubmit = async () => {
		if (!token || !id) {
			setError('Требуется авторизация');
			return;
		}
		try {
			setLoading(true);
			setError(null);
			await api.posts.edit(id, {
				title,
				content,
			});
			navigate('/');
		} catch (err) {
			console.error('Ошибка при редактировании статьи:', err);
			setError('Ошибка при редактировании статьи');
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div className="error">{error}</div>;
	}

	if (!post) {
		return <div>Статья не найдена</div>;
	}

	return (
		<div className="create-post">
			<h2>Редактирование статьи</h2>
			{error && <div className="error">{error}</div>}
			<div className="form-group">
				<label htmlFor="title">Заголовок</label>
				<input
					id="title"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					disabled={loading}
				/>
			</div>
			<Editor
				value={content}
				onChange={setContent}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}; 