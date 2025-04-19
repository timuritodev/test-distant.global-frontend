import { ChangeEvent, useState } from 'react';

interface FileUploaderProps {
	onUpload: (file: File) => void;
	accept?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
	onUpload,
	accept = '*',
}) => {
	const [isDragging, setIsDragging] = useState(false);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) {
			onUpload(file);
		}
	};

	const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onUpload(file);
		}
	};

	return (
		<div
			className={`file-uploader ${isDragging ? 'dragging' : ''}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<input
				type="file"
				accept={accept}
				onChange={handleFileSelect}
				className="file-input"
			/>
			<div className="upload-area">
				Перетащите файл сюда или кликните для выбора
			</div>
		</div>
	);
}; 