
// 스토어 먼저 생성해주기 
import create from 'zustand';
import getUserInfo from '../api/userAPI'; 

const useUserStore = create((set) => ({
  userInfo: null,
  fetchUser: async (memberId) => {
    try {
      const userData = await getUserInfo(memberId);
      if (userData) {
        set({ userInfo: userData });
        console.log('저장소 값', userData); // userInfo 대신 userData 사용
      }
    } catch (error) {
      console.error('에러발생', error);
    }
  },
}));

export default useUserStore;

