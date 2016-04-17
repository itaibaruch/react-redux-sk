import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router';

class PostsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
    this.interval = setInterval( () => {
      this.setState({ counter: this.state.counter + 1 });  
    }, 1000);
  }

	componentWillMount() {
		this.props.fetchPosts();
	}

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li key={post.id} className='list-group-item'>
          <Link to={`posts/${post.id}`}>
            <strong>{ post.title }</strong>
            <span className='pull-right'>{ post.categories }</span>
          </Link>
        </li>
      )
    });
  }

	render() {
		return (
			<div>
				<div className='text-right'>
					<Link to='/posts/new' className='btn btn-primary'>Add a Post</Link>
				</div>
        <h3>Posts</h3> 
        <h1>{ this.state.counter }</h1>
        <ul className='list-group'>
          { this.renderPosts() }
        </ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return { posts: state.posts.all }
}
// function mapDispatchToProps(dispatch){
// 	return bindActionCreators({ fetchPosts }, dispatch);
// }

export default connect( mapStateToProps, { fetchPosts } )(PostsIndex);