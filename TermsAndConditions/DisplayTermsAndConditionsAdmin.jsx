import React from "react";
import ContentWrapper from "../Layout/ContentWrapper";
import { Col, Button, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";
import { withRouter } from "react-router-dom";
import * as termsAndConditionsService from "../../services/termsAndConditionsService";

class DisplayTermsAndConditionsAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAndConditions: []
    };
  }

  handleEdit = (e, data) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.history.push("/termsAndConditions/" + data.id + "/edit", {
      state: data.id
    });
    console.log(data);
  };

  onGetTermsAndConditionsSuccess = response => {
    this.setState({ termsAndConditions: response.items });
    console.log(response);
    console.log("Terms and conditions has been retrieved!");
  };

  onGetTermsAndConditionsError = error => {
    console.log(error);
    console.log("Terms and conditions failed to be retrieved!");
  };

  componentDidMount() {
    termsAndConditionsService
      .getTermsAndConditions()
      .then(this.onGetTermsAndConditionsSuccess)
      .catch(this.onGetTermsAndConditionsError);
  }

  mapData = data => {
    return (
      <div key={data.id}>
        <Jumbotron>
          <Col>
            <div className="h5 text-bold">{data.title}</div>
            <ListGroup>
              <ListGroupItem>
                <span>{data.paragraph}</span>
              </ListGroupItem>
              <ListGroupItem>
                <span>{data.sortOrder}</span>
              </ListGroupItem>
            </ListGroup>
            <Button
              type="button"
              color="info"
              onClick={e => this.handleEdit(e, data)}
            >
              Edit
            </Button>
          </Col>
        </Jumbotron>
      </div>
    );
  };

  render() {
    let termsContentAdmin = this.state.termsAndConditions.map(this.mapData);
    console.log(this.state.termsAndConditions);
    return (
      <React.Fragment>
        <ContentWrapper>
          <div className="container container-md">
            <div className="row mb-3">
              <div className="col-lg-8">
                <div className="h4 text-bold ">Good dog Terms of Service</div>
              </div>
            </div>
          </div>
          <div>{termsContentAdmin}</div>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}
export default withRouter(DisplayTermsAndConditionsAdmin);
