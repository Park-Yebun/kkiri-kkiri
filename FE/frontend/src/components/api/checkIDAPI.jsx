const IDChack = async (memberId) => {
  const baseURL = "https://kkirikkiri.shop/api";
  try {
    const response = await fetch(`${baseURL}/members/${memberId}/check-login-id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Failed to fetch IDCheck:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching IDCheck:", error);
    throw error;
  }
};

export default IDChack;
