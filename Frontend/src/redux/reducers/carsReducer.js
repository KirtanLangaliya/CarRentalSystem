const initialData = {
  cars: [],
  userCars: [], // New state to store cars associated with the current user
};

export const carsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_CARS": {
      console.log("GET_ALL_CARS action dispatched");
      return {
        ...state,
        cars: action.payload,
      };
    }
    case "GET_USER_CARS": {
      console.log("GET_USER_CARS action dispatched");
      return {
        ...state,
        userCars: action.payload,
      };
    }
    case "FILTER_BY_FUEL_TYPE": {
      console.log("FILTER_BY_FUEL_TYPE action dispatched");
      const { fuelType } = action.payload;
      const filteredCars = state.cars.filter(
        (car) => car.fuelType === fuelType
      );
      return {
        ...state,
        cars: filteredCars,
      };
    }
    case "ADD_CAR": {
      console.log("ADD_CAR action dispatched");
      return {
        ...state,
        cars: [...state.cars, action.payload], // Add the new car to the list
      };
    }
    case "DELETE_CAR": {
      console.log("DELETE_CAR action dispatched");
      return {
        ...state,
        cars: state.cars.filter((car) => car._id !== action.payload), // Remove the car by ID
      };
    }
    // Add more cases if you need to handle additional filters or actions
    default:
      return state;
  }
};
