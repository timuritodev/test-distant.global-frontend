import api from '@/api/api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Editor } from '../components/Editor';
import { useAuth } from '../context/AuthContext';

export const CreatePostPage: React.FC = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { token } = useAuth();

	const handleSubmit = async (formData: FormData) => {
		if (!token) {
			setError('Требуется авторизация');
			return;
		}
		try {
			setLoading(true);
			setError(null);
			formData.append('title', title);
			await api.posts.create(formData);
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