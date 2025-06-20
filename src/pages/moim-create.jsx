import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { CATEGORY_OPTIONS } from "../utils/constants";

const MoimCreatePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    maxMembers: "",
    description: "",
    tags: [],
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("모임이 성공적으로 생성되었습니다!");
    // TODO: API 연동
    router.push("/my-moims");
  };

  const handleClick = () => {
    router.push("/");
  };

  return (
    <PageContainer>
      <Header />
      <Container>
        <LeftSection>
          <FormContainer>
            <FormTitle>새로운 모임 만들기</FormTitle>
            <FormDescription>
              모임의 기본 정보를 입력해주세요. 구체적인 일정은 모임 생성 후 설정할 수 있습니다.
            </FormDescription>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">모임명 *</Label>
                <StyledInput
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="모임 이름을 입력해주세요"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="category">카테고리 *</Label>
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">카테고리 선택</option>
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="maxMembers">최대 인원 *</Label>
                <Input
                  type="number"
                  id="maxMembers"
                  name="maxMembers"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  min="2"
                  max="100"
                  placeholder="2-100명"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">모임 소개 *</Label>
                <StyledTextarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="모임에 대해 설명해주세요. 어떤 활동을 하는지, 누구를 위한 모임인지 알려주세요."
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>태그</Label>
                <TagContainer>
                  {formData.tags.map((tag, index) => (
                    <Tag key={index}>
                      {tag}
                      <RemoveButton
                        onClick={() => {
                          const newTags = [...formData.tags];
                          newTags.splice(index, 1);
                          setFormData((prev) => ({ ...prev, tags: newTags }));
                        }}
                      >
                        ×
                      </RemoveButton>
                    </Tag>
                  ))}
                  <TagInput
                    placeholder="태그 입력 후 Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const newTag = e.target.value.trim();
                        if (newTag && !formData.tags.includes(newTag)) {
                          setFormData((prev) => ({
                            ...prev,
                            tags: [...prev.tags, newTag],
                          }));
                          e.target.value = "";
                        }
                      }
                    }}
                  />
                </TagContainer>
              </FormGroup>

              <FormGroup>
                <Label>모임 대표 이미지</Label>
                <FileInputContainer>
                  <FileInput
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData((prev) => ({
                            ...prev,
                            thumbnail: reader.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <FileInputLabel htmlFor="thumbnail">파일 선택</FileInputLabel>
                </FileInputContainer>
              </FormGroup>

              <ButtonGroup>
                <Button variant="secondary" type="button" onClick={handleClick}>
                  취소
                </Button>
                <Button variant="primary" type="submit">
                  모임 생성
                </Button>
              </ButtonGroup>
            </Form>
          </FormContainer>
        </LeftSection>

        <RightSection>
          <PreviewContainer>
            <PreviewTitle>미리보기</PreviewTitle>
            <PreviewContent>
              <PreviewHeader>
                <PreviewImageSection>
                  <PreviewImageContainer>
                    {formData.thumbnail ? (
                      <PreviewImage
                        src={formData.thumbnail}
                        alt="모임 대표 이미지"
                      />
                    ) : (
                      <PreviewImagePlaceholder>
                        이미지 미리보기
                      </PreviewImagePlaceholder>
                    )}
                  </PreviewImageContainer>
                </PreviewImageSection>
              </PreviewHeader>

              <PreviewName>{formData.title || "모임 제목"}</PreviewName>
              <PreviewMaxMembers>
                최대 {formData.maxMembers || "0"}명
              </PreviewMaxMembers>
              
              <PreviewDescription>
                {formData.description || "모임 설명이 여기에 표시됩니다."}
              </PreviewDescription>

              <PreviewTags>
                {formData.tags.length > 0 ? (
                  formData.tags.map((tag, index) => (
                    <PreviewTag key={index}>{tag}</PreviewTag>
                  ))
                ) : (
                  <PreviewTag>#태그</PreviewTag>
                )}
              </PreviewTags>
            </PreviewContent>
          </PreviewContainer>
        </RightSection>
      </Container>
    </PageContainer>
  );
};

export default MoimCreatePage;

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
  display: flex;
  gap: 48px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightSection = styled.div`
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    flex: none;
    width: 100%;
  }
`;

const FormContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 32px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
`;

const StyledInput = styled.input`
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

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #111827;
  background: #fff;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const StyledTextarea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #111827;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  min-height: 42px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #374151;
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  color: #6b7280;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #ef4444;
  }
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: #111827;
  padding: 4px;
  flex: 1;
  min-width: 120px;

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const PreviewContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 32px;
`;

const PreviewTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
`;

const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PreviewImageSection = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const PreviewImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  min-height: 200px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 200px;
`;

const PreviewImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 1rem;
  background: #f3f4f6;
`;

const PreviewName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const PreviewMaxMembers = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const PreviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 8px;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  min-width: 80px;
`;

const InfoValue = styled.span`
  font-size: 0.875rem;
  color: #111827;
`;

const PreviewDescription = styled.p`
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.5;
  margin: 0;
`;

const PreviewTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const PreviewTag = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  padding: 8px 16px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
  }
`;

const FormDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;
