import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";

const Settings = () => {
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
    // TODO: API 연동
    console.log("Form submitted:", formData);
  };

  return (
    <PageContainer>
      <Header />
      <Container>
        <SettingsContainer>
          <SettingsTitle>설정</SettingsTitle>
          <Form onSubmit={handleSubmit}>
            <Section>
              <SectionTitle>계정 정보</SectionTitle>
              <FormGroup>
                <Label htmlFor="email">이메일</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="nickname">닉네임</Label>
                <Input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>비밀번호 변경</SectionTitle>
              <FormGroup>
                <Label htmlFor="currentPassword">현재 비밀번호</Label>
                <Input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newPassword">새 비밀번호</Label>
                <Input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>알림 설정</SectionTitle>
              <CheckboxGroup>
                <CheckboxItem>
                  <Checkbox
                    type="checkbox"
                    id="notificationEmail"
                    name="notificationEmail"
                    checked={formData.notificationEmail}
                    onChange={handleChange}
                  />
                  <CheckboxLabel htmlFor="notificationEmail">
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
                  />
                  <CheckboxLabel htmlFor="notificationPush">
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
                  />
                  <CheckboxLabel htmlFor="notificationSchedule">
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
                  />
                  <CheckboxLabel htmlFor="notificationComment">
                    댓글 알림
                  </CheckboxLabel>
                </CheckboxItem>
              </CheckboxGroup>
            </Section>

            <ButtonGroup>
              <Button variant="secondary" type="button">
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
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
`;

const SettingsContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SettingsTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 32px 0;
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
  color: #111827;
  margin: 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #111827;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
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
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;
