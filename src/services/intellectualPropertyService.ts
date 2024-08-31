const API_URL = "http://localhost:8080/api/intellectualProperties";

export const fetchIntellectualProperties = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (err) {
    console.error("Failed to fetch intellectual properties", err);
    return [];
  }
};

export const deleteIntellectualProperty = async (
  id: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const data = await response.json();

    if (data.message === "Intellectual Property deleted") {
      console.log("Deleted successfully");
      return true;
    } else {
      console.log(
        `Failed to delete intellectual property with ID: ${id}. Response: ${data.message}`
      );
      return false;
    }
  } catch (err) {
    console.error("Failed to delete intellectual property", err);
    return false;
  }
};
