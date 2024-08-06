import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Input } from "./LoginStyles";
import BackButton from "./BackButton";

const SignupContainer = styled.div`
  display: flex;
  max-width: 500px;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f6f8f8;
  color: #6a6a6a;
  font-size: 12px;
  margin: 0 auto; 
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 10px;
  position: relative;
`;

const Content = styled.div`
  padding: 40px;
  border-radius: 8px;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #6a6a6a;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  background-color: #fb8500;
  color: white;
  border: none;
  border-radius: 32px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CheckButton = styled.button`
  position: absolute;
  top: 0;
  right: 5px;
  z-index: 1;
  height: 33px;
  width: 90px;
  background-color: transparent;
  color: black;
  border-radius: 32px;
  cursor: pointer;
  margin-top: 8px;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: transparent;
    cursor: not-allowed;
  }
`;

const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Signup = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 아이디가 중복 확인 되었고, 비밀번호가 입력된 상태를 확인
    setIsButtonDisabled(!(isIdChecked && password));
  }, [isIdChecked, password]);

  const handleSignup = async () => {
    setIsButtonDisabled(true);
    try {
      const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;

      const response = await axios.post(`${serverUrl}/api/users/register`, {
        loginId: id,
        password: password,
      });

      if (response.status === 200) {
        // Handle successful signup
        alert(`회원가입이 완료되었습니다. 아이디: ${id}`);
        navigate("/");
      }
    } catch (error) {
      // Handle error
      console.error("Signup error:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleCheckId = async () => {
    setIsChecking(true);
    try {
      const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;
      console.log("Checking ID at URL:", `${serverUrl}/api/users/check-id`);
      console.log("Checking ID for:", id);

      const response = await axios.get(`${serverUrl}/api/users/check-id`, {
        params: { loginId: id },
      });

      console.log("Server response:", response);

      if (response.status === 200 && response.data.available) {
        alert("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
        // 아이디 중복 확인이 완료되면 완료 버튼을 활성화
        if (password) {
          setIsButtonDisabled(false);
        }
      } else {
        alert("이미 사용 중인 아이디입니다.");
        setIsIdChecked(false);
        setIsButtonDisabled(true);
      }
    } catch (error) {
      console.error(
        "ID check error:",
        error.response || error.message || error
      );
      alert("아이디 중복입니다! 다른 아이디를 사용해주세요.");
      setIsIdChecked(false);
      setIsButtonDisabled(true);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <SignupContainer>
      <Header>
        <BackButton />
      </Header>
      <Content>
        <Title>회원가입</Title>
        <br />
        <Row>
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setIsIdChecked(false); // 아이디가 변경되면 완료 버튼을 다시 비활성화
            }}
          />
          <CheckButton onClick={handleCheckId} disabled={isChecking || !id}>
            중복확인
          </CheckButton>
        </Row>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton onClick={handleSignup} disabled={isButtonDisabled}>
          완료
        </SubmitButton>
      </Content>
    </SignupContainer>
  );
};

export default Signup;
