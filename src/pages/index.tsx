import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

import { getBlogs } from '../server/blogs';
import { TBlogPost } from '~/types/typeBlog';
import BlogPreview from '../../components/BlogPreview';
import { useMemo, useState } from 'react';

const Home: NextPage = ({
  blogData,
  allTags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

  // logic filter posts
  const filterBlog: TBlogPost[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: TBlogPost) => {
          return filterWord.every((filter) => blog.tags.includes(filter));
        })
      : blogData;
  }, [filterWord]);

  const clickFilterdTags = (tag: any, index: number) => {
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter((i) => i !== index));
      setFilterWord(filterWord.filter((filter) => filter !== tag.innerText));
    } else {
      setSelectedIndex([...selectedIndex, index]);
      setFilterWord([...filterWord, tag.innerText]);
    }
  };

  //
  return (
    <main className="w-screen h-screen overflow-auto flex flex-col items-center bg-zinc-800 text-neutral-200 font-poppins">
      <title>Home page</title>
      <section>
        <div className="mt-3 text-center">
          <h1 className="text-[3rem]">Welcome to my blog</h1>
          <p>A blog basic with Next.js, TailwindCSS, Github GraphQL</p>
        </div>
      </section>
      <section className="flex flex-col items-center text=[1.15rem]">
        <div className="flex gap-3 mt-12">
          {allTags.map((tag: string, index: number) => (
            <button
              onClick={(e) => clickFilterdTags(e.target, index)}
              className={`${
                selectedIndex.includes(index)
                  ? 'label hover:bg-sky-400 transition-all duration-200'
                  : 'label-not-selected hover:bg-sky-400 transition-all duration-200'
              }`}
              key={index}
            >
              {tag}
            </button>
          ))}
        </div>

        {filterBlog &&
          filterBlog.map((item: TBlogPost) => {
            return (
              <div
                key={item.id}
                className="w-[28em] max-h-[20em] overflow-auto mx-6 my-6 bg-neutral-300 text-zinc-800 rounded-lg hover:bg-neutral-500 p-4 hover:text-neutral-100 hover:cursor-pointer transition-all"
              >
                <a href={item.url} target="_blank" rel="noreferrer">
                  <BlogPreview
                    title={item.title}
                    bodyText={item.bodyText}
                    createdAt={item.createdAt}
                    author={item.author}
                    tags={item.tags}
                    lastEdited={item.lastEdited}
                  />
                </a>
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: TBlogPost[] = await getBlogs();
  let allTags: string[] = [];
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    }
  }
  console.log(allTags);

  return {
    props: {
      blogData: blogs,
      allTags: allTags,
    },
  };
};
