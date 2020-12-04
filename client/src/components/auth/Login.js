import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
// Since these are states that can change we also need to have an on change handler
// useState basically defines the state

// A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components. Hooks have replaced classes to make the code more simpler and compact. useState is the state hook, formData is what we want to update and setFormData is how we update it. The parameters within useState are the initialization parameters
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  //   if object then we need to use curly braces {}
  // ... means spread data which is a way of copying
  // change name to the value of the input
  //   e.target.name is used so that we can change all the values, "name,email,password,password2" and not just name, otherwise this function would've only changed the name attribute in formData.
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // we want to associate inputs with these values, that's why we write value ={name}
  const { email, password } = formData;

  //   this is the advantage of using state hooks, we don't have to pass any props here we can access these fields from anywhere and they're being updated through our state hook
  const onSubmit = async (e) => {
    //   we need to preventDefault since it's a submit
    e.preventDefault();
    console.log('Success!!!');
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
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
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </Fragment>
  );
};

export default Login;
