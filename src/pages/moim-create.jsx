import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useTheme } from "../utils/ThemeContext";
import { CATEGORY_OPTIONS } from "../utils/constants";

const MoimCreatePage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    maxMembers: "",
    description: "",
    tags: [],
    thumbnail: null,
    onlineType: "offline",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          thumbnail: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 오프라인 모임인데 지역이 입력되지 않은 경우
    if (formData.onlineType === "offline" && !formData.location.trim()) {
      toast.error("오프라인 모임의 경우 활동 지역을 입력해주세요.");
      return;
    }

    toast.success("모임이 성공적으로 생성되었습니다!");
    // TODO: API 연동
    router.push("/my-moims");
  };

  const handleClick = () => {
    router.push("/");
  };

  return (
    <PageContainer theme={theme}>
      <Header />
      <Container>
        <LeftSection>
          <FormContainer theme={theme}>
            <FormTitle theme={theme}>새로운 모임 만들기</FormTitle>
            <FormDescription theme={theme}>
              모임의 기본 정보를 입력해주세요. 구체적인 일정은 모임 생성 후
              설정할 수 있습니다.
            </FormDescription>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="thumbnail" theme={theme}>
                  모임 이미지
                </Label>
                <ImageUploadRow>
                  <ThumbPreview>
                    {formData.thumbnail ? (
                      <ThumbImg src={formData.thumbnail} alt="미리보기" />
                    ) : (
                      <ThumbPlaceholder>📷</ThumbPlaceholder>
                    )}
                  </ThumbPreview>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <UploadButton
                      type="button"
                      onClick={() =>
                        document.getElementById("thumbnail").click()
                      }
                      theme={theme}
                    >
                      이미지 선택
                    </UploadButton>
                    <FileName theme={theme}>
                      {formData.thumbnail
                        ? "이미지 선택됨"
                        : "이미지를 선택해주세요"}
                    </FileName>
                  </div>
                  <FileInput
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </ImageUploadRow>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="title" theme={theme}>
                  모임명 *
                </Label>
                <Input
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
                <Label htmlFor="category" theme={theme}>
                  카테고리 *
                </Label>
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  theme={theme}
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
                <Label htmlFor="maxMembers" theme={theme}>
                  최대 인원 *
                </Label>
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
                <Label htmlFor="onlineType" theme={theme}>
                  모임 형태 *
                </Label>
                <Select
                  id="onlineType"
                  name="onlineType"
                  value={formData.onlineType}
                  onChange={handleChange}
                  required
                  theme={theme}
                >
                  <option value="online">온라인</option>
                  <option value="offline">오프라인</option>
                </Select>
              </FormGroup>

              {formData.onlineType === "offline" && (
                <FormGroup>
                  <Label htmlFor="location" theme={theme}>
                    활동 지역 *
                  </Label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="예: 서울시 강남구, 부산시 해운대구"
                  />
                  <HelpText theme={theme}>
                    오프라인 모임의 경우 활동 지역을 입력해주세요.
                  </HelpText>
                </FormGroup>
              )}

              <FormGroup>
                <Label htmlFor="description" theme={theme}>
                  모임 소개 *
                </Label>
                <Textarea
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
                <Label theme={theme}>태그</Label>
                <TagContainer theme={theme}>
                  {formData.tags.map((tag, index) => (
                    <Tag key={index} theme={theme}>
                      {tag}
                      <RemoveButton
                        onClick={() => {
                          const newTags = [...formData.tags];
                          newTags.splice(index, 1);
                          setFormData((prev) => ({ ...prev, tags: newTags }));
                        }}
                        theme={theme}
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
                    theme={theme}
                  />
                </TagContainer>
              </FormGroup>

              <ButtonGroup>
                <Button type="button" variant="light" onClick={handleClick}>
                  취소
                </Button>
                <Button type="submit" variant="primary">
                  모임 만들기
                </Button>
              </ButtonGroup>
            </Form>
          </FormContainer>
        </LeftSection>

        <RightSection>
          <PreviewContainer theme={theme}>
            <PreviewTitle theme={theme}>미리보기</PreviewTitle>
            <PreviewContent>
              <PreviewImageSection>
                {formData.thumbnail ? (
                  <PreviewImageContainer>
                    <PreviewImage src={formData.thumbnail} alt="모임 썸네일" />
                  </PreviewImageContainer>
                ) : (
                  <PreviewImageContainer>
                    <PreviewImagePlaceholder theme={theme}>
                      이미지를 선택해주세요
                    </PreviewImagePlaceholder>
                  </PreviewImageContainer>
                )}
              </PreviewImageSection>
              <PreviewHeader>
                <PreviewName theme={theme}>
                  {formData.title || "모임명을 입력해주세요"}
                </PreviewName>
                <PreviewMaxMembers theme={theme}>
                  {formData.maxMembers
                    ? `${formData.maxMembers}명`
                    : "인원 미정"}
                </PreviewMaxMembers>
              </PreviewHeader>

              <PreviewInfo>
                <InfoItem>
                  <InfoLabel theme={theme}>카테고리</InfoLabel>
                  <InfoValue theme={theme}>
                    {formData.category
                      ? CATEGORY_OPTIONS.find(
                          (opt) => opt.value === formData.category
                        )?.label
                      : "미선택"}
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel theme={theme}>모임 형태</InfoLabel>
                  <InfoValue theme={theme}>
                    {formData.onlineType === "online" ? "온라인" : "오프라인"}
                  </InfoValue>
                </InfoItem>
                {formData.onlineType === "offline" && (
                  <InfoItem>
                    <InfoLabel theme={theme}>활동 지역</InfoLabel>
                    <InfoValue theme={theme}>
                      {formData.location || "미입력"}
                    </InfoValue>
                  </InfoItem>
                )}
              </PreviewInfo>

              <PreviewDescription theme={theme}>
                {formData.description || "모임 소개를 입력해주세요."}
              </PreviewDescription>

              {formData.tags.length > 0 && (
                <PreviewTags>
                  {formData.tags.map((tag, index) => (
                    <PreviewTag key={index} theme={theme}>
                      #{tag}
                    </PreviewTag>
                  ))}
                </PreviewTags>
              )}
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
  background: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const LeftSection = styled.div``;

const RightSection = styled.div``;

const FormContainer = styled.div`
  background: ${(props) => props.theme.surface};
  border-radius: 12px;
  padding: 32px;
  box-shadow: ${(props) => props.theme.cardShadow};
  border: 1px solid ${(props) => props.theme.borderLight};
  transition: all 0.3s ease;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
`;

const FormDescription = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0 0 32px 0;
  line-height: 1.5;
  transition: color 0.3s ease;
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
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  font-size: 0.875rem;
  transition: color 0.3s ease;
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 8px;
  font-size: 1rem;
  background: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.textPrimary};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonPrimary};
  }

  option {
    background: ${(props) => props.theme.surface};
    color: ${(props) => props.theme.textPrimary};
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.borderLight};
  border-radius: 6px;
  min-height: 42px;
  background: ${(props) => props.theme.surfaceSecondary};
  transition: all 0.3s ease;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: ${(props) => props.theme.tagBackground};
  border-radius: 4px;
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  transition: all 0.3s ease;
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  color: ${(props) => props.theme.textTertiary};
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.3s ease;

  &:hover {
    color: #ef4444;
  }
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: ${(props) => props.theme.textPrimary};
  padding: 4px;
  flex: 1;
  min-width: 120px;
  background: transparent;
  transition: color 0.3s ease;

  &::placeholder {
    color: ${(props) => props.theme.textTertiary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const PreviewContainer = styled.div`
  background: ${(props) => props.theme.surface};
  border-radius: 12px;
  padding: 32px;
  box-shadow: ${(props) => props.theme.cardShadow};
  border: 1px solid ${(props) => props.theme.borderLight};
  position: sticky;
  top: 32px;
  transition: all 0.3s ease;
`;

const PreviewTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${(props) => props.theme.textPrimary};
  transition: color 0.3s ease;
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
  width: 100%;
  margin-bottom: 16px;
`;

const PreviewImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) => props.theme.surfaceSecondary};
  min-height: 200px;
  transition: background-color 0.3s ease;
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
  color: ${(props) => props.theme.textTertiary};
  font-size: 1rem;
  background: ${(props) => props.theme.surfaceSecondary};
  transition: all 0.3s ease;
`;

const PreviewName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
  transition: color 0.3s ease;
`;

const PreviewMaxMembers = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.3s ease;
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
  color: ${(props) => props.theme.textSecondary};
  min-width: 80px;
  transition: color 0.3s ease;
`;

const InfoValue = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textPrimary};
  transition: color 0.3s ease;
`;

const PreviewDescription = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.5;
  margin: 0;
  transition: color 0.3s ease;
`;

const PreviewTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const PreviewTag = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  background: ${(props) => props.theme.surfaceSecondary};
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
`;

const HelpText = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textTertiary};
  margin: 8px 0 0 0;
  transition: color 0.3s ease;
`;

const ImageUploadRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 4px;
`;
const ThumbPreview = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: ${(props) => props.theme.surfaceSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 2rem;
`;
const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ThumbPlaceholder = styled.div`
  color: ${(props) => props.theme.textTertiary};
  font-size: 2.2rem;
`;
const UploadButton = styled.button`
  padding: 6px 16px;
  background: ${(props) => props.theme.buttonPrimary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${(props) => props.theme.buttonHover || "#444"};
  }
`;
const FileInput = styled.input`
  display: none;
`;
const FileName = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textSecondary};
  margin-top: 2px;
`;
