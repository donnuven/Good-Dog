import React from "react";
import ContentWrapper from "../Layout/ContentWrapper";
import { Col, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";
import * as privacyPolicyService from "../../services/privacyPolicyService";

class DisplayPrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privacyPolicy: []
    };
  }

  onGetPrivacyPolicySuccess = response => {
    this.setState({ privacyPolicy: response.items });
    console.log(response);
    console.log("Privacy policy has been retrieved.");
  };

  onGetPrivacyPolicyError = error => {
    console.log(error);
    console.log("Failed to retrieve privacy policy.");
  };

  componentDidMount() {
    privacyPolicyService
      .getPrivacyPolicy()
      .then(this.onGetPrivacyPolicySuccess)
      .catch(this.onGetPrivacyPolicyError);
  }

  privacyMapData = data => {
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
    let privacyContent = this.state.privacyPolicy.map(this.privacyMapData);
    return (
      <React.Fragment>
        <ContentWrapper>
          <div className="container container-md">
            <div className="row mb-3">
              <div className="col-lg-8">
                <div className="h4 text-bold ">Good Dog Privacy Policy</div>
              </div>
            </div>
          </div>
          <div>{privacyContent}</div>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}
export default DisplayPrivacyPolicy;
