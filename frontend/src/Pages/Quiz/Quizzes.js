import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
export default function Quizzes() {
  const [pin, setPin] = useState();
  useEffect(() => {}, []);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resp = await fetch(`/quizzes/by-pin/${pin}`);
    const respJSON = await resp.json();
    if (resp.ok) {
      const { _id } = respJSON; // get quiz id
      navigate(`/quizzes/${_id}`);
    } else {
      console.log(respJSON);
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Row>
        <Col className="text-center">
          <h1>Take Quiz</h1>

          <h2>Enter Pin</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <input
                value={pin}
                onChange={(event) => setPin(event.target.value)}
              />
            </Form.Group>

            <br />
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
