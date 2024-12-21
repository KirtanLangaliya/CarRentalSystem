import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../index.css";

function AdminHome() {
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);

  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);

  useEffect(() => {
    dispatch(getAllCars()); // Fetch cars when component mounts
  }, [dispatch]);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2 ">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2 admintitle">Admin Panel</h3>
            <Link to="/addcar">
              <button className="btn1">ADD CAR</button>
            </Link>
          </div>
        </Col>
      </Row>

      {loading && <Spinner />}

      <Row justify="center" gutter={16}>
        {" "}
        {/* Adjust the gutter value as needed */}
        {totalCars.map((car) => (
          <div className="car p-2 bs1">
            <img src={car.image} className="carimg" />
            <div className="car-content d-flex align-items-center justify-content-between">
              <div className="text-left pl-2">
                <p className="carname size">{car.name}</p>
                <p className="text-left">Rent Per Hour {car.rentPerHour} /-</p>
              </div>
              <div className="mr-4">
                <Link to={`/editcar/${car._id}`}>
                  <EditOutlined
                    className="mr-3"
                    style={{
                      color: "green",
                      cursor: "pointer",
                      margin: "16px",
                    }}
                  />
                </Link>
                <Popconfirm
                  title="Are you sure to delete this car?"
                  onConfirm={() => {
                    dispatch(deleteCar({ carid: car._id }));
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
