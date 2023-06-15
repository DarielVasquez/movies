import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Form,
  FormControl,
  Col,
  Row,
  Button,
  Badge,
  CloseButton,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  MdMenu,
  MdOutlineShoppingCart,
  MdOutlineSettings,
  MdShoppingBasket,
  MdAdd,
  MdRemove,
} from "react-icons/md";
import { useAppSelector, useAppDispatch } from "../app/hook";
import {
  addToCart,
  removeOneFromCart,
  removeItemFromCart,
} from "../features/cart/cartSlice";
import { fetchCategories } from "../features/categories/categoriesSlice";
import ShopIcon from "../../public/shop.png";

const NavigationBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const categories = useAppSelector((state) => state.categories.data);
  const loading = useAppSelector((state) => state.categories.loading);
  const error = useAppSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <nav
        style={{
          backgroundColor: "gray",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "1",
        }}
      >
        <div style={{ backgroundColor: "#053C5E" }}>
          <Container className="p-1">
            <Row>
              <div className="text-light">Welcome, {`John Doe`}</div>
            </Row>
          </Container>
        </div>
        <div style={{ backgroundColor: "#1F7A8C" }}>
          <Container className="p-2">
            <Row>
              <Col
                xs="2"
                sm="1"
                md="1"
                lg="1"
                className="d-flex justify-content-center align-items-center"
              >
                <Link to={"/"} className="d-flex">
                  <img
                    src={ShopIcon}
                    alt="Shop Icon"
                    style={{ width: "25px", height: "25px" }}
                  />
                </Link>
              </Col>
              <Col
                xs="2"
                sm="2"
                md="2"
                lg="2"
                className="d-flex justify-content-center align-items-center"
              >
                <Dropdown>
                  <Dropdown.Toggle>
                    <div className="d-flex align-items-center">
                      <MdMenu className="icons-size"></MdMenu>
                      <span className="ps-md-2 d-none d-sm-block">Menu</span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Link to="/" className="dropdown-item">
                      Home
                    </Link>
                    <Link to="/about" className="dropdown-item">
                      About
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs="4" sm="7" md="7" lg="7">
                <Form className="d-flex justify-content-center">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                </Form>
              </Col>
              <Col
                xs="2"
                sm="1"
                md="1"
                lg="1"
                className="d-flex justify-content-end align-items-end"
              >
                <Dropdown align={{ xl: "start" }}>
                  <Dropdown.Toggle>
                    <MdOutlineSettings className="icons-size"></MdOutlineSettings>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      Settings
                    </Link>
                    <Dropdown.Divider />
                    <Link to="/" className="dropdown-item">
                      Logout
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col
                xs="2"
                sm="1"
                md="1"
                lg="1"
                className="d-flex justify-content-end align-items-end"
              >
                <Dropdown align={{ xs: "start" }}>
                  <Dropdown.Toggle>
                    <div className="d-flex align-items-center">
                      <MdOutlineShoppingCart className="icons-size"></MdOutlineShoppingCart>
                      {totalAmount !== 0 && (
                        <Badge
                          bg="secondary"
                          style={{
                            position: "absolute",
                            top: "-5px",
                            left: "25px",
                          }}
                        >
                          {totalAmount}
                        </Badge>
                      )}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "clamp(25vw, 500px, 95vw)" }}>
                    {cartItems?.length === 0 ? (
                      <Container className="d-flex align-items-center justify-content-center p-2">
                        No items added...
                      </Container>
                    ) : (
                      cartItems?.map((item, i) => {
                        const { id, title, amount, total, image, price } = item;
                        return (
                          <Container key={id}>
                            <Link to={"/"} className="dropdown-item">
                              <Row>
                                <Col
                                  xs="1"
                                  className="d-flex align-items-center justify-content-center"
                                  onClick={() =>
                                    dispatch(removeItemFromCart(item))
                                  }
                                >
                                  <CloseButton></CloseButton>
                                </Col>
                                <Col
                                  xs="3"
                                  sm="2"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <img
                                    src={image}
                                    alt={title}
                                    className="cart-img"
                                  />
                                </Col>
                                <Col
                                  sm="4"
                                  className="d-sm-flex d-none align-items-center justify-content-center"
                                  style={{ whiteSpace: "normal" }}
                                >
                                  <span style={{ padding: "5px" }}>
                                    {title.length > 30
                                      ? `${title.slice(0, 30)}...`
                                      : title}
                                  </span>
                                </Col>
                                <Col
                                  xs="6"
                                  sm="3"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <Button
                                    variant="success"
                                    style={{
                                      fontSize: "clamp(6px, 10px, 12px)",
                                    }}
                                    onClick={() => dispatch(addToCart(item))}
                                  >
                                    <MdAdd></MdAdd>
                                  </Button>
                                  <span className="p-2">{amount}</span>
                                  <Button
                                    variant="danger"
                                    style={{
                                      fontSize: "clamp(6px, 10px, 12px)",
                                    }}
                                    onClick={() =>
                                      dispatch(removeOneFromCart(item))
                                    }
                                  >
                                    <MdRemove></MdRemove>
                                  </Button>
                                </Col>
                                <Col
                                  xs="1"
                                  sm="2"
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <Row>
                                    <span>
                                      $
                                      {total !== price && amount === 1
                                        ? price
                                        : total}
                                    </span>
                                  </Row>
                                </Col>
                              </Row>
                            </Link>
                          </Container>
                        );
                      })
                    )}
                    <Dropdown.Divider />
                    <Link to={"/cart"} className="dropdown-item text-center">
                      View Cart
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
        </div>
        <div
          style={{
            backgroundColor: "#1F7A8C",
            borderTop: "1px solid white",
            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.5)",
            color: "white",
          }}
          className="d-sm-flex d-none"
        >
          <Container className="p-2">
            <div className="d-flex flex-row">
              {categories?.map((cat, i) => {
                return (
                  <Link
                    key={i}
                    className="text-capitalize link-underline ps-3 pe-3"
                    to={`/category/${cat}`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </Container>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
