import React from 'react';
import { Container, Button, Row, Col, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-md-center text-center" style={{ minHeight: '100vh' }}>
        <Col xs={12} md={6} className="my-auto">
          <div className="logo-placeholder mb-5">
            {/* You can place your logo here */}
            <div style={{
              width: '150px',
              height: '150px',
              backgroundColor: '#e9ecef',
              borderRadius: '50%',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#adb5bd' }}>Logo</span>
            </div>
          </div>
          
          <Stack gap={3}>
            <Button as={Link} to="/login" variant="primary" size="lg">아이디로 로그인</Button>
            <Button variant="dark" size="lg">Apple로 로그인</Button>
            <Button variant="light" size="lg">Google로 로그인</Button>
            <Button as={Link} to="/signup" variant="outline-secondary" size="lg">회원가입</Button>
          </Stack>

        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;