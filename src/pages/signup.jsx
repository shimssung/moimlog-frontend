import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { FaCheckCircle, FaTimesCircle, FaRegCircle } from "react-icons/fa";
import Link from "next/link";

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
    <>
      <Header>
        <HeaderContent>
          <Logo>
            <Link href="/" passHref>
              <LogoText>MoimLog</LogoText>
            </Link>
          </Logo>
        </HeaderContent>
      </Header>
      <PageWrap>
        <LeftSection>
          <LeftTitle>MoimLog에 오신 걸 환영합니다!</LeftTitle>
          <LeftDesc>
            다양한 모임을 만들고, 참여하며<br />
            새로운 사람들과 함께 성장해보세요.
          </LeftDesc>
        </LeftSection>
        <RightSection>
          <FormContainer>
            <Title>회원가입</Title>
            <FormBox onSubmit={handleSubmit}>
              <Label>이메일</Label>
              <Input
                name="email"
                placeholder="example@inflab.com"
                value={form.email}
                onChange={handleChange}
                required
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
                required
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
            <Footer>
              <p>이미 회원이신가요? <a href="/login">로그인</a></p>
            </Footer>
          </FormContainer>
        </RightSection>
      </PageWrap>
    </>
  );
}

export default SignupPage;

const PageWrap = styled.div`
  display: flex;
  min-height: 100vh;
  background: #111827;
  justify-content: center;
  align-items: center;
  padding: 96px 32px 32px 32px;
  gap: 48px;

  /* 반응형: 1230px 이하에서는 세로로 쌓이고, 패딩/정렬 변경 */
  @media (max-width: 1230px) {
    flex-direction: column; // 좌우 → 상하로 쌓임
    gap: 0;
    padding: 88px 0 0 0; // 상단 패딩만 남김
    align-items: stretch; // stretch로 영역 확장
  }
`;

const LeftSection = styled.div`
  flex: 0 0 620px;
  background: transparent;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 48px 0 48px 48px;
  gap: 32px;

  /* 반응형: 1230px 이하에서 패딩/정렬/텍스트 중앙 정렬로 변경 */
  @media (max-width: 1230px) {
    flex: none;
    padding: 32px 16px 32px 16px; // 패딩 축소
    align-items: center; // 중앙 정렬
    text-align: center; // 텍스트 중앙 정렬
  }
`;

const LeftTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 16px;
`;

const LeftDesc = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  opacity: 0.85;
`;

const RightSection = styled.div`
  flex: 0 0 620px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 28rem;
  position: relative;
  top: 0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 2rem;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: stretch;
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
    color: #9ca3af;
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
  margin: 1.5rem 0;
  color: #6b7280;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e5e7eb;
  }

  span {
    margin: 0 0.75rem;
    font-size: 0.875rem;
  }
`;

const SocialLoginButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 0.875rem;
  height: 44px;

  ${(props) =>
    props.variant === "kakao" &&
    `
    background-color: #FEE500;
    color: #000000;
    border: none;
    &:hover {
      background-color: #F6E000;
      border: none;
    }
  `}

  ${(props) =>
    props.variant === "google" &&
    `
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #dadce0;
    &:hover {
      background-color: #f8f9fa;
      border-color: #dadce0;
    }
  `}

  ${(props) =>
    props.variant === "naver" &&
    `
    background-color: #03C75A;
    color: #fff;
    border: none;
    &:hover { background-color: #1EC800; }
  `}
`;

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;

  p {
    margin: 0.5rem 0;
  }
`;

const Header = styled.header`
  width: 100vw;
  min-width: 360px;
  height: 64px;
  display: flex;
  align-items: center;
  background: transparent;
  padding: 0 48px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  /* 반응형: 1230px 이하에서 패딩/높이 축소 */
  @media (max-width: 1230px) {
    justify-content: center;
  }
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
  margin: 0;

  /* 반응형: 1230px 이하에서 폰트 크기 축소 */
  @media (max-width: 1230px) {
    font-size: 2rem;
  }
`; 