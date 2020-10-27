import "./App.css";
import { gql, useQuery } from "@apollo/client";
import {Switch, Route } from 'react-router-dom';
import  { Link } from 'react-router-dom'
import BlogPost  from  './BlogPost'

// Writing query
const GET_POSTS = gql`
	query GET_ALL_POSTS {
		posts {
			stage
			id
			title
      excerpt
      body
      image {
        id
        url
      }
		}
	}
`;

function Posts() {
	const { loading, data } = useQuery(GET_POSTS);

	if (loading) return "Loading...";

	const { posts } = data;

	return posts.map((post) => (
      <div className="card">
        <Link to={`/blog/${post.id}`}>
        <div className="card--image" style={{backgroundImage:`url(${post.image.url})`}}></div>
        <div className="card--content">
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <Link to={`/blog/${post.id}`} className="btn-details">Details</Link>
        </div>
        </Link>
      </div>
	));
}

// Apollo Provider attached the client to this React App
function App() {
	return (
		<>
			<div className="App">
					<h2>React GraphQL Apollo - Recipe App</h2>

        <Switch>
          <Route exact path='/' component={Posts}></Route>
          <Route exact path='/blog/:id' component={BlogPost}>
          </Route>
        </Switch>
			</div>
		</>
	);
}

export default App;