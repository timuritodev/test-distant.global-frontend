import React from 'react';

interface PreviewProps {
	content: string;
}

export const Preview: React.FC<PreviewProps> = ({ content }) => {
	return (
		<div className="preview">
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
}; 