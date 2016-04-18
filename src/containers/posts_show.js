import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);

    this.state = { loading: true };
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id)
      .then( () => this.setState({ loading: false }) );
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then( () => {
        this.context.router.push('/');
      })
  }

  render() {
    const { post } = this.props;

    if(this.state.loading) {
      return <div>Loading....</div>
    }

    return (
      <div>
        <Link to='/'>&lt; Back</Link>
        <button 
          type='buttton'
          className='btn btn-danger pull-right'
          onClick={this.onDeleteClick.bind(this)}
          >Delete Post</button>
        <Link 
          to={`/posts/edit/${this.props.params.id}`}
          className='btn btn-warning pull-right'
          >Edit Post</Link>
        <br />
        <br />
        <h3>{post.title}</h3>
        <h6>{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post }
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);