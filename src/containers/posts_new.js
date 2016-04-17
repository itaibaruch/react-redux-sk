import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions';
import { Link } from 'react-router';

import { FormInput, FormTextarea } from '../components/form/form_input';
import { DropDown } from '../components/bs3/DropDown';

const dDOptions = {
  title: 'Choose a dessert',
  items: [ 
    'Apple Pie',
    'Peach Cobbler',
    'Coconut Cream Pie'
  ]
};

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(formProps) {
    this.props.createPost(formProps) // createPost it an action creator that create a promise as it payload and it return that payload
      .then( () => {
        // the blog post has been created 
        this.context.router.push('/');
      });
  }

	render() {
    // const { handleSubmit } = this.props;
    // const handleSubmit = this.props.handleSubmit;
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    const { createPost } = this.props;
    // console.log(title);

		return (
			<form onSubmit={ handleSubmit( this.onSubmit.bind(this) ) }>
        <h3>Create A New Post</h3>

        <FormInput {...title} label="Title" />

        <FormInput {...categories} label="Categories" />

        <FormTextarea {...content} label="Content" />

        <DropDown {...dDOptions} />

        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
		);
	}
}

function validate(values) {
  const errors = {};

  if (!values.title) { 
    errors.title = 'Enter a username'; 
  }
  if (!values.categories) { 
    errors.categories = 'Enter categories'; 
  }
  if (!values.content) { 
    errors.content = 'Enter some content'; 
  }

  return errors;
}
// connect: 1st arg is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
