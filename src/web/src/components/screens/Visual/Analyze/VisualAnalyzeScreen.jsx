import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Message,
  Segment,
} from "semantic-ui-react";

import "./VisualAnalyzeScreen.scss";

import AuthContext from "../../../contexts/AuthContext";
import { analyzeImage } from "../../../../services/";
import { AppRoutes } from "../../../routes";

export const VisualAnalyzeScreen = ({
  handleVisualAddition,
  handleSelectedVisualChange,
}) => {
  const [formData, setFormData] = useState({
    url: "",
    file: "",
    share: true,
    errors: [],
    isSubmitting: false,
    isSuccessful: false,
    analysisData: null,
  });

  const fileInput = useRef(null);

  const { token } = useContext(AuthContext);

  const handleFileButtonClick = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  const handleFileInputClick = () => {
    const { value, files } = fileInput.current;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        file: value,
      });
    }
  };

  const handleShareCheckboxClick = () => {
    setFormData({
      ...formData,
      share: !formData.share,
    });
  };

  const handleInputClick = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { url, file } = formData;
    const errors = [];
    if (!url && !file) {
      errors.push("Either public URL or local file must be provided");
    }
    return errors;
  };

  const handleSubmit = async () => {
    let errors = validateForm();
    if (errors.length > 0) {
      setFormData({
        ...formData,
        errors,
      });
    } else {
      setFormData({
        ...formData,
        errors: [],
        isSubmitting: true,
        isSuccessful: false,
        analysisData: {},
      });

      const form = new FormData();
      if (formData.url) {
        form.append("url", formData["url"]);
      } else {
        const file = fileInput.current.files[0];
        form.append("file", file, file.name);
      }

      form.append("share", formData.share ? true : false);
      const apiResponse = await analyzeImage(form, token);
      const isSuccessful = apiResponse.data;

      if (!isSuccessful) {
        errors = [apiResponse.message || "Failed to get results"];
      } else {
        await handleVisualAddition(apiResponse.data);
      }

      setFormData({
        ...formData,
        url: isSuccessful ? "" : formData.url,
        file: isSuccessful ? "" : formData.file,
        share: isSuccessful ? true : formData.share,
        errors,
        isSubmitting: false,
        isSuccessful,
        analysisData: isSuccessful ? apiResponse.data : null,
      });
    }
  };

  return (
    <>
      <Segment
        basic
        loading={formData.isSubmitting}
        className="vis-app-analyze-screen"
      >
        <Message attached header="Upload visual for analysis" />
        <Form
          id="vis-analyze-form"
          name="vis-analyze-form"
          className="attached fluid segment"
          onSubmit={handleSubmit}
        >
          <Form.Group widths="equal">
            <div className="field">
              <label>Enter a public URL</label>
              <input
                type="text"
                name="url"
                placeholder="https://<path-to-your-image>"
                value={formData.url}
                onChange={handleInputClick}
              />
            </div>
            <span>
              <b>OR</b>
            </span>
            <div className="field">
              <label>Choose a local file</label>
              <div>
                <input
                  type="text"
                  readOnly
                  disabled
                  value={formData.file || "No file chosen"}
                  style={{ width: "65%", marginRight: "5px" }}
                />
                <Button color="teal" onClick={handleFileButtonClick}>
                  Select file
                </Button>
                <input
                  type="file"
                  ref={fileInput}
                  style={{ display: "none" }}
                  onChange={handleFileInputClick}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Field>
            <Checkbox
              label="Share with public"
              name="share"
              checked={formData.share}
              onChange={handleShareCheckboxClick}
            />
          </Form.Field>
          <Button type="submit" color="violet">
            Upload &amp; Analyze
          </Button>
          <Message
            visible={formData.errors.length > 0}
            error
            header="Error."
            list={formData.errors}
          />
        </Form>
      </Segment>
      {formData.isSuccessful && (
        <>
          <Divider />
          <div>
            Visual processed successfully. Find details{" "}
            <Link
              onClick={() =>
                handleSelectedVisualChange(formData.analysisData.id)
              }
              to={AppRoutes.visualEdit.link(formData.analysisData.id)}
            >
              here
            </Link>
          </div>
        </>
      )}
    </>
  );
};
