import { message } from "antd";
import axios from "axios";

// Action to get all cars
export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/cars/getallcars");
    dispatch({ type: "GET_ALL_CARS", payload: response.data });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/cars/addcar", reqObj);
    const newCar = response.data; // Assuming the response contains the newly added car

    // Dispatch the action to update the cars list
    dispatch({ type: "ADD_CAR", payload: newCar });

    dispatch({ type: "LOADING", payload: false });
    message.success("New car added successfully");
  } catch (error) {
    console.log("Error adding car:", error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/cars/editcar", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Car details updated successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/cars/deletecar", reqObj);

    // Dispatch an action to remove the car from the state
    dispatch({ type: "DELETE_CAR", payload: reqObj.carid });

    dispatch({ type: "LOADING", payload: false });
    message.success("Car deleted successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
