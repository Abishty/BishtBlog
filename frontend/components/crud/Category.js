import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getCookie } from "../../actions/auth";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../actions/category";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    loading: false,
    errorMessage: "",
    reload: false,
  });
  const router = useRouter();

  const {
    name,
    error,
    success,
    reload,
    categories,
    removed,
    loading,
    errorMessage,
  } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    setValues({ ...values, loading: true });
    getCategories().then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: true,
          success: false,
          loading: false,
          errorMessage: data.error,
        });
      } else {
        setValues({
          ...values,
          categories: data,
          error: false,
          loading: false,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    const categoryName = { name };
    createCategory(categoryName, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: true,
          success: false,
          loading: false,
          errorMessage: data.error,
        });
      } else {
        setValues({
          name: "",
          error: false,
          loading: false,
          errorMessage: "",
          success: true,
          removed: false,
          reload: !reload,
        });
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = (slug) => {
    removeCategory(slug, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: true,
          errorMessage: data.error,
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          error: false,
          name: "",
          success: false,
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const mouseMoveHandler = () => {
    setValues({
      ...values,
      error: false,
      success: false,
      removed: "",
    });
  };

  const showLoading = () => {
    return loading ? <div className="alert alert-info">Loading...</div> : "";
  };
  const showError = () => {
    return error ? <div className="text-danger">{errorMessage}</div> : "";
  };

  const showSuccess = () => {
    return success && <div className="text-success">Category Is Created</div>;
  };

  const showRemove = () => {
    return removed && <div className="text-danger">Category Is Removed</div>;
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => {
        return (
          <button key={i} className="btn btn-outline-success mr-1 ml-1 mt-3">
            <span className="pr-2 text-break">{c.name}</span>
            <Button
              onClick={() => deleteConfirm(c.slug)}
              close
              className="text-danger"
              style={{ fontSize: "1.4rem" }}
            />
          </button>
        );
      })
    );
  };

  const newCategoryForm = () => {
    return (
      <Form onSubmit={clickSubmit}>
        <FormGroup>
          <Label for="name">Category Name</Label>
          <Input
            type="text"
            value={name}
            required
            id="name"
            placeholder="category name"
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit" className="btn btn-primary">
          Create
        </Button>
      </Form>
    );
  };

  return (
    <>
      {showLoading()} {showError()} {showSuccess()} {showRemove()}{" "}
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        {showCategories()}
      </div>
    </>
  );
};

export default Category;
