import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Posts } from '../types/api.types';

interface PostCardProps {
	post: Posts;
	onUpdate?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onUpdate }) => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isAuthor = user && (typeof post.author === 'string' ? post.author === user._id : post.author._id === user._id);

	const handlePublish = async () => {
		try {
			setLoading(true);
			setError(null);
			await api.posts.publish(post._id);
			if (onUpdate) {
				onUpdate();
			}
		} catch (err) {
			console.error('Ошибка при публикации поста:', err);
			setError('Ошибка при публикации поста');
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (!window.confirm('Вы уверены, что хотите удалить этот пост?')) {
			return;
		}

		try {
			setLoading(true);
			setError(null);
			await api.posts.delete(post._id);
			if (onUpdate) {
				onUpdate();
			}
		} catch (err) {
			console.error('Ошибка при удалении поста:', err);
			setError('Ошибка при удалении поста');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="post-card">
			<div className={`post-status ${post.status}`}>
				{post.status === 'published' ? 'Опубликовано' : 'Черновик'}
			</div>
			<h2>{post.title}</h2>
			<div className="post-meta">
				<span>Автор: {typeof post.author === 'string' ? post.author : post.author.username}</span>
				<span>Дата: {new Date(post.createdAt).toLocaleDateString()}</span>
			</div>
			{isAuthor && (
				<div className="post-actions">
					<Link to={`/edit/${post._id}`} className="edit-button">
						Редактировать
					</Link>
					<button
						className="publish-button"
						onClick={handlePublish}
						disabled={loading}
					>
						{loading ? 'Публикация...' : 'Опубликовать'}
					</button>
					<button
						className="delete-button"
						onClick={handleDelete}
						disabled={loading}
					>
						Удалить
					</button>
				</div>
			)}
			<div className="post-content">
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</div>
			{post.images.length > 0 && (
				<div className="post-images">
					{post.images.map((image: string, index: number) => (
						<img key={index} src={image} alt={`Изображение ${index + 1}`} />
					))}
				</div>
			)}
			{post.attachments.length > 0 && (
				<div className="post-attachments">
					{post.attachments.map((attachment: string, index: number) => (
						<a key={index} href={attachment} target="_blank" rel="noopener noreferrer">
							Приложение {index + 1}
						</a>
					))}
				</div>
			)}
			{error && <div className="error">{error}</div>}
		</div>
	);
}; 