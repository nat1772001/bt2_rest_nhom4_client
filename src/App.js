import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

function App() {
  const [orderNumber, setOrderNumber] = useState([]);
  const [companyID, setCompanyID] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    setStatus(null);
  }, []);

  const checkStatus = () => {
    fetch(
      `http://localhost:8080/orderStatus?orderNumber=${orderNumber}&companyID=${companyID}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setStatus(json);
      });
  };

  return (
    <div className="App">
      <Row>
        <Col>
          <Container className="mt-3">
            <h1>Kiểm tra trạng thái</h1>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Mã đơn hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Order Number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mã công ty</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="company ID"
                  value={companyID}
                  onChange={(e) => setCompanyID(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Button variant="primary" onClick={checkStatus}>
                  Kiểm tra
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Col>
        <Col>
          <Container className="mt-3">
            {!status ? (
              <></>
            ) : status.response !== "null" ? (
              <Alert variant="primary">
                <h5>Trạng thái đơn hàng: {status.response}</h5>
              </Alert>
            ) : (
              <Alert variant="danger">Không tìm thấy thông tin đơn hàng!</Alert>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default App;
