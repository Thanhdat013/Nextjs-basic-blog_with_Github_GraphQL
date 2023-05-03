import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import { getBlogs } from '../server/blogs';
import { TBlogPost } from '~/types/typeBlog';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-auto flex flex-col items-center bg-zinc-800 text-neutral-200 font-poppins">
      <title>Home page</title>
      <section>
        <div className="mt-3 text-center">
          <h1 className="text-[3rem]">Welcome to my blog</h1>
          <p>A blog basic with Next.js, TailwindCSS, Github GraphQL</p>
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: TBlogPost[] = await getBlogs();
  console.log(blogs);

  return {
    props: {},
  };
};
