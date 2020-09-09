import axios from "axios";

axios.defaults.baseURL = "http://18.141.178.15:8080/";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.token}`, //the token is a variable which holds the token
  },
};

// GET checklist
export const getChecklist = () => {
  return axios
    .get("checklist/", config)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST checklist
export const postChecklist = (checklist) => {
  return axios
    .post(
      "/checklist",
      {
        name: checklist.name,
      },
      config
    )
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((err) => {
      // console.log(err);
      return "error";
    });
};

// DELETE checklist
export const deleteChecklist = (checklist) => {
  const checklistId = checklist.id;
  return axios
    .delete("checklist/" + checklistId, config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return "error";
    });
};
