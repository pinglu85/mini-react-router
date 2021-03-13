import { Router, Switch, Route, Link, withRouter } from './miniReactRouter';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/posts/:id">
          <Post />
        </Route>
        <Route path="/">
          <Posts />
        </Route>
      </Switch>
    </Router>
  );
};

const Posts = () => (
  <div>
    <h4>Posts</h4>
    <ul>
      <li>
        <Link to="/posts/1">Post One</Link>
      </li>
      <li>
        <Link to="/posts/2">Post Two</Link>
      </li>
    </ul>
  </div>
);

const PostBase = ({ params }) => (
  <div>
    <h4>Post {params.id}</h4>
    <Link to="/">Back to all posts</Link>
  </div>
);

const Post = withRouter(PostBase);

export default App;
