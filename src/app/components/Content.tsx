import React from 'react';



interface ContentProps {
  content: string;
}

const Content: React.FC<ContentProps> = ({ content }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} /> // 
  );
};

export default Content;