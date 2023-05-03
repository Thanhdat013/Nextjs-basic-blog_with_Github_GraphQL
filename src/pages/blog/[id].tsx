import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import React from 'react';
import { getBlogDetail } from '~/server/blogs';
import BlogHeader from '../../../components/BlogHeader';
import parse from 'html-react-parser';
import css from './id.module.css';

const BlogPost: NextPage = ({
  blogDetailData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { author, title, createdAt, bodyHTML } = blogDetailData;
  return (
    <section className="w-screen h-screen overflow-auto flex flex-col items-center bg-zinc-800 text-neutral-200 font-poppins">
      <div className="max-w-[50%]">
        <h1 className="text-center my-10 text-[2rem] font-bold ">{title}</h1>
        <div className="flex justify-center mb-4">
          <BlogHeader createAt={createdAt} author={author} />
        </div>
        <div className={`${css.html} flex flex-col`}>{parse(bodyHTML)}</div>
      </div>
    </section>
  );
};

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const route: string[] | string | undefined = context.query.id;
  console.log(route);
  const id = Number(route);
  console.log(route);

  let blogDetail = await getBlogDetail(id);
  return {
    props: {
      blogDetailData: blogDetail,
    },
  };
};
