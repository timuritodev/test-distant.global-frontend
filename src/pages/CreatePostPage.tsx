import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Editor } from '../components/Editor';
import { Preview } from '../components/Preview';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export const CreatePostPage: React.FC = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { token } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!token) {
			setError('Требуется авторизация');
			return;
		}
		try {
			setLoading(true);
			setError(null);
			await api.news.create({ title, content }, token);
			navigate('/');
		} catch (err) {
			console.error('Ошибка при создании поста:', err);
			setError('Ошибка при создании поста');
		} finally {
			setLoading(false);
		}
	};

	if (!token) {
		return (
			<div className="create-post">
				<p>Для того чтобы создать пост, необходимо авторизоваться</p>
				<Link to="/login">Авторизоваться</Link>
			</div>
		);
	}

	return (
		<div className="create-post">
			<h2>Создать новый пост</h2>
			{error && <div className="error">{error}</div>}
			<form onSubmit={handleSubmit}>
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
				<div className="editor-preview">
					<Editor value={content} onChange={setContent} />
					<Preview content={content} />
				</div>
				<button type="submit" disabled={loading}>
					{loading ? 'Публикация...' : 'Опубликовать'}
				</button>
			</form>
		</div>
	);
}; 