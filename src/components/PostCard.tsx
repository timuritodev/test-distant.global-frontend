import { News } from '../types/api';

interface PostCardProps {
	post: News;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
	return (
		<div className="post-card">
			<div className={`post-status ${post.status}`}>
				{post.status === 'published' ? 'Опубликовано' : 'Черновик'}
			</div>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
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
			<div className="post-meta">
				<span>Автор: {post.author.username}</span>
				<span>Дата: {new Date(post.createdAt).toLocaleDateString()}</span>
			</div>
		</div>
	);
}; 