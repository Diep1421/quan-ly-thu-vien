import { http } from "../../../Utils/baseUrl";

export const CallGetAllSubjects = async () => {
  try {
    const result = await http.get("/subject/get-all-subjects");
    return result.data;
  } catch (error) {
    return error;
  }
};
