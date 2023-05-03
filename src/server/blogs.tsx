import { TBlogPost } from '../types/typeBlog';
import discussionGql from './gql';

const API_URL = 'https://api.github.com/graphql';
const GH_ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN;
const DISCUSSION_CATEGORY_ID = process.env.DISCUSSION_CATEGORY_ID;

export async function getBlogs(): Promise<TBlogPost[]> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: discussionGql(DISCUSSION_CATEGORY_ID) }),
  });

  let res = await response.json();
  const discussion = res.data.repository.discussions.nodes;
  const post = discussion.map((item: any): TBlogPost => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      bodyText,
      labels,
      url: discussionUrl,
    } = item;

    const url = `/blog/${id}`;
    const authorUrl = author.url;
    const authorName = author.login;
    const authorAvatar = author.avatarUrl;
    const tags: string[] = labels.nodes.map((tag: { name: string }) => tag.name);

    const postItem = {
      id,
      url,
      discussionUrl,
      title,
      html,
      bodyText,
      tags,
      createdAt,
      lastEdited,
      author: { url: authorUrl, name: authorName, avatar: authorAvatar },
    };
    return postItem;
  });
  return post;
}
