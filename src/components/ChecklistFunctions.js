import axios from "axios";

axios.defaults.baseURL = "http://18.141.178.15:8080/";

export const getCommoditiesByStatus = () => {
  return axios
    .get("commodities/status/1")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCommodities = () => {
  return axios
    .get("checklist/", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`, //the token is a variable which holds the token
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postChecklist = (checklist) => {
  return axios
    .post(
      "/checklist",
      {
        name: checklist.name,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, //the token is a variable which holds the token
        },
      }
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

export const postCommodityUpdate = (commodity) => {
  return axios
    .post(
      "commodities/update",
      {
        id: commodity.id,
        name: commodity.name,
        price: commodity.price,
        status: commodity.status,
        date: commodity.date,
      },
      {
        headers: {
          Authorization: localStorage.usertoken,
        },
      }
    )
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteChecklist = (checklist) => {
  const checklistId = checklist.id;
  return axios
    .delete("checklist/" + checklistId, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`, //the token is a variable which holds the token
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return "error";
    });
};
