import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import api from '../api/api';

interface EditorProps {
	value: string;
	onChange: (value: string) => void;
	onImagesUpload?: (paths: string[]) => void;
	onAttachmentsUpload?: (paths: string[]) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange, onImagesUpload, onAttachmentsUpload }) => {
	const imageInputRef = useRef<HTMLInputElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) return;
		try {
			const paths = await api.news.uploadImages(Array.from(e.target.files));
			if (onImagesUpload) {
				onImagesUpload(paths);
			}
			const imageMarkdown = paths.map(path => `![image](${path})`).join('\n');
			onChange(value + '\n' + imageMarkdown);
		} catch (err) {
			console.error('Ошибка при загрузке изображений:', err);
		}
	};

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) return;
		try {
			const paths = await api.news.uploadAttachments(Array.from(e.target.files));
			if (onAttachmentsUpload) {
				onAttachmentsUpload(paths);
			}
			const filesMarkdown = paths.map(path => {
				const fileName = path.split('/').pop() || 'file';
				return `[${fileName}](${path})`;
			}).join('\n');
			onChange(value + '\n' + filesMarkdown);
		} catch (err) {
			console.error('Ошибка при загрузке файлов:', err);
		}
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
		</div>
	);
}; 