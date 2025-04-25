import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface EditorProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit?: (formData: FormData) => Promise<void>;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange, onSubmit }) => {
	const imageInputRef = useRef<HTMLInputElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
	const [selectedAttachments, setSelectedAttachments] = React.useState<File[]>([]);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) return;
		const files = Array.from(e.target.files);
		setSelectedImages(prev => [...prev, ...files]);
	};

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) return;
		const files = Array.from(e.target.files);
		setSelectedAttachments(prev => [...prev, ...files]);
	};

	const insertMarkdown = (template: string) => {
		const textarea = document.querySelector('textarea');
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = value.substring(start, end);
		const newText = value.substring(0, start) +
			template.replace('$1', selectedText) +
			value.substring(end);
		onChange(newText);
	};

	const handleSubmit = async () => {
		if (!onSubmit) return;

		const formData = new FormData();
		formData.append('content', value);

		selectedImages.forEach((file) => {
			formData.append('images', file);
		});

		selectedAttachments.forEach((file) => {
			formData.append('attachments', file);
		});

		try {
			await onSubmit(formData);
			setSelectedImages([]);
			setSelectedAttachments([]);
		} catch (err) {
			console.error('Ошибка при создании новости:', err);
			throw err;
		}
	};

	return (
		<div className="editor">
			<div className="editor-toolbar">
				<button type="button" onClick={() => insertMarkdown('**$1**')}>B</button>
				<button type="button" onClick={() => insertMarkdown('*$1*')}>I</button>
				<button type="button" onClick={() => insertMarkdown('# $1')}>H1</button>
				<button type="button" onClick={() => insertMarkdown('## $1')}>H2</button>
				<button type="button" onClick={() => insertMarkdown('> $1')}>Quote</button>
				<button type="button" onClick={() => insertMarkdown('```\n$1\n```')}>Code</button>
				<button type="button" onClick={() => imageInputRef.current?.click()}>Image</button>
				<button type="button" onClick={() => fileInputRef.current?.click()}>File</button>
			</div>
			<textarea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Введите текст статьи (поддерживается Markdown)..."
			/>
			{selectedImages.length > 0 && (
				<div className="selected-files">
					<h4>Выбранные изображения:</h4>
					{selectedImages.map((file, index) => (
						<div key={index}>{file.name}</div>
					))}
				</div>
			)}
			{selectedAttachments.length > 0 && (
				<div className="selected-files">
					<h4>Выбранные файлы:</h4>
					{selectedAttachments.map((file, index) => (
						<div key={index}>{file.name}</div>
					))}
				</div>
			)}
			<input
				type="file"
				ref={imageInputRef}
				onChange={handleImageUpload}
				accept="image/*"
				multiple
				style={{ display: 'none' }}
			/>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileUpload}
				accept=".pdf,.doc,.docx"
				multiple
				style={{ display: 'none' }}
			/>
			<div className="preview">
				<h3>Предпросмотр:</h3>
				<ReactMarkdown>{value}</ReactMarkdown>
			</div>
			<button
				type="button"
				onClick={handleSubmit}
				className="submit-button"
				disabled={!value.trim()}
			>
				Отправить
			</button>
		</div>
	);
}; 