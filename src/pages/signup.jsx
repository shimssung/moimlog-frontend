import React, { useState, useRef } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";
import { FaCheckCircle, FaTimesCircle, FaRegCircle } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTheme } from "../utils/ThemeContext";
import { authAPI } from "../api/auth";
import { useRouter } from "next/router";

function SignupPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [form, setForm] = useState({
    emailId: "",
    emailDomain: "",
    password: "",
    password2: "",
    verificationCode: "",
    name: "",
  });
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [showCustomDomain, setShowCustomDomain] = useState(false);
  const [pwChecks, setPwChecks] = useState({
    rule1: false, // 영문/숫자/특수문자 2종 이상
    rule2: false, // 8~32자
    rule3: true, // 연속 3자 이상 동일 문자/숫자 없음
  });
  const [pwTouched, setPwTouched] = useState(false);

  // 이메일 인증 관련 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [countdown, setCountdown] = useState(0);

  // refs for focus
  const emailIdRef = useRef(null);
  const emailDomainRef = useRef(null);
  const verificationCodeRef = useRef(null);

  // 이메일 도메인 옵션
  const emailDomains = [
    "gmail.com",
    "naver.com",
    "daum.net",
    "kakao.com",
    "outlook.com",
    "yahoo.com",
    "직접입력",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setEmailError(""); // 이메일 에러 초기화
    setVerificationError("");
  };

  // 이메일 필드 포커스 아웃 시 에러 초기화
  const handleEmailBlur = () => {
    // 이메일이 변경되면 인증 상태 초기화
    setIsEmailVerified(false);
    setForm((prev) => ({ ...prev, verificationCode: "" }));
  };

  // 도메인 선택 처리
  const handleDomainChange = (e) => {
    const value = e.target.value;

    if (value === "직접입력") {
      setShowCustomDomain(true);
      setForm((prev) => ({ ...prev, emailDomain: "", verificationCode: "" }));
    } else {
      setShowCustomDomain(false);
      setCustomDomain("");
      setForm((prev) => ({
        ...prev,
        emailDomain: value,
        verificationCode: "",
      }));
    }
    setEmailError("");
    // 이메일이 변경되면 인증 상태 초기화
    setIsEmailVerified(false);
  };

  // 직접 입력 도메인 처리
  const handleCustomDomainChange = (e) => {
    setCustomDomain(e.target.value);
    setForm({ ...form, emailDomain: e.target.value });
    setEmailError("");
    // 이메일이 변경되면 인증 상태 초기화
    setIsEmailVerified(false);
    setForm({ ...form, verificationCode: "" });
  };

  // 전체 이메일 주소 생성
  const getFullEmail = () => {
    if (!form.emailId) return "";

    let domain = "";
    if (showCustomDomain) {
      domain = customDomain;
    } else {
      domain = form.emailDomain;
    }

    if (!domain) return "";
    const fullEmail = `${form.emailId}@${domain}`;
    return fullEmail;
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

  // 인증 코드 발송
  const handleSendVerificationCode = async () => {
    const fullEmail = getFullEmail();
    if (!fullEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fullEmail)) {
      setVerificationError("올바른 이메일 주소를 입력해주세요.");
      return;
    }

    setIsSendingCode(true);
    setVerificationError("");
    setEmailError(""); // 이메일 에러 초기화

    try {
      const response = await authAPI.sendVerificationCode(fullEmail);
      if (response.success) {
        toast.success("인증 코드가 발송되었습니다. 이메일을 확인해주세요.");
        setCountdown(180); // 3분 카운트다운
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        // 백엔드에서 중복 확인 결과를 반환
        if (response.message && response.message.includes("이미 가입된")) {
          setEmailError("이미 사용 중인 이메일입니다.");
          setVerificationError("이미 사용 중인 이메일입니다.");
        } else {
          setVerificationError(
            response.message || "인증 코드 발송에 실패했습니다."
          );
        }
      }
    } catch (error) {
      // 네트워크 오류 등
      setVerificationError(
        error.message || "인증 코드 발송 중 오류가 발생했습니다."
      );
    } finally {
      setIsSendingCode(false);
    }
  };

  // 인증 코드 검증
  const handleVerifyCode = async () => {
    const fullEmail = getFullEmail();
    if (!form.verificationCode.trim()) {
      setVerificationError("인증 코드를 입력해주세요.");
      return;
    }

    setIsVerifyingCode(true);
    setVerificationError("");

    try {
      const response = await authAPI.verifyEmailCode(
        fullEmail,
        form.verificationCode
      );
      if (response.success) {
        setIsEmailVerified(true);
        toast.success("이메일 인증이 완료되었습니다.");
        setVerificationError("");
      } else {
        setVerificationError(
          response.message || "인증 코드가 올바르지 않습니다."
        );
      }
    } catch (error) {
      setVerificationError(
        error.message || "인증 코드 검증 중 오류가 발생했습니다."
      );
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const validate = () => {
    const fullEmail = getFullEmail();
    if (!fullEmail) return "이메일을 입력해주세요.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fullEmail))
      return "이메일 형식이 올바르지 않습니다.";
    if (emailError) return "이메일 중복 확인을 해주세요.";
    if (!isEmailVerified) return "이메일 인증을 완료해주세요.";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) return setError(err);

    setIsLoading(true);
    setError("");

    try {
      // 회원가입 API 호출
      const response = await authAPI.signup({
        email: getFullEmail(),
        password: form.password,
        name: form.name,
      });

      if (response.success) {
        toast.success("회원가입이 완료되었습니다! 로그인해주세요.");
        router.push("/login");
      } else {
        setError(response.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setError(error.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
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
        <EmailContainer>
          <EmailInputGroup>
            <Input
              ref={emailIdRef}
              name="emailId"
              placeholder="아이디"
              value={form.emailId}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              style={{
                borderColor: emailError ? "#ef4444" : undefined,
              }}
              required
            />
            <AtSymbol>@</AtSymbol>
            {!showCustomDomain ? (
              <Select
                ref={emailDomainRef}
                name="emailDomain"
                value={form.emailDomain}
                onChange={handleDomainChange}
                onBlur={handleEmailBlur}
                style={{
                  borderColor: emailError ? "#ef4444" : undefined,
                }}
                required
              >
                <option value="">도메인 선택</option>
                {emailDomains.slice(0, -1).map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
                <option value="직접입력">직접입력</option>
              </Select>
            ) : (
              <Input
                ref={emailDomainRef}
                name="emailDomain"
                placeholder="도메인 직접 입력 (예: example.com)"
                value={customDomain}
                onChange={handleCustomDomainChange}
                onBlur={handleEmailBlur}
                style={{
                  borderColor: emailError ? "#ef4444" : undefined,
                }}
                required
              />
            )}
          </EmailInputGroup>
        </EmailContainer>
        {emailError && <ErrorMsg>{emailError}</ErrorMsg>}

        {/* 이메일 인증 섹션 */}
        <VerificationSection>
          <VerificationButton
            type="button"
            onClick={handleSendVerificationCode}
            disabled={
              isSendingCode ||
              countdown > 0 ||
              !getFullEmail() ||
              !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(getFullEmail())
            }
            theme={theme}
          >
            {isSendingCode
              ? "발송 중..."
              : countdown > 0
              ? `재발송 (${Math.floor(countdown / 60)}:${(countdown % 60)
                  .toString()
                  .padStart(2, "0")})`
              : "인증 코드 발송"}
          </VerificationButton>

          {countdown > 0 && (
            <VerificationInputGroup>
              <Input
                ref={verificationCodeRef}
                name="verificationCode"
                placeholder="인증 코드 6자리"
                value={form.verificationCode}
                onChange={handleChange}
                maxLength={6}
                style={{
                  borderColor: verificationError
                    ? "#ef4444"
                    : isEmailVerified
                    ? "#22c55e"
                    : undefined,
                }}
              />
              <VerifyButton
                type="button"
                onClick={handleVerifyCode}
                disabled={
                  isVerifyingCode ||
                  !form.verificationCode.trim() ||
                  isEmailVerified
                }
                theme={theme}
              >
                {isVerifyingCode
                  ? "확인 중..."
                  : isEmailVerified
                  ? "인증 완료"
                  : "인증 확인"}
              </VerifyButton>
            </VerificationInputGroup>
          )}

          {verificationError && <ErrorMsg>{verificationError}</ErrorMsg>}
          {isEmailVerified && (
            <SuccessMsg>
              <FaCheckCircle /> 이메일 인증이 완료되었습니다.
            </SuccessMsg>
          )}
        </VerificationSection>

        {error && <ErrorMsg>{error}</ErrorMsg>}
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

        <Label theme={theme}>이름</Label>
        <Input
          name="name"
          placeholder="이름을 입력해주세요"
          value={form.name}
          onChange={handleChange}
          required
        />

        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button
          type="submit"
          fullWidth
          variant="primary"
          style={{ margin: "24px 0 0 0" }}
          disabled={isLoading || !isEmailVerified}
        >
          {isLoading ? "가입 중..." : "가입하기"}
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

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EmailInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AtSymbol = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
  user-select: none;
`;

const Select = styled.select`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  font-size: 14px;
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.textPrimary};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonPrimary};
  }

  &:disabled {
    background-color: ${(props) => props.theme.surfaceSecondary};
    color: ${(props) => props.theme.textTertiary};
  }
`;

const VerificationSection = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const VerificationButton = styled.button`
  padding: 12px 16px;
  border: 1px solid
    ${(props) =>
      props.disabled ? props.theme.border : props.theme.buttonPrimary};
  border-radius: 8px;
  background-color: ${(props) =>
    props.disabled ? props.theme.surfaceSecondary : props.theme.buttonPrimary};
  color: ${(props) => (props.disabled ? props.theme.textTertiary : "white")};
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

const VerificationInputGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const VerifyButton = styled.button`
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.buttonPrimary};
  border-radius: 8px;
  background-color: ${(props) => props.theme.buttonPrimary};
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.buttonHover};
  }

  &:disabled {
    background-color: ${(props) => props.theme.surfaceSecondary};
    border-color: ${(props) => props.theme.border};
    color: ${(props) => props.theme.textTertiary};
    cursor: not-allowed;
  }
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
  color: #ef4444 !important;
  font-size: 14px;
  text-align: center;
  margin: 8px 0 -8px;
`;

const SuccessMsg = styled.div`
  color: #22c55e !important;
  font-size: 14px;
  text-align: center;
  margin: 8px 0 -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
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
