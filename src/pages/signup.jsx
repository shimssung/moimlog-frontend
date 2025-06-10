import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import kakaoIcon from "/kakao_icon.png";
import googleIcon from "/google_icon.png";
import naverIcon from "/naver_icon.svg";
import { FaCheckCircle, FaTimesCircle, FaRegCircle } from "react-icons/fa";

function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [pwChecks, setPwChecks] = useState({
    rule1: false, // 영문/숫자/특수문자 2종 이상
    rule2: false, // 8~32자
    rule3: true, // 연속 3자 이상 동일 문자/숫자 없음
  });
  const [pwTouched, setPwTouched] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handlePasswordChange = (e) => {
    const pw = e.target.value;
    setForm({ ...form, password: pw });
    setError("");
    setPwTouched(pw.length > 0);
    setPwChecks({
      rule1: /(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()_+\-={};':"\\|,.<>/?]).*/.test(
        pw
      ),
      rule2: pw.length >= 8 && pw.length <= 32,
      rule3: !/([a-zA-Z0-9])\1\1/.test(pw),
    });
  };

  const validate = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return "이메일 형식이 올바르지 않습니다.";
    if (
      !/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()_+\-={};':"\\|,.<>/?]).{8,32}$/.test(
        form.password
      )
    )
      return "비밀번호는 영문/숫자/특수문자 중 2가지 이상 포함, 8~32자여야 합니다.";
    if (/([a-zA-Z0-9])\1\1/.test(form.password))
      return "연속 3자 이상 동일한 문자/숫자는 사용할 수 없습니다.";
    if (form.password !== form.password2)
      return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    alert("회원가입이 완료되었습니다!");
    setForm({ email: "", password: "", password2: "" });
  };

  return (
    <Wrap>
      <FormBox onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <Label>이메일</Label>
        <Input
          name="email"
          placeholder="example@inflab.com"
          value={form.email}
          onChange={handleChange}
        />
        <Label>비밀번호</Label>
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handlePasswordChange}
          style={{
            borderColor:
              !pwChecks.rule1 || !pwChecks.rule2 || !pwChecks.rule3
                ? "#ef4444"
                : undefined,
          }}
        />
        <PwDesc>
          <li className={!pwTouched ? "" : pwChecks.rule1 ? "pass" : "fail"}>
            {!pwTouched ? (
              <FaRegCircle />
            ) : pwChecks.rule1 ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}
            영문/숫자/특수문자 중, 2가지 이상 포함
          </li>
          <li className={!pwTouched ? "" : pwChecks.rule2 ? "pass" : "fail"}>
            {!pwTouched ? (
              <FaRegCircle />
            ) : pwChecks.rule2 ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}
            8자 이상 32자 이하 입력 (공백 제외)
          </li>
          <li className={!pwTouched ? "" : pwChecks.rule3 ? "pass" : "fail"}>
            {!pwTouched ? (
              <FaRegCircle />
            ) : pwChecks.rule3 ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}
            연속 3자 이상 동일한 문자/숫자 제외
          </li>
        </PwDesc>
        <Label>비밀번호 확인</Label>
        <Input
          name="password2"
          type="password"
          placeholder="비밀번호 확인"
          value={form.password2}
          onChange={handleChange}
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button
          type="submit"
          fullWidth
          size="large"
          variant="primary"
          style={{ margin: "24px 0 0 0" }}
        >
          가입하기
        </Button>
        <Divider>
          <span>간편 회원가입</span>
        </Divider>
        <SocialRow>
          <SocialBtn
            bg="#FEE500"
            color="#191600"
            onClick={() => alert("카카오로 회원가입")}
          >
            <img src={kakaoIcon} alt="카카오" width={24} height={24} />
          </SocialBtn>
          <SocialBtn
            bg="#fff"
            color="#222"
            border
            onClick={() => alert("구글로 회원가입")}
          >
            <img src={googleIcon} alt="구글" width={24} height={24} />
          </SocialBtn>
          <SocialBtn
            bg="#03C75A"
            color="#03C75A"
            border
            onClick={() => alert("네이버로로 회원가입")}
          >
            <img src={naverIcon} alt="네이버버" width={24} height={24} />
          </SocialBtn>
        </SocialRow>
      </FormBox>
    </Wrap>
  );
}

export default SignupPage;

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
`;
const FormBox = styled.form`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px #0001;
  padding: 32px 20px 24px 20px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: stretch;
`;
const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 28px;
  color: #222;
  text-align: center;
  font-weight: 700;
`;
const Label = styled.label`
  font-size: 15px;
  color: #222;
  margin: 12px 0 4px 2px;
  font-weight: 500;
`;
const PwDesc = styled.ul`
  margin: 6px 0 0 0;
  padding: 0 0 0 0;
  font-size: 13px;
  line-height: 1.7;
  list-style: none;
  li {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #9ca3af; /* 기본 회색 */
    &.fail {
      color: #ef4444;
    }
    &.pass {
      color: #22c55e;
    }
    svg {
      font-size: 16px;
    }
  }
`;
const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 14px;
  text-align: center;
  margin: 8px 0 -8px;
`;
const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0 0 0;
  color: #9ca3af;
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 1px solid #e5e7eb;
  }
  span {
    margin: 0 12px;
    background: #fff;
    padding: 0 8px;
    font-size: 13px;
  }
`;
const SocialRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  justify-content: center;
`;
const SocialBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${(props) => props.bg || "#fff"};
  color: ${(props) => props.color || "#222"};
  border: ${(props) => (props.border ? "1px solid #e5e7eb" : "none")};
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    filter: brightness(0.95);
  }
`; 