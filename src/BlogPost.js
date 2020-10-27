import React from 'react';
import { gql, useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';
import  { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

// Writing query
const GET_POSTS = gql`
	query GET_ALL_POSTS {
		posts {
			stage
			id
			title
      body
      image {
        id
        url
      }
		}
	}
`;

function BlogPost() {
  const { id } = useParams();
	const { loading, data } = useQuery(GET_POSTS);

	if (loading) return "Loading...";

  const { posts } = data;

  const post = posts.find((post) => post.id === id);
	return(
    <section className="blog--content">
    <div className="blog--image" style={{backgroundImage:`url(${post.image.url})`}}>
			<h2>{post.title}</h2>
		</div>
      <div className="blog--post">
      <ReactMarkdown source={post.body} />
      </div>
			{/* <p>{post.body}</p> */}
      {/* <div dangerouslySetInnerHTML={{ __html: post.body }} /> */}
      <Link to="/">Home</Link>
    </section>
	);
}

export default BlogPost;
