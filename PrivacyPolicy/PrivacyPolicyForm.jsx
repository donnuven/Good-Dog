import React from "react";
import { Formik } from "formik";
import ContentWrapper from "../Layout/ContentWrapper";
import { Button, Form, FormGroup, Row, Input } from "reactstrap";
import * as schemas from "../../models/privacyPolicySchemas";
import * as privacyPolicyService from "../../services/privacyPolicyService";

class PrivacyPolicyForm extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getPrivacyPolicySchema;
    this.state = {};
    this.state.privacyData = this.validation.initialValues;
  }
  handleSubmit = (values, obj) => {
    privacyPolicyService
      .addPrivacyPolicy(values)
      .then(this.onAddPrivacyPolicySuccess)
      .catch(this.onAddPrivacyPolicyError)
      .then(() => {
        obj.setSubmitting(false);
      });
  };

  onAddPrivacyPolicySuccess = () => {
    console.log("Privacy policy successfully added!");
    this.props.history.push("/privacypolicylist");
  };

  onAddPrivacyPolicyError = error => {
    console.log(error);
  };
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
                      Privacy Policy Form
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
                        </FormGroup>
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
                        <Button
                          color="info"
                          size="sm"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Submit
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
export default PrivacyPolicyForm;
