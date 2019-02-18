import React from "react";
import { Button, Form, FormGroup, Input, Row } from "reactstrap";
import ContentWrapper from "../Layout/ContentWrapper";
import * as faqService from "../../services/faqService";
import * as schemas from "../../models/faqSchemas";
import { Formik } from "formik";
import * as toast from "../NotificationMessage";

class EditFaq extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getFaqSchema;
    this.state = {
      id: this.props.location.state
    };
    this.state.faqData = this.validation.initialValues;
  }

  onEditFaqSuccess = () => {
    toast.success({ message: "FAQ was succesfully updated" });
    this.props.history.push("/faqslist");
  };

  onEditFaqError = error => {
    console.log(error);
  };

  onGetSpecificFaqSuccess = response => {
    this.setState({
      faqData: {
        categoryId: response.item.categoryId,
        question: response.item.question,
        answer: response.item.answer,
        sortOrder: response.item.sortOrder
      }
    });
    console.log(response.item);
  };

  onGetFaqError = error => {
    console.log(error);
  };

  onDeleteFaqSuccess = () => {
    toast.success({ message: "FAQ deleted successfully" });
    this.props.history.push("/FaqsList");
  };

  componentDidMount() {
    let route = this.state.id;
    faqService
      .getSpecificFaq(route.state)
      .then(this.onGetSpecificFaqSuccess)
      .catch(this.onGetSpecificFaqError);
    console.log(route.state);
  }

  handleSubmit = (values, obj) => {
    let route = this.state.id;
    faqService
      .editFaq(route.state, values)
      .then(this.onEditFaqSuccess)
      .catch(this.onEditFaqError)
      .then(() => {
        obj.setSubmitting(false);
      });
  };

  handleDelete = values => {
    let route = this.state.id;
    faqService
      .deleteFaq(route.state, values)
      .then(this.onDeleteFaqSuccess)
      .catch(this.onDeleteFaqError);
  };

  render() {
    return (
      <Formik
        enableReinitialize={true}
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
            <ContentWrapper>
              <Row>
                <div className="col-lg-12">
                  <div className="card card-default">
                    <div className="card-header bg-success">Edit FAQs Form</div>
                    <div className="card-body">
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <label>Category Id</label>
                          <Input
                            name="categoryId"
                            id="categoryId"
                            type="text"
                            placeholder=""
                            value={values.categoryId}
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                        <div className="form-group">
                          <label>Question</label>
                          <Input
                            id="question"
                            name="question"
                            type="text"
                            placeholder="Enter Question Here"
                            value={values.question}
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                        </div>
                        <FormGroup>
                          <label>Answer</label>
                          <Input
                            id="answer"
                            name="answer"
                            type="textarea"
                            placeholder="Enter Answer Here"
                            value={values.answer}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={
                              errors.question && touched.question ? "error" : ""
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
export default EditFaq;
