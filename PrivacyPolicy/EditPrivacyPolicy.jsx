import React from "react";
import { Button, Form, FormGroup, Input, Row } from "reactstrap";
import ContentWrapper from "../Layout/ContentWrapper";
import * as privacyPolicyService from "../../services/privacyPolicyService";
import * as schemas from "../../models/privacyPolicySchemas";
import { Formik } from "formik";
import * as toast from "../NotificationMessage";

class EditPrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getPrivacyPolicySchema;
    this.state = {
      id: this.props.location.state
    };
    this.state.privacyData = this.validation.initialValues;
  }

  handleSubmit = (values, obj) => {
    let route = this.state.id;
    privacyPolicyService
      .editPrivacyPolicy(route.state, values)
      .then(this.onEditPrivacyPolicySuccess)
      .catch(this.onEditPrivacyPolicyError)
      .then(() => {
        obj.setSubmitting(false);
      });
  };

  handleDelete = values => {
    let route = this.state.id;
    privacyPolicyService
      .deletePrivacyPolicy(route.state, values)
      .then(this.onDeletePrivacyPolicySuccess)
      .catch(this.onDeletePrivacyPolicyError);
  };

  onDeletePrivacyPolicySuccess = () => {
    this.props.history.push("/privacypolicylist");
    toast.success({ message: "Privacy policy deleted successfully!" });
    console.log("Privacy policy deleted successfully.");
  };

  onDeletePrivacyPolicyError = () => {
    toast.error({ message: "Fail to delete privacy policy." });
    console.log("Fail to delete privacy policy.");
  };

  onEditPrivacyPolicySuccess = () => {
    this.props.history.push("/privacypolicylist");
    toast.success({ message: "Privacy policy updated successfully!" });
    console.log("Privacy policy was editted successfully");
  };

  onEditPrivacyPolicyError = error => {
    toast.error({ message: "Fail to update privacy policy." });
    console.log(error);
  };

  onGetSpecificPrivacyPolicySuccess = response => {
    this.setState({
      privacyData: {
        title: response.item.title,
        paragraph: response.item.paragraph,
        sortOrder: response.item.sortOrder
      }
    });
  };

  onGetSpecificPrivacyPolicyError = error => {
    console.log(error);
  };

  componentDidMount() {
    let route = this.state.id;
    privacyPolicyService
      .getSpecificPrivacyPolicy(route.state)
      .then(this.onGetSpecificPrivacyPolicySuccess)
      .catch(this.onGetSpecificPrivacyPolicyError);
    console.log(route.state);
  }
  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={this.state.privacyData}
        onSubmit={this.handleSubmit}
        validationSchema={this.validation()}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;
          return (
            <ContentWrapper>
              <Row>
                <div className="col-lg-12">
                  <div className="card card-default">
                    <div className="card-header bg-success">
                      Edit Privacy Policy Form
                    </div>
                    <div className="card-body">
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            name="title"
                            id="title"
                            type="text"
                            placeholder=""
                            value={values.title}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={
                              errors.title && touched.title ? "error" : ""
                            }
                          />
                          {errors.title && touched.title && (
                            <span
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.title}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <label>Paragraph</label>
                          <Input
                            id="paragraph"
                            name="paragraph"
                            type="textarea"
                            placeholder="Enter Information Here"
                            value={values.paragraph}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={
                              errors.paragraph && touched.paragraph
                                ? "error"
                                : ""
                            }
                          />
                          {errors.paragraph && touched.paragraph && (
                            <span
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.paragraph}
                            </span>
                          )}
                          <FormGroup>
                            <label>Sort Order</label>
                            <Input
                              id="sortOrder"
                              name="sortOrder"
                              type="text"
                              placeholder="Enter Sort Order Here"
                              value={values.sortOrder}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              className={
                                errors.sortOrder && touched.sortOrder
                                  ? "error"
                                  : ""
                              }
                            />
                            {errors.sortOrder && touched.sortOrder && (
                              <span
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.sortOrder}
                              </span>
                            )}
                          </FormGroup>
                        </FormGroup>
                        <Button
                          color="info"
                          size="sm"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Submit
                        </Button>
                        {""} {""}
                        <Button
                          color="danger"
                          size="sm"
                          type="button"
                          onClick={this.handleDelete}
                        >
                          Delete
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </Row>
            </ContentWrapper>
          );
        }}
      </Formik>
    );
  }
}
export default EditPrivacyPolicy;
