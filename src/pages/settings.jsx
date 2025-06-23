import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useTheme } from "../utils/ThemeContext";

const Settings = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: "user@example.com",
    nickname: "사용자",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notificationEmail: true,
    notificationPush: true,
    notificationSchedule: true,
    notificationComment: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Form submitted: " + JSON.stringify(formData));
    // 설정 저장 로직 구현
  };

  return (
    <PageContainer theme={theme}>
      <Header />
      <Container>
        <SettingsContainer theme={theme}>
          <SettingsTitle theme={theme}>설정</SettingsTitle>
          <Form onSubmit={handleSubmit}>
            <Section>
              <SectionTitle theme={theme}>계정 정보</SectionTitle>
              <FormGroup>
                <Label htmlFor="email" theme={theme}>
                  이메일
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  theme={theme}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="nickname" theme={theme}>
                  닉네임
                </Label>
                <Input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                  theme={theme}
                />
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle theme={theme}>비밀번호 변경</SectionTitle>
              <FormGroup>
                <Label htmlFor="currentPassword" theme={theme}>
                  현재 비밀번호
                </Label>
                <Input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  theme={theme}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newPassword" theme={theme}>
                  새 비밀번호
                </Label>
                <Input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  theme={theme}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword" theme={theme}>
                  새 비밀번호 확인
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  theme={theme}
                />
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle theme={theme}>알림 설정</SectionTitle>
              <CheckboxGroup>
                <CheckboxItem>
                  <Checkbox
                    type="checkbox"
                    id="notificationEmail"
                    name="notificationEmail"
                    checked={formData.notificationEmail}
                    onChange={handleChange}
                    theme={theme}
                  />
                  <CheckboxLabel htmlFor="notificationEmail" theme={theme}>
                    이메일 알림
                  </CheckboxLabel>
                </CheckboxItem>

                <CheckboxItem>
                  <Checkbox
                    type="checkbox"
                    id="notificationPush"
                    name="notificationPush"
                    checked={formData.notificationPush}
                    onChange={handleChange}
                    theme={theme}
                  />
                  <CheckboxLabel htmlFor="notificationPush" theme={theme}>
                    푸시 알림
                  </CheckboxLabel>
                </CheckboxItem>

                <CheckboxItem>
                  <Checkbox
                    type="checkbox"
                    id="notificationSchedule"
                    name="notificationSchedule"
                    checked={formData.notificationSchedule}
                    onChange={handleChange}
                    theme={theme}
                  />
                  <CheckboxLabel htmlFor="notificationSchedule" theme={theme}>
                    일정 알림
                  </CheckboxLabel>
                </CheckboxItem>

                <CheckboxItem>
                  <Checkbox
                    type="checkbox"
                    id="notificationComment"
                    name="notificationComment"
                    checked={formData.notificationComment}
                    onChange={handleChange}
                    theme={theme}
                  />
                  <CheckboxLabel htmlFor="notificationComment" theme={theme}>
                    댓글 알림
                  </CheckboxLabel>
                </CheckboxItem>
              </CheckboxGroup>
            </Section>

            <ButtonGroup>
              <Button variant="light" type="button">
                취소
              </Button>
              <Button variant="primary" type="submit">
                저장하기
              </Button>
            </ButtonGroup>
          </Form>
        </SettingsContainer>
      </Container>
    </PageContainer>
  );
};

export default Settings;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
`;

const SettingsContainer = styled.div`
  background: ${(props) => props.theme.surface};
  border-radius: 12px;
  padding: 32px;
  box-shadow: ${(props) => props.theme.cardShadow};
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const SettingsTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 32px 0;
  transition: color 0.3s ease;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  transition: color 0.3s ease;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 6px;
  font-size: 0.875rem;
  color: ${(props) => props.theme.textPrimary};
  background: ${(props) => props.theme.surfaceSecondary};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonPrimary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textTertiary};
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: ${(props) => props.theme.buttonPrimary};
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;
  transition: color 0.3s ease;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;
