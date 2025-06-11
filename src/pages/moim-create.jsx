import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import { useRouter } from 'next/router';

const MoimCreatePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    maxMembers: "",
    onlineType: "online",
    location: "",
    image: null,
  });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "스터디",
    "취미",
    "운동",
    "독서",
    "언어",
    "프로그래밍",
    "음악",
    "요리",
    "여행",
    "기타",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
        setTags((prev) => [...prev, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "모임 제목을 입력해주세요.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "모임 설명을 입력해주세요.";
    }
    if (!formData.category) {
      newErrors.category = "카테고리를 선택해주세요.";
    }
    if (!formData.maxMembers || formData.maxMembers < 2) {
      newErrors.maxMembers = "최소 2명 이상의 인원을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // TODO: API 연동
      alert("모임이 생성되었습니다!");
      setFormData({
        title: "",
        description: "",
        category: "",
        maxMembers: "",
        onlineType: "online",
        location: "",
        image: null,
      });
      setTags([]);
      setTagInput("");
      setImagePreview(null);
    } catch (e) {
      console.error(e);
      alert("에러가 발생했습니다.");
    }
  };

  const handleClick = () => {
    router.push('/');
  };

  return (
    <Container>
      <Header />
      <LayoutContainer>
        <TwoColLayout>
          <ContentContainer>
            <TopTitle>새로운 모임 만들기</TopTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">모임 제목</Label>
                <WideInput
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="모임 제목을 입력하세요"
                />
                {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">모임 설명</Label>
                <WideTextarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="모임에 대해 소개해 주세요"
                  rows={4}
                />
                {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="category">카테고리</Label>
                <WideSelect
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </WideSelect>
                {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="maxMembers">최대 인원</Label>
                <WideInput
                  id="maxMembers"
                  name="maxMembers"
                  type="number"
                  min={2}
                  value={formData.maxMembers}
                  onChange={handleChange}
                  placeholder="최대 인원을 입력하세요"
                />
                {errors.maxMembers && <ErrorMessage>{errors.maxMembers}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="onlineType">모임 형태</Label>
                <WideSelect
                  id="onlineType"
                  name="onlineType"
                  value={formData.onlineType}
                  onChange={handleChange}
                >
                  <option value="online">온라인</option>
                  <option value="offline">오프라인</option>
                </WideSelect>
              </FormGroup>
              {formData.onlineType === "offline" && (
                <FormGroup>
                  <Label htmlFor="location">모임 위치</Label>
                  <WideInput
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="모임 장소를 입력하세요"
                  />
                </FormGroup>
              )}
              <FormGroup>
                <Label>태그</Label>
                <TagInput
                  style={{ width: '100%', maxWidth: 650, minWidth: 420 }}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="엔터로 태그 추가"
                />
                <TagList>
                  {tags.map((tag) => (
                    <Tag key={tag}>
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>
                        ×
                      </button>
                    </Tag>
                  ))}
                </TagList>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="image">모임 대표 이미지</Label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ marginBottom: "10px", width: '100%', maxWidth: 650, minWidth: 420 }}
                />
              </FormGroup>
              <ButtonContainer>
                <Button type="button" variant="secondary" onClick={handleClick}>
                  취소
                </Button>
                <Button type="submit" variant="primary">
                  모임 생성
                </Button>
              </ButtonContainer>
            </Form>
          </ContentContainer>
          <PreviewCard>
            {imagePreview ? (
              <PreviewImage src={imagePreview} alt="미리보기" />
            ) : (
              <PreviewImagePlaceholder>
                <span>이미지 미리보기</span>
              </PreviewImagePlaceholder>
            )}
            <PreviewInner>
              <PreviewTitle>{formData.title || "모임 제목 미리보기"}</PreviewTitle>
              <PreviewDesc>{formData.description || "모임 설명이 여기에 표시됩니다."}</PreviewDesc>
              {formData.category && (
                <PreviewCategory>
                  카테고리: {formData.category}
                </PreviewCategory>
              )}
              <PreviewDivider />
              <PreviewInfoList>
                <PreviewInfoRow>
                  <PreviewInfoLabel>모임 형태</PreviewInfoLabel>
                  <span>{formData.onlineType === "offline" ? "오프라인" : "온라인"}</span>
                  {formData.onlineType === "offline" && formData.location && <><PreviewInfoLabel>위치</PreviewInfoLabel><span>{formData.location}</span></>}
                </PreviewInfoRow>
                <PreviewInfoRow>
                  <PreviewCreator>
                    <PreviewCreatorImg src="/user1.jpg" alt="개설자" />
                    <span>개설자: <b>홍길동</b></span>
                    <PreviewCreatedAt>{new Date().toISOString().slice(0,10)} 생성</PreviewCreatedAt>
                  </PreviewCreator>
                </PreviewInfoRow>
                {formData.maxMembers || tags.length > 0 ? (
                  <>
                    {formData.maxMembers && (
                      <PreviewInfoRow>
                        <PreviewInfoLabel>최대 인원</PreviewInfoLabel>
                        <PreviewMaxMembers>{formData.maxMembers}명</PreviewMaxMembers>
                      </PreviewInfoRow>
                    )}
                  </>
                ) : (
                  <PreviewInfoRow>
                    <PreviewInfoLabel>최대 인원</PreviewInfoLabel>
                    <PreviewMaxMembers>10명</PreviewMaxMembers>
                  </PreviewInfoRow>
                )}
              </PreviewInfoList>
              {tags.length > 0 ? (
                <PreviewTagList>
                  {tags.map((tag, idx) => (
                    <PreviewTag key={idx}>#{tag}</PreviewTag>
                  ))}
                </PreviewTagList>
              ) : (
                <PreviewTagList>
                  <PreviewTag>#스터디</PreviewTag>
                  <PreviewTag>#네트워킹</PreviewTag>
                </PreviewTagList>
              )}
            </PreviewInner>
          </PreviewCard>
        </TwoColLayout>
      </LayoutContainer>
    </Container>
  );
};

export default MoimCreatePage; 

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const LayoutContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 0 0;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 640px;
  border-radius: 16px;
  margin: 0 auto;
  padding: 40px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  box-shadow: none;
`;

const TopTitle = styled.h2`
  color: #0d141c;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  padding-bottom: 24px;
  text-align: left;
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

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  color: #111827;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.15s ease;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TagInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  color: #111827;
  transition: border-color 0.15s ease;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const Tag = styled.span`
  background-color: #e5e7eb;
  color: #374151;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  button {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0;
    font-size: 14px;
    display: flex;
    align-items: center;
    &:hover {
      color: #ef4444;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
`;

const TwoColLayout = styled.div`
  display: flex;
  gap: 250px;
  align-items: flex-start;
  @media (max-width: 1200px) {
    gap: 40px;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const PreviewCard = styled.div`
  max-width: 600px;
  min-width: 500px;
  width: 100%;
  min-height: 480px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.13);
  overflow: hidden;
  position: relative;
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  animation: ${keyframes`
    0% { transform: translateY(40px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  `} 0.4s cubic-bezier(0.23, 1, 0.32, 1);
`;

const PreviewImage = styled.img`
  width: 100%;
  min-width: 600px;
  max-width: 600px;
  height: 220px;
  object-fit: cover;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: block;
`;

const PreviewImagePlaceholder = styled.div`
  width: 100%;
  min-width: 500px;
  max-width: 600px;
  height: 220px;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  color: #b0b3b8;
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

const PreviewInner = styled.div`
  padding: 24px 18px 18px 18px;
`;

const PreviewTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: #1a2233;
`;

const PreviewDesc = styled.p`
  color: #444;
  font-size: 1.02rem;
  margin-bottom: 14px;
`;

const PreviewDivider = styled.hr`
  border: none;
  border-top: 1px solid #ececec;
  margin: 14px 0 14px 0;
`;

const PreviewInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 0.98rem;
  color: #222;
`;

const PreviewInfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
`;

const PreviewInfoLabel = styled.span`
  font-weight: 600;
  color: #1a2233;
  min-width: 60px;
`;

const PreviewCreator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 2px;
`;

const PreviewCreatorImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const PreviewTagList = styled.div`
  margin-top: 8px;
  margin-bottom: 6px;
`;

const PreviewTag = styled.span`
  display: inline-block;
  background: #f3f4f6;
  color: #374151;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  margin-right: 7px;
  margin-bottom: 4px;
`;

const PreviewCategory = styled.div`
  font-size: 1.08rem;
  color: #49749c;
  font-weight: 600;
  margin-bottom: 10px;
`;

const PreviewMaxMembers = styled.span`
  font-size: 1rem;
  color: #222;
`;

const PreviewCreatedAt = styled.span`
  font-size: 12px;
  color: #888;
  margin-left: 6px;
`;

const WideInput = styled(Input)`
  width: 100%;
  max-width: 650px;
  min-width: 420px;
`;

const WideTextarea = styled(Textarea)`
  width: 100%;
  max-width: 650px;
  min-width: 420px;
`;

const WideSelect = styled.select`
  width: 100%;
  max-width: 650px;
  min-width: 420px;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  color: #111827;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.15s ease;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;