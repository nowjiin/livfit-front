import { useLogin } from "@hooks/useLogin";
import logo from "@images/login/logo.svg";
import BackButton from "./BackButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  LoginContainer,
  LoginBox,
  Header,
  LogoDiv,
  Form,
  InputDiv,
  Input,
  LoginButton,
  KeepLoggedIn,
  Checkbox,
  CheckboxLabel,
  Links,
  Container,
} from "./LoginStyles";

const Login = () => {
  const [loginId, setloginId] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const { signIn } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    signIn({ loginId, password });
  };

  return (
    <LoginContainer>
      <Header>
        <BackButton />
      </Header>
      <LoginBox>
        <LogoDiv>
          <img src={logo} alt="logo" />
        </LogoDiv>
        <Form onSubmit={handleLogin}>
          <InputDiv>
            <Input
              type="text"
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setloginId(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton type="submit">로그인</LoginButton>
          </InputDiv>
          <Container>
            <KeepLoggedIn>
              <Checkbox
                type="checkbox"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />{" "}
              <CheckboxLabel htmlFor="keepLoggedIn" />
              <span>로그인 상태 유지</span>{" "}
            </KeepLoggedIn>
            <Links>
              <Link to="/auth/signup">회원가입</Link>
            </Links>
          </Container>
          <div>
            <span>심사용 id & pw 입니다</span>
            <br></br>
            <span>ID : likelion</span>
            <br></br>
            <span>PW : 1234</span>
          </div>
        </Form>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
