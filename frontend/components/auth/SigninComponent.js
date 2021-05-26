import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signin, authenticate, isAuth } from "../../actions/auth";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    successMessage: "",
    errMessage: "",
  });

  const router = useRouter();

  const { email, password, error, loading, successMessage, errMessage } =
    values;

  useEffect(() => {
    isAuth() && router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    const user = { email, password };
    signin(user).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: true,
          errMessage: data.error,
          loading: false,
          successMessage: "",
        });
      } else {
        // save user token to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            router.push(`/admin`);
          } else {
            router.push(`/user`);
          }
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
          <button className="btn btn-primary">Signin</button>
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

export default SigninComponent;
