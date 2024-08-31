export const deleteIntellectualProperty = async (
  id: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/intellectualProperties/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} ${response.statusText}. ${errorData.message}`
      );
    }

    const data = await response.json();
    if (data.message === "Intellectual Property deleted") {
      console.log("Deleted Successfully");
      return true;
    } else {
      console.log(
        `Failed to delete intellectual property with ID: ${id}. Server response: ${data.message}`
      );
      return false;
    }
  } catch (err) {
    console.error("Failed to delete intellectual property", err);
    console.log(
      `Failed to delete intellectual property with ID: ${id}. Error: ${
        (err as Error).message
      }`
    );
    return false;
  }
};
