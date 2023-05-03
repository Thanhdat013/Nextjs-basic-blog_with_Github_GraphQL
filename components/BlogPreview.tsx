import React from 'react';
import { TBlogPost } from '~/types/typeBlog';
import BlogHeader from './BlogHeader';

const BlogPreview: React.FC<TBlogPost> = (props) => {
  const { title, bodyText, createdAt, tags, author, lastEdited } = props;
  const previewText: string = bodyText.substring(0, 150) + '...';
  return (
    <section>
      <BlogHeader createAt={createdAt} author={author} />
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2">{previewText}</p>
      <div className="flex gap-3  ">
        {tags.map((tag, index) => {
          return (
            <p className="mt-2 text-center label" key={index}>
              {tag}
            </p>
          );
        })}
      </div>
    </section>
  );
};

export default BlogPreview;
