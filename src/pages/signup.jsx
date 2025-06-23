import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";
import { FaCheckCircle, FaTimesCircle, FaRegCircle } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTheme } from "../utils/ThemeContext";

function SignupPage() {
  const { theme } = useTheme();
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
    toast.success("회원가입이 완료되었습니다!");
    setForm({ email: "", password: "", password2: "" });
  };

  const footerContent = (
    <p>
      이미 회원이신가요?{" "}
      <Link href="/login">
        <StyledLink theme={theme}>로그인</StyledLink>
      </Link>
    </p>
  );

  return (
    <AuthLayout
      leftTitle="MoimLog에 오신 걸 환영합니다!"
      leftDesc={
        <>
          다양한 모임을 만들고, 참여하며
          <br />
          새로운 사람들과 함께 성장해보세요.
        </>
      }
      formTitle="회원가입"
      footerContent={footerContent}
    >
      <FormBox onSubmit={handleSubmit}>
        <Label theme={theme}>이메일</Label>
        <Input
          name="email"
          placeholder="example@inflab.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Label theme={theme}>비밀번호</Label>
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
          required
        />
        <PwDesc theme={theme}>
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
        <Label theme={theme}>비밀번호 확인</Label>
        <Input
          name="password2"
          type="password"
          placeholder="비밀번호 확인"
          value={form.password2}
          onChange={handleChange}
          required
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button
          type="submit"
          fullWidth
          variant="primary"
          style={{ margin: "24px 0 0 0" }}
        >
          가입하기
        </Button>
      </FormBox>
    </AuthLayout>
  );
}

export default SignupPage;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: stretch;
`;

const Label = styled.label`
  font-size: 15px;
  color: ${(props) => props.theme.textPrimary};
  margin: 12px 0 4px 2px;
  font-weight: 500;
  transition: color 0.3s ease;
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
    color: ${(props) => props.theme.textTertiary};
    transition: color 0.3s ease;
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

const StyledLink = styled.span`
  color: ${(props) => props.theme.buttonPrimary};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.buttonHover};
  }
`;
