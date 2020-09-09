import axios from "axios";

axios.defaults.baseURL = "http://18.141.178.15:8080/";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.token}`, //the token is a variable which holds the token
  },
};

// POST item/
export const postItem = (item) => {
  return axios
    .post(
      "/item",
      {
        checklistId: item.checklistId,
        itemName: item.itemName,
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

// GET item/{id}
export const getItemById = (item) => {
  const itemId = item.id;
  return axios
    .get("item/" + itemId, config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// PUT item/{id}
export const putItemStatus = (item) => {
  const itemId = item.id;
  return axios
    .put("item/" + itemId, config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// PUT item/rename/{id}
export const putItemRename = (item) => {
  const itemId = item.id;
  return axios
    .put(
      "item/rename" + itemId,
      {
        checklistId: item.checklistId,
        itemName: item.itemName,
      },
      config
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// DELETE item/{id}
export const deleteItem = (item) => {
  const itemId = item.id;
  return axios
    .delete("item/" + itemId, config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return "error";
    });
};
