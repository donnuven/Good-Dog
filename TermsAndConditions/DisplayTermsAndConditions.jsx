import React from "react";
import ContentWrapper from "../Layout/ContentWrapper";
import { Col, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";
import * as termsAndConditionsService from "../../services/termsAndConditionsService";

class DisplayTermsAndConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAndConditions: []
    };
  }
  onGetTermsAndConditionsSuccess = response => {
    this.setState({ termsAndConditions: response.items });
    console.log(response.items);
    console.log("Terms and conditions have been retrieved!");
  };

  onGetTermsAndConditionsError = error => {
    console.log(error);
    console.log("Failed to retrieve terms and conditions!");
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
            </ListGroup>
          </Col>
        </Jumbotron>
      </div>
    );
  };

  render() {
    let termsContent = this.state.termsAndConditions.map(this.mapData);
    console.log(this.state);
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
          <div>{termsContent}</div>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}
export default DisplayTermsAndConditions;
