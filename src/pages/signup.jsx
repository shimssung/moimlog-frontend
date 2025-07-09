import React, { useState, useRef } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";
import { FaCheckCircle, FaTimesCircle, FaRegCircle } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import { authAPI } from "../api/auth";
import { useRouter } from "next/router";

function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    emailId: "",
    emailDomain: "",
    password: "",
    password2: "",
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

  // refs for focus
  const emailIdRef = useRef(null);
  const emailDomainRef = useRef(null);

  // 이메일 도메인 옵션
  const emailDomains = [
    "gmail.com",
    "naver.com",
    "daum.net",
    "kakao.com",
    "outlook.com",
    "yahoo.com",
    "직접입력"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setEmailError("");
  };

  // 이메일 필드 포커스 아웃 시 중복 확인
  const handleEmailBlur = async () => {
    const fullEmail = getFullEmail();
    if (!fullEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fullEmail)) {
      return; // 이메일이 완성되지 않았거나 형식이 틀리면 확인하지 않음
    }

    setEmailError("");

    try {
      const emailCheck = await authAPI.checkEmailDuplicate(fullEmail);
      if (emailCheck.duplicate) {
        setEmailError("이미 사용 중인 이메일입니다.");
      } else {
        setEmailError("");
      }
    } catch (error) {
      setEmailError("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 도메인 선택 처리
  const handleDomainChange = (e) => {
    const value = e.target.value;
    if (value === "직접입력") {
      setShowCustomDomain(true);
      setForm({ ...form, emailDomain: "" });
    } else {
      setShowCustomDomain(false);
      setCustomDomain("");
      setForm({ ...form, emailDomain: value });
    }
    setEmailError("");
  };

  // 직접 입력 도메인 처리
  const handleCustomDomainChange = (e) => {
    setCustomDomain(e.target.value);
    setForm({ ...form, emailDomain: e.target.value });
    setEmailError("");
  };

  // 전체 이메일 주소 생성
  const getFullEmail = () => {
    if (!form.emailId || !form.emailDomain) return "";
    return `${form.emailId}@${form.emailDomain}`;
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
    const fullEmail = getFullEmail();
    if (!fullEmail) return "이메일을 입력해주세요.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fullEmail))
      return "이메일 형식이 올바르지 않습니다.";
    if (emailError) return "이메일 중복 확인을 해주세요.";
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
    
    // 회원가입 버튼 클릭 시 이메일 중복 재확인
    const fullEmail = getFullEmail();
    if (fullEmail && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fullEmail)) {
      try {
        const emailCheck = await authAPI.checkEmailDuplicate(fullEmail);
        if (emailCheck.duplicate) {
          setEmailError("이미 사용 중인 이메일입니다.");
          // 이메일 필드로 포커스 이동
          if (emailIdRef.current) {
            emailIdRef.current.focus();
          }
          return;
        }
      } catch (error) {
        setEmailError("이메일 중복 확인 중 오류가 발생했습니다.");
        if (emailIdRef.current) {
          emailIdRef.current.focus();
        }
        return;
      }
    }
    
    const err = validate();
    if (err) return setError(err);
    
    setIsLoading(true);
    setError("");
    
    try {
      // 회원가입 API 호출
      const response = await authAPI.signup({
        email: getFullEmail(),
        password: form.password
      });
      
      if (response.success) {
        toast.success("회원가입이 완료되었습니다!");
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
      <Link href="/login" className="signup-footer-link">
        로그인
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
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="form-label">이메일</label>
        <div className="email-container">
          <div className="email-input-group">
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
            <span className="at-symbol">@</span>
            {!showCustomDomain ? (
              <select
                ref={emailDomainRef}
                name="emailDomain"
                value={form.emailDomain}
                onChange={handleDomainChange}
                onBlur={handleEmailBlur}
                className="domain-select"
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
              </select>
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
          </div>
        </div>
        {emailError && <div className="error-message">{emailError}</div>}
        {error && <div className="error-message">{error}</div>}
        <label className="form-label">비밀번호</label>
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
        <ul className="password-desc">
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
        </ul>
        <label className="form-label">비밀번호 확인</label>
        <Input
          name="password2"
          type="password"
          placeholder="비밀번호 확인"
          value={form.password2}
          onChange={handleChange}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <Button
          type="submit"
          fullWidth
          variant="primary"
          style={{ margin: "24px 0 0 0" }}
          disabled={isLoading}
        >
          {isLoading ? "가입 중..." : "가입하기"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default SignupPage;
