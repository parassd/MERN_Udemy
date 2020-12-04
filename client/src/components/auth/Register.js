import React, { Fragment, useState } from 'react';
// connect with redux for alerts
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

// Since these are states that can change we also need to have an on change handler
// useState basically defines the state

// A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components. Hooks have replaced classes to make the code more simpler and compact. useState is the state hook, formData is what we want to update and setFormData is how we update it. The parameters within useState are the initialization parameters
const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  //   if object then we need to use curly braces {}
  // ... means spread data which is a way of copying
  // change name to the value of the input
  //   e.target.name is used so that we can change all the values, "name,email,password,password2" and not just name, otherwise this function would've only changed the name attribute in formData.
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // we want to associate inputs with these values, that's why we write value ={name}
  const { name, email, password, password2 } = formData;

  //   this is the advantage of using state hooks, we don't have to pass any props here we can access these fields from anywhere and they're being updated through our state hook
  const onSubmit = async (e) => {
    //   we need to preventDefault since it's a submit
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      console.log('Success!!!');
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            required
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

// connect takes state and objects in the action that you want to use
export default connect(null, { setAlert })(Register);
