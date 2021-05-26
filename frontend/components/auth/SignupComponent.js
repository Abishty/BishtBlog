import { useState, useEffect } from "react";
import { isAuth, signup } from "../../actions/auth";
import { useRouter } from 'next/router'

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    loading: false,
    successMessage: "",
    errMessage: "",
  });

  const router = useRouter();

  const { name, email, password, error, loading, successMessage, errMessage } =
    values;

  useEffect(() => {
    isAuth() && router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    const user = { name, email, password };
    signup(user).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: true,
          errMessage: data.error,
          loading: false,
          successMessage: "",
        });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: false,
          loading: false,
          successMessage: data.message,
          errMessage: "",
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const showLoading = () => {
    return loading ? <div className="alert alert-info">Loading...</div> : "";
  };
  const showError = () => {
    return error ? <div className="alert alert-danger">{errMessage}</div> : "";
  };
  const showMessage = () => {
    return successMessage ? (
      <div className="alert alert-info">{successMessage}</div>
    ) : (
      ""
    );
  };

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            placeholder="Full Name"
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div>
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {signupForm()}
    </>
  );
};

export default SignupComponent;
