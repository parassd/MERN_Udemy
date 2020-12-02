import React, { Fragment, useState } from 'react';
// Since these are states that can change we also need to have an on change handler
// useState basically defines the state

// A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components. Hooks have replaced classes to make the code more simpler and compact. useState is the state hook, formData is what we want to update and setFormData is how we update it. The parameters within useState are the initialization parameters
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  //   if object then we need to use curly braces {}
  // ... means spread data which is a way of copying
  // change name to the value of the input
  //   not sure why they changed value from name to [e.target.name]. Has to do something with key values and name being used throughout the document.
  //   e.target.name is used so that we can change all the values, "name,email,password,password2" and not just name
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { name, email, password, password2 } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      console.log(formData);
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
        Already have an account? <a href='login.html'>Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
