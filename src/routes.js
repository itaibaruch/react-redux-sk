import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './containers/posts_index';
import PostsNew from './containers/posts_new';
import PostsShow from './containers/posts_show';

// const Greeting = () => {
//   return <div>Hi There!</div>;
// };

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ PostsIndex } />
    <Route path='posts/new' component={ PostsNew } />
    <Route path='posts/:id' component={ PostsShow } />
  </Route>
)