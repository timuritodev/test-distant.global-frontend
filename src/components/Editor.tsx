import React, { ChangeEvent } from 'react';

interface EditorProps {
	value: string;
	onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className="editor">
			<textarea
				value={value}
				onChange={handleChange}
				placeholder="Напишите ваш пост здесь..."
			/>
		</div>
	);
}; 