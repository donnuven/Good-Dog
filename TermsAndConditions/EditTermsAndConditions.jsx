import React from "react";
import { Formik } from "formik";
import ContentWrapper from "../Layout/ContentWrapper";
import { Button, Form, FormGroup, Input, Row } from "reactstrap";
import * as schemas from "../../models/termsAndConditionsSchemas";
import * as toast from "../NotificationMessage";
import * as termsAndConditionsService from "../../services/termsAndConditionsService";

class EditTermsAndConditions extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getTermsAndConditionsSchema;
    this.state = {
      id: this.props.location.state
    };
    this.state.termsData = this.validation.initialValues;
  }

  handleSubmit = (values, obj) => {
    let route = this.state.id;
    termsAndConditionsService
      .editTermsAndConditionsById(route.state, values)
      .then(this.onEditTermsAndConditionsByIdSuccess)
      .catch(this.onEditTermsAndConditionsByIdError)
      .then(() => {
        obj.setSubmitting(false);
      });
  };

  onDeleteTermsAndConditionsSuccess = () => {
    toast.success({ message: "Terms and conditions deleted successfully" });
    this.props.history.push("/termsandconditionslist");
  };

  onDeleteTermsAndConditionsError = () => {
    toast.error({ message: "Fail to delete terms and" });
  };

  handleDelete = values => {
    let route = this.state.id;
    termsAndConditionsService
      .deleteTermsAndConditions(route.state, values)
      .then(this.onDeleteTermsAndConditionsSuccess)
      .catch(this.onDeleteTermsAndConditionsError);
  };

  onEditTermsAndConditionsByIdSuccess = () => {
    toast.success({ message: "Terms and conditions was succesfully updated" });
    this.props.history.push("/termsandconditionslist");
  };

  onEditTermsAndConditionsByIdError = error => {
    console.log(error);
    console.log("Fail to update terms and conditions!");
  };

  onGetTermsAndConditionsByIdSuccess = response => {
    this.setState({
      termsData: {
        title: response.item.title,
        paragraph: response.item.paragraph,
        sortOrder: response.item.sortOrder
      }
    });
    console.log(response.item);
  };

  onGetTermsAndConditionsByIdError = error => {
    console.log(error);
  };

  componentDidMount() {
    let route = this.state.id;
    termsAndConditionsService
      .getTermsAndConditionsById(route.state)
      .then(this.onGetTermsAndConditionsByIdSuccess)
      .catch(this.onGetTermsAndConditionsByIdError);
    console.log(route.state);
  }

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={this.state.termsData}
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
                      Edit Terms And Conditions Form
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

export default EditTermsAndConditions;
