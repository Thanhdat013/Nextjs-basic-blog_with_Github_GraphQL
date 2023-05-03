import React from 'react';

export default function discussionGql(ghDiscussionCategoryId: string | undefined) {
  return `{
  viewer {
    login
    avatarUrl
  }
  repository(name: "Nextjs-basic-blog_with_Github_GraphQL", owner: "Thanhdat013") {
    discussions(first: 100, categoryId: "${ghDiscussionCategoryId}") {
      nodes {
        title
        url
        bodyHTML
        bodyText
        createdAt
        lastEditedAt
        number
        author {
          login
          url
          avatarUrl
        }
        labels(first: 100) {
          nodes {
            name
          }
        }
       
      }
    }
  }
}`;
}
