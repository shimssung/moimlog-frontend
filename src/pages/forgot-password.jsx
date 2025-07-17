import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTheme } from "../utils/ThemeContext";
import { authAPI } from "../api/auth";
import { useRouter } from "next/router";
import { FaCheckCircle, FaTimesCircle, FaRegCircle } from "react-icons/fa";

const ForgotPassword = () => {
  const { theme } = useTheme();
  const router = useRouter();
  
  // 상태 관리
  const [step, setStep] = useState("email"); // 이메일 입력, 인증 코드 입력, 비밀번호 재설정, 완료
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  
  // 비밀번호 규칙 확인 상태 (회원가입과 동일한 스타일)
  const [pwChecks, setPwChecks] = useState({
    rule1: false, // 영문/숫자/특수문자 2종 이상
    rule2: false, // 8~32자
    rule3: true, // 연속 3자 이상 동일 문자/숫자 없음
  });
  const [pwTouched, setPwTouched] = useState(false);



  // 비밀번호 변경 핸들러 (회원가입과 동일한 규칙 적용)
  const handlePasswordChange = (e) => {
    const pw = e.target.value;
    setNewPassword(pw);
    setPwTouched(pw.length > 0);
    setPwChecks({
      rule1: /(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()_+\-={};':"\\|,.<>/?]).*/.test(pw),
      rule2: pw.length >= 8 && pw.length <= 32,
      rule3: !/([a-zA-Z0-9])\1\1/.test(pw),
    });
  };

  // 비밀번호 유효성 검사 (회원가입과 동일한 규칙)
  const validatePassword = () => {
    return pwChecks.rule1 && pwChecks.rule2 && pwChecks.rule3;
  };

  // 비밀번호 확인 검사
  const validatePasswordConfirm = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 찾기 요청
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error("올바른 이메일 주소를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.forgotPassword(email);
      if (response.success) {
        toast.success(response.message);
        setStep("verification"); // 인증 코드 입력 단계
        setCountdown(60); // 1분 쿨다운
      }
    } catch (error) {
      toast.error(error.message || "비밀번호 찾기 요청에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 인증 코드 재발송
  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    try {
      const response = await authAPI.forgotPassword(email);
      if (response.success) {
        toast.success("인증 코드가 재발송되었습니다.");
        setCountdown(60);
      }
    } catch (error) {
      toast.error(error.message || "인증 코드 재발송에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 인증 코드 확인 및 비밀번호 재설정 페이지로 이동
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("6자리 인증 코드를 입력해주세요.");
      return;
    }

    console.log("인증 코드 검증 시작:", { email, verificationCode });
    setIsLoading(true);
    try {
      // 2단계: 인증 코드 검증
      const response = await authAPI.verifyResetCode(email, verificationCode);
      console.log("인증 코드 검증 성공:", response);
      if (response.success) {
        toast.success("인증 코드가 확인되었습니다.");
        setStep("reset"); // 비밀번호 재설정 단계
      }
    } catch (error) {
      console.log("인증 코드 검증 실패:", error);
      toast.error(error.message || "인증 코드 확인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 재설정
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      toast.error("비밀번호 규칙을 확인해주세요.");
      return;
    }

    if (!validatePasswordConfirm(newPassword, confirmPassword)) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    try {
      // 3단계: 새 비밀번호 설정 (verificationCode는 제거)
      const response = await authAPI.resetPassword({
        email,
        newPassword,
        confirmPassword,
      });
      
      if (response.success) {
        toast.success(response.message);
        setStep("complete"); // 완료 단계
        
        // 3초 후 로그인 페이지로 리다이렉트
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message || "비밀번호 재설정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 카운트다운 타이머
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);



  // 이메일 입력 단계
  if (step === "email") {
    return (
      <AuthLayout
        leftTitle="비밀번호를 잊으셨나요?"
        leftDesc={
          <>
            가입하신 이메일을 입력하시면
            <br />
            비밀번호 재설정 인증 코드를 보내드립니다.
          </>
        }
        formTitle="비밀번호 찾기"
        footerContent={
          <p>
            로그인이 기억나셨나요?{" "}
            <Link href="/login">
              <StyledLink theme={theme}>로그인 하기</StyledLink>
            </Link>
          </p>
        }
      >
        <form onSubmit={handleForgotPassword}>
          <FormGroup>
            <Input
              type="email"
              placeholder="가입한 이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </FormGroup>
          <Button 
            type="submit" 
            fullWidth 
            style={{ marginTop: "1rem" }}
            disabled={isLoading}
          >
            {isLoading ? "처리 중..." : "인증 코드 발송"}
          </Button>
        </form>
      </AuthLayout>
    );
  }

  // 인증 코드 입력 단계
  if (step === "verification") {
    return (
      <AuthLayout
        leftTitle="인증 코드를 확인하세요"
        leftDesc={
          <>
            {email}로 발송된
            <br />
            6자리 인증 코드를 입력해주세요.
          </>
        }
        formTitle="인증 코드 입력"
        footerContent={
          <p>
            이메일을 받지 못하셨나요?{" "}
            <ResendButton 
              onClick={handleResendCode} 
              disabled={countdown > 0 || isLoading}
              theme={theme}
            >
              {countdown > 0 ? `${countdown}초 후 재발송` : "재발송"}
            </ResendButton>
          </p>
        }
      >
        <form onSubmit={handleVerifyCode}>
          <FormGroup>
            <Input
              type="text"
              placeholder="6자리 인증 코드"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              required
              disabled={isLoading}
            />
          </FormGroup>
          <Button 
            type="submit" 
            fullWidth 
            style={{ marginTop: "1rem" }}
            disabled={isLoading || verificationCode.length !== 6}
          >
            {isLoading ? "확인 중..." : "인증 코드 확인"}
          </Button>
          <Button 
            type="button" 
            fullWidth 
            style={{ marginTop: "0.5rem", backgroundColor: "transparent", color: theme.textSecondary, border: `1px solid ${theme.border}` }}
            onClick={() => setStep("email")}
          >
            이메일 다시 입력
          </Button>
        </form>
      </AuthLayout>
    );
  }

  // 비밀번호 재설정 단계
  if (step === "reset") {
    return (
      <AuthLayout
        leftTitle="새 비밀번호를 설정하세요"
        leftDesc={
          <>
            안전한 비밀번호로
            <br />
            재설정해주세요.
          </>
        }
        formTitle="새 비밀번호 설정"
        footerContent={
          <p>
            인증 코드를 잊으셨나요?{" "}
            <ResendButton 
              onClick={handleResendCode} 
              disabled={countdown > 0 || isLoading}
              theme={theme}
            >
              {countdown > 0 ? `${countdown}초 후 재발송` : "재발송"}
            </ResendButton>
          </p>
        }
      >
        <form onSubmit={handleResetPassword}>
          <FormGroup>
            <Label theme={theme}>새 비밀번호</Label>
            <Input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={handlePasswordChange}
              style={{
                borderColor:
                  !pwTouched ? undefined :
                  !pwChecks.rule1 || !pwChecks.rule2 || !pwChecks.rule3
                    ? "#ef4444"
                    : undefined,
              }}
              required
              disabled={isLoading}
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
          </FormGroup>
          <FormGroup>
            <Label theme={theme}>새 비밀번호 확인</Label>
            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            {confirmPassword && (
              <PasswordMatch theme={theme}>
                {validatePasswordConfirm(newPassword, confirmPassword) ? (
                  <span style={{ color: "#00C851" }}>✓ 비밀번호가 일치합니다</span>
                ) : (
                  <span style={{ color: "#ff4444" }}>✗ 비밀번호가 일치하지 않습니다</span>
                )}
              </PasswordMatch>
            )}
          </FormGroup>
          <Button 
            type="submit" 
            fullWidth 
            style={{ marginTop: "1rem" }}
            disabled={isLoading || !validatePassword() || !validatePasswordConfirm(newPassword, confirmPassword)}
          >
            {isLoading ? "재설정 중..." : "비밀번호 재설정"}
          </Button>
          <Button 
            type="button" 
            fullWidth 
            style={{ marginTop: "0.5rem", backgroundColor: "transparent", color: theme.textSecondary, border: `1px solid ${theme.border}` }}
            onClick={() => setStep("verification")}
          >
            인증 코드 다시 입력
          </Button>
        </form>
      </AuthLayout>
    );
  }

  // 완료 단계
  if (step === "complete") {
    return (
      <AuthLayout
        leftTitle="비밀번호 재설정 완료!"
        leftDesc={
          <>
            새 비밀번호로
            <br />
            로그인해주세요.
          </>
        }
        formTitle="재설정 완료"
        footerContent={
          <p>
            자동으로 로그인 페이지로 이동합니다.
            <br />
            <Link href="/login">
              <StyledLink theme={theme}>바로 이동하기</StyledLink>
            </Link>
          </p>
        }
      >
        <SuccessMessage theme={theme}>
          <SuccessIcon>✓</SuccessIcon>
          <SuccessText>비밀번호가 성공적으로 재설정되었습니다.</SuccessText>
        </SuccessMessage>
      </AuthLayout>
    );
  }

  return null;
};

export default ForgotPassword;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
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

const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.disabled ? props.theme.textTertiary : props.theme.buttonPrimary};
  text-decoration: underline;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  transition: color 0.3s ease;
  font-size: 0.875rem;

  &:hover {
    color: ${(props) => props.disabled ? props.theme.textTertiary : props.theme.buttonHover};
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
  }
`;

const PasswordMatch = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 3rem;
  color: #00C851;
  margin-bottom: 1rem;
`;

const SuccessText = styled.p`
  font-size: 1.1rem;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
`;
