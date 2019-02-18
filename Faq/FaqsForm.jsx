import React from "react";
import * as faqService from "../../services/faqService";
import { Formik } from "formik";
import { Button, Form, FormGroup, Row, Input } from "reactstrap";
import ContentWrapper from "../Layout/ContentWrapper";
import * as schemas from "../../models/faqSchemas";
class FaqsForm extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getFaqSchema;
    this.state = {};
    this.state.faqData = this.validation.initialValues;
  }
  handleSubmit = (values, obj) => {
    faqService
      .addFaq(values)
      .then(this.onAddFaqSuccess)
      .catch(this.onAddFaqError)
      .then(() => {
        obj.setSubmitting(false);
      });
  };

  onAddFaqSuccess = () => {
    console.log("New FAQ has been added!");
    this.props.history.push("/faqslist");
  };

  onAddFaqError = response => {
    console.log(response);
    console.log("FAQ has failed to be added");
  };

  render() {
    return (
      <Formik
        initialValues={this.state.faqData}
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
            <Row>
              <ContentWrapper>
                <div className="col-lg-12">
                  <div className="card card-default">
                    <div className="card-header bg-info">FAQs Form</div>
                    <div className="card-body">
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <label>Category Id</label>
                          <Input
                            id="categoryId"
                            type="text"
                            placeholder=""
                            values={values.categoryId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.categoryId && touched.categoryId
                                ? "error"
                                : ""
                            }
                          />
                          {errors.categoryId && touched.categoryId && (
                            <span
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.categoryId}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <label>Question</label>
                          <Input
                            id="question"
                            type="text"
                            placeholder="Enter Question"
                            values={values.question}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.question && touched.question ? "error" : ""
                            }
                          />
                          {errors.question && touched.question && (
                            <span
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.question}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <label>Answer</label>
                          <Input
                            id="answer"
                            type="textarea"
                            placeholder="Answer"
                            values={values.answer}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.answer && touched.answer ? "error" : ""
                            }
                          />
                          {errors.answer && touched.answer && (
                            <span
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.answer}
                            </span>
                          )}
                        </FormGroup>
                        <div className="form-group">
                          <label>Sort Order</label>
                          <Input
                            id="sortOrder"
                            type="text"
                            placeholder=""
                            values={values.sortOrder}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                        </div>
                        <Button
                          color="info"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Submit
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </Row>
          );
        }}
      </Formik>
    );
  }
}
export default FaqsForm;
