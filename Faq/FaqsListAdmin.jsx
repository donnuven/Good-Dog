import React from "react";
import { withRouter } from "react-router-dom";
import * as faqService from "../../services/faqService";
import ContentWrapper from "../Layout/ContentWrapper";
import {
  Button,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  UncontrolledCollapse
} from "reactstrap";

class FaqsListAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faq: [],
      categories: {}
    };
  }

  handleEdit = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.history.push("/faqs/" + item.id + "/edit", {
      state: item.id
    });
    console.log(item);
  };

  componentDidMount() {
    faqService
      .getFaq()
      .then(this.onGetFaqSuccess)
      .catch(this.onGetFaqError);
  }

  onGetFaqSuccess = response => {
    let categories = this.state.categories;
    console.log("FaqsList.onGetSuccess #1", response);

    for (var i = 0; i < response.items.length; i++) {
      if (!categories[response.items[i].categoryId]) {
        categories[response.items[i].categoryId] = [];
      }
      categories[response.items[i].categoryId].push(response.items[i]);
    }

    this.setState({
      faq: response.items,
      categories: categories
    });
    console.log("FaqsList.onGetSuccess #2", categories);
  };

  onGetFaqError = error => {
    console.log(error);
  };

  mapData = item => {
    return (
      <div key={item.id}>
        <Col md="12">
          <Card className=" mt-2">
            <h4 className="card-title">
              <Button color="link" id={"collapse" + item.id} size="med">
                +
              </Button>
              <a
                className="text-inherit"
                data-toggle="collapse"
                data-parent="#accordionOne"
                aria-controls={"collapse" + item.id}
                aria-expanded="true"
                href={"#collapse" + item.id}
              >
                <span id={"collapse" + item.id}>{item.question}</span>
              </a>
            </h4>
            <UncontrolledCollapse toggler={"collapse" + item.id}>
              <Card>
                <CardBody>
                  <ListGroup>
                    <ListGroupItem>
                      <span> Category Id: {item.categoryId}</span>
                    </ListGroupItem>
                    <ListGroupItem>
                      <span>Answer: {item.answer}</span>
                    </ListGroupItem>
                    <ListGroupItem>
                      <span>Sort Order: {item.sortOrder}</span>
                    </ListGroupItem>
                  </ListGroup>
                  <div className="mt-3">
                    <Button
                      type="button"
                      color="info"
                      onClick={e => this.handleEdit(e, item)}
                    >
                      Edit
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </Card>
        </Col>
      </div>
    );
  };

  render() {
    let faqContent = this.state.faq.map(this.mapData);
    return (
      <React.Fragment>
        <ContentWrapper>
          <div className="container container-md">
            <div className="row mb-3">
              <div className="col-lg-8">
                <div className="h1 text-bold">FAQs</div>
                <p className="text-muted">
                  Praesent id mauris urna, et tristique lectus. Pellentesque
                  habitant morbi tristique senectus et netus et malesuada fames
                  ac turpis egestas.
                </p>
              </div>
            </div>
            <div>{faqContent}</div>
          </div>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}
export default withRouter(FaqsListAdmin);
