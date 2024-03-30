import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      localStorage.removeItem('user');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (formData.userName !== '' && formData.password !== '') {
      axios
        .get(
          `http://localhost:3000/users?username=${formData.userName}&password=${formData.password}`
        )
        .then(function (response) {
          localStorage.setItem('user', JSON.stringify(response.data[0]));
          navigate('/posts');
        })
        .catch(function () {
          alert('username or  password is incorrect');
        });
    }

    /**
     * kt username, password !=''
     * call api nhu post detail truyen quen query username , password
     *  -> get data, if has data success, fail
     */
  };
  function hangleChangeData(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form.Label htmlFor="inputPassword5">UserName</Form.Label>
          <Form.Control
            onChange={hangleChangeData}
            name="userName"
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted></Form.Text>
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            onChange={hangleChangeData}
            name="password"
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted></Form.Text>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleLogin}
              style={{ height: '35px', marginTop: 5, width: '30%' }}
              variant="primary"
            >
              Login
            </Button>
          </div>
          <Link to={'/register'}>Register New Account</Link>
        </Col>
      </Row>
    </Container>
  );
}
