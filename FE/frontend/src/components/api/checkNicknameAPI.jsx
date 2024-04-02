const Nicknamecheck = async (nickname) => {
  const baseURL = "https://kkirikkiri.shop/api";
  try {
    const response = await fetch(`${baseURL}/members/${nickname}/check-nickname`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Failed to fetch NicknameCheck:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching NicknameCheck:", error);
    throw error;
  }
};

export default Nicknamecheck;
