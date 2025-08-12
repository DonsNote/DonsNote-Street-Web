import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import axios from 'axios';

const SignUpPage: React.FC = () => {
  // Form fields state
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Email verification state
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // UI state
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = {
    password: '',
    confirmPassword: '',
    verification: '',
    email: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // --- Validation Logic ---
  useEffect(() => {
    const validateForm = () => {
      const newErrors = { ...errors, password: '', confirmPassword: '' };
      let isValid = true;

      // Password strength
      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
      if (password && !passwordRegex.test(password)) {
        newErrors.password = '비밀번호는 대문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.';
        isValid = false;
      }

      // Password confirmation
      if (confirmPassword && password !== confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        isValid = false;
      }
      
      // Check if all fields are filled and email is verified
      if (!nickname || !email || !password || !confirmPassword || !isEmailVerified) {
        isValid = false;
      }

      setErrors(newErrors);
      setIsFormValid(isValid && !newErrors.password && !newErrors.confirmPassword && !newErrors.email && !newErrors.verification);
    };

    validateForm();
  }, [nickname, email, password, confirmPassword, isEmailVerified, errors.verification, errors.email]);

  // --- Handlers ---
  const handleSendCode = async () => {
    if (!email) {
      setErrors({ ...errors, email: '이메일을 입력해주세요.' });
      return;
    }
    setErrors({ ...errors, email: '' });

    try {
      await axios.post('http://localhost:3000/auth/send-verification-code', { email });
      setIsCodeSent(true);
      setIsEmailVerified(false);
      setErrors({ ...errors, verification: '' });
      alert('인증 코드가 발송되었습니다. 이메일을 확인해주세요.');
    } catch (error: any) {
      console.error('Error sending verification code:', error);
      setErrors({ ...errors, verification: error.response?.data?.message || '인증 코드 발송에 실패했습니다.' });
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setErrors({ ...errors, verification: '인증 코드를 입력해주세요.' });
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/verify-email-code', { email, code: verificationCode });
      setIsEmailVerified(true);
      setErrors({ ...errors, verification: '' });
      alert('이메일 인증이 완료되었습니다.');
    } catch (error: any) {
      console.error('Error verifying code:', error);
      setIsEmailVerified(false);
      setErrors({ ...errors, verification: error.response?.data?.message || '인증 코드가 올바르지 않습니다.' });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      console.log('Form submitted', { nickname, email, password });
      // Handle actual form submission logic here
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">회원가입</h2>
          <Form noValidate onSubmit={handleSubmit}>
            {/* Nickname */}
            <Form.Group className="mb-3" controlId="formBasicNickname">
              <Form.Label>닉네임</Form.Label>
              <Form.Control type="text" placeholder="닉네임을 입력하세요" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일 주소</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  isInvalid={!!errors.email}
                  disabled={isEmailVerified}
                />
                <Button variant="outline-secondary" onClick={handleSendCode} disabled={isEmailVerified || !email}>
                  인증코드 발송
                </Button>
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Verification Code */}
            {isCodeSent && !isEmailVerified && (
              <Form.Group className="mb-3" controlId="formVerificationCode">
                <Form.Label>인증코드</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="4자리 코드를 입력하세요"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    isInvalid={!!errors.verification}
                  />
                  <Button variant="outline-secondary" onClick={handleVerifyCode}>
                    인증코드 확인
                  </Button>
                  <Form.Control.Feedback type="invalid">{errors.verification}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            )}
            {isEmailVerified && <Alert variant="success">이메일 인증이 완료되었습니다.</Alert>}

            {/* Password */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  required
                />
                <Button variant="outline-secondary" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <Eye /> : <EyeSlash />}
                </Button>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>비밀번호 확인</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={!!errors.confirmPassword}
                  required
                />
                <Button variant="outline-secondary" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  {confirmPasswordVisible ? <Eye /> : <EyeSlash />}
                </Button>
                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" disabled={!isFormValid}>
                회원가입
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;