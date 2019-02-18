import * as faqService from "../../services/faqService";
import React from "react";
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

class FaqsListPublic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  onGetFaqByCategorySuccess = response => {
    this.setState({ categories: response.items });
    console.log(response);
  };

  onGetFaqByCategoryError = error => {
    console.log(error);
  };

  componentDidMount() {
    faqService
      .getFaqByCategories()
      .then(this.onGetFaqByCategorySuccess)
      .catch(this.onGetFaqByCategoryError);
  }

  faqList() {
    return this.state.categories.map(item => {
      return (
        <div key={item.id}>
          <h4>{item.name}</h4>
          {item.faqList.map(faq => (
            <div key={faq.id}>
              <Col md="12">
                <Card className=" mt-2">
                  <h4 className="card-title">
                    <Button color="link" id={"collapse" + faq.id} size="med">
                      +
                    </Button>
                    <a
                      className="text-inherit"
                      data-parent="#accordionOne"
                      aria-expanded="true"
                    >
                      <span>{faq.question}</span>
                    </a>
                  </h4>
                  <UncontrolledCollapse toggler={"collapse" + faq.id}>
                    <Card>
                      <CardBody>
                        <ListGroup>
                          <ListGroupItem>
                            <span>Answer:{faq.answer}</span>
                          </ListGroupItem>
                        </ListGroup>
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </Card>
              </Col>
            </div>
          ))}
        </div>
      );
    });
  }

  render() {
    const faqList = this.faqList();
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
            <div>{faqList}</div>
          </div>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}
export default FaqsListPublic;
