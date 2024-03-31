
// userAPI.jsx


const getUserInfo = async (memberId) => {

  const baseURL = 'https://kkirikkiri.shop/api';
  try {
    const response = await fetch(`${baseURL}/members/${memberId}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) { 
      const data = await response.json(); 
      return data; 
    } else { 
      console.log('Failed to fetch user info:', response.status); 
      return null; 
    }
  } catch (error) { 
    console.error('Error fetching user info:', error); 
    throw error; 
  }
};

export default getUserInfo;
//getUserInfo라는 함수 export 해서 UserStore에서 사용할거임