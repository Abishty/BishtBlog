import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getCookie } from "../../actions/auth";
import { createTag, getTags, removeTag } from "../../actions/tag";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    loading: false,
    errorMessage: "",
    reload: false,
  });
  const router = useRouter();

  const { name, error, success, tags, removed, loading, errorMessage, reload } =
    values;
  const token = getCookie("token");
  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    setValues({ ...values, loading: true });
    getTags().then((data) => {
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
          tags: data,
          error: false,
          loading: false,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    const tagName = { name };
    createTag(tagName, token).then((data) => {
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
      "Are you sure you want to delete this tag?"
    );
    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = (slug) => {
    removeTag(slug, token).then((data) => {
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
    return success && <div className="text-success">Tag Is Created</div>;
  };

  const showRemove = () => {
    return removed && <div className="text-danger">Tag Is Removed</div>;
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => {
        return (
          <button key={i} className="btn btn-outline-success mr-1 ml-1 mt-3">
            <span className="pr-2 text-break">{t.name}</span>
            <Button
              onClick={() => deleteConfirm(t.slug)}
              close
              className="text-danger"
              style={{ fontSize: "1.4rem" }}
            />
          </button>
        );
      })
    );
  };

  const newTagForm = () => {
    return (
      <Form onSubmit={clickSubmit}>
        <FormGroup>
          <Label for="name">Tag Name</Label>
          <Input
            type="text"
            value={name}
            required
            id="name"
            placeholder="tag name"
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
        {newTagForm()}
        {showTags()}
      </div>
    </>
  );
};

export default Tag;
