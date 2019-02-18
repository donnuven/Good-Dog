import React from "react";
import Dragula from "dragula";
import ContentWrapper from "../Layout/ContentWrapper";
import { withRouter } from "react-router-dom";
import { Col, Button, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";
import * as privacyPolicyService from "../../services/privacyPolicyService";

class DisplayPrivacyPolicyAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privacyPolicy: []
    };
    this.dragula = new Dragula([]);
    this.dragula.on("drop", this.handleDrop);
  }

  handleDrop = (el, sibling, source, target) => {
    debugger;
    console.log("This is the element", el);
    console.log("This is the sibling", sibling);
    console.log("This is the target", target);
    console.log("This is the source", source);

    let newPrivacyPolicy = [];
    for (let i = 0; i < this.state.privacyPolicy.length; i++) {
      //check to see if the new privacy policy has an index of the id.
      let newPrivacyPolicy = this.state.privacyPolicy.id;
      let oldPrivacyPolicy = this.state.privacyPolicy.find(newPrivacyPolicy => {
        return newPrivacyPolicy;
      });
      console.log(
        "This is an index of the new privacy policy:",
        this.state.privacyPolicy[i].id
      );
      console.log("This is the new privacy policy", newPrivacyPolicy.id);
      console.log("This is the original privacy policy", oldPrivacyPolicy);
      newPrivacyPolicy.push(oldPrivacyPolicy);
    }
    console.log(this.dragula);
    this.dragula.cancel(true);
    this.setState({ privacyPolicy: [...newPrivacyPolicy] });
  };

  addDraggable = el => {
    console.log("This is the element", el);
    this.dragula.containers.push(el);
    console.log("dragula is an instance of a new array", this.dragula);
    console.log("dragula has a element container", this.dragula.containers);
  };

  handleEdit = (e, data) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.history.push("/privacypolicy/" + data.id + "/edit", {
      state: data.id
    });
    console.log(data);
  };

  onGetPrivacyPolicySuccess = response => {
    this.setState({ privacyPolicy: response.items });
    console.log(response);
    console.log("Privacy policy has been retrieved.");
  };

  onGetPrivacyPolicyError = error => {
    console.log(error);
    console.log("Fail to retrieve privacy policy.");
  };

  componentDidMount() {
    privacyPolicyService
      .getPrivacyPolicy()
      .then(this.onGetPrivacyPolicySuccess)
      .catch(this.onGetPrivacyPolicyError);
  }

  privacyMapData = (data, index) => {
    return (
      <div id={data.id} key={index}>
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
          <div style={{ display: "flex" }}>
            <div ref={this.addDraggable}>{privacyContent}</div>
          </div>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}
export default withRouter(DisplayPrivacyPolicyAdmin);
