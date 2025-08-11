import { useState } from "react";
import { useRouter } from "next/router";
import { moimAPI } from "../api/moim";
import toast from "react-hot-toast";

export const useMoim = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // 모임 생성
  const createMoim = async (moimData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await moimAPI.createMoim(moimData);

      toast.success("모임이 성공적으로 생성되었습니다!");

      // 모임 생성 성공 시 마이페이지로 이동
      router.push("/MyPage");

      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.message || "모임 생성에 실패했습니다.";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // 모임 수정
  const updateMoim = async (moimId, moimData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await moimAPI.updateMoim(moimId, moimData);

      toast.success("모임 정보가 성공적으로 수정되었습니다!");

      // 수정된 모임의 상세 페이지로 이동
      router.push(`/moim/${moimId}`);

      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.message || "모임 수정에 실패했습니다.";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // 모임 삭제
  const deleteMoim = async (moimId) => {
    setIsLoading(true);
    setError(null);

    try {
      await moimAPI.deleteMoim(moimId);

      toast.success("모임이 삭제되었습니다!");

      // 마이페이지로 이동
      router.push("/MyPage");

      return { success: true };
    } catch (error) {
      const errorMessage = error.message || "모임 삭제에 실패했습니다.";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // 모임 참여
  const joinMoim = async (moimId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await moimAPI.joinMoim(moimId);

      toast.success("모임에 참여했습니다!");

      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.message || "모임 참여에 실패했습니다.";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // 모임 탈퇴
  const leaveMoim = async (moimId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await moimAPI.leaveMoim(moimId);

      toast.success("모임에서 탈퇴했습니다.");

      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.message || "모임 탈퇴에 실패했습니다.";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createMoim,
    updateMoim,
    deleteMoim,
    joinMoim,
    leaveMoim,
  };
};
