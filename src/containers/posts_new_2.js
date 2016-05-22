import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost, fetchPost, editPost } from '../actions';
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

const FIELDS = {
  title: {
    type: 'input',
    label: 'type a title'
  },
  categories: {
    type: 'input',
    label: 'type a category'
  },
  content: {
    type: 'textarea',
    label: 'type content'
  }
};

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);

    this.state = { loading: this.props.params.id ? true : false };
  }

  componentWillMount() {
    if (this.props.params.id) {
      this.props.fetchPost(this.props.params.id)
        .then( () => this.setState({ loading: false }) );
    }
  }

  onSubmit(formProps) {
    if (this.props.params.id) {
      this.props.editPost(this.props.params.id, formProps) // createPost it an action creator that create a promise as it payload and it return that payload
        .then( () => {
          this.context.router.push('/');
        });
    } else {
      this.props.createPost(formProps) // createPost it an action creator that create a promise as it payload and it return that payload
        .then( () => {
          // the blog post has been created 
          this.context.router.push('/');
        });
    }
  }

  renderField(fieldConfig, field)  {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${ fieldHelper.touched && fieldHelper.invalid ? 'has-error' : ''}`} key={field} >
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type='text' className='form-control' {...fieldHelper} />
        <div className='help-block'>
          { fieldHelper.touched ? fieldHelper.error : '' }
        </div>
      </div>
    );
  }

	render() {

    if(this.state.loading) {
      return <div>Loading....</div>
    }

    // const { handleSubmit } = this.props;
    // const handleSubmit = this.props.handleSubmit;
    const editMode = this.props.params.id ? true : false;
    let { handleSubmit } = this.props;
    const { createPost } = this.props;

		return (
			<form onSubmit={ handleSubmit( this.onSubmit.bind(this) ) }>
        <h3>Create A New Post</h3>

        {_.map( FIELDS, this.renderField.bind(this) )}

        <DropDown {...dDOptions} />

        <button type='submit' className='btn btn-primary'>{ editMode ? 'Save Changes' : 'Submit' }</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
		);
	}
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if(!values[field]){
      errors[field] = `Enter a ${field}`;
    }
  })

  // if (!values.title) { 
  //   errors.title = 'Enter a username'; 
  // }
  // if (!values.categories) { 
  //   errors.categories = 'Enter categories'; 
  // }
  // if (!values.content) { 
  //   errors.content = 'Enter some content'; 
  // }

  return errors;
}
function mapStateToProps(state) {
  return { initialValues: state.posts.post }
}

// connect: 1st arg is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostNewForm',
  fields: _.keys(FIELDS),
  validate
}, mapStateToProps, { createPost, fetchPost, editPost })(PostsNew);
