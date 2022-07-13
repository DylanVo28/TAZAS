import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import clientRequest from "../../APIFeatures/clientRequest";
import { TransactionContext } from "../../context/TransactionContext";
import ModalComponent from "../shared/ModalComponent";
import {
  formatterMoney,
  getFormattedDate,
} from "./../../HandlerCaculate/formatDate";
import ModalPopup from "./../shared/ModalPopup";
import "../../css/Detail.css";
const OrderDetail = (props) => {
  const {
    connectWallet,
    currentAccount,
    formData,
    setFormData,
    handleChange,
    sendTransaction,
  } = useContext(TransactionContext);

  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [openFormETH, setOpenFormETH] = useState(false);

  const [tableItems, setTableItems] = useState();
  const [discount, setDiscount] = useState();
  const [crypto, setCrypto] = useState({
    BTC: 0,
    ETH: 0,
    EUR: 0,
    USD: 0,
  });
  useEffect(() => {
    if (props.match.path == "/order/me/:id") {
      async function fetchMyAPI() {
        clientRequest.getOrder(props.match.params.id).then((res) => {
          setOrder(res.order);
          setTableItems(res.orderItems);
          setUser(res.user);
          setDiscount(res.discount);
        });
        clientRequest.getCryptoCompare().then((res) => {
          setCrypto({ ...res });
        });
      }
      fetchMyAPI();
    }
    if (props.match.path == "/admin/order/:id") {
      async function fetchMyAPIRoleAdmin() {
        clientRequest.getOrderRoleAdmin(props.match.params.id).then((res) => {
          setOrder(res.order);
          setTableItems(res.orderItems);
          setUser(res.user);
          setDiscount(res.discount);
        });
      }
      fetchMyAPIRoleAdmin();
    }
  }, []);
  const FormUser = () => {
    return (
      <>
        <h4>Customer</h4>
        {user._id && (
          <div className="row form-user">
            <div className="col-12">
              <div className="avatar">
                <img src={user.avatar.url} />
              </div>
            </div>
            <div className="col-3">Email:</div>
            <div className="col-9">{user.emailUser}</div>
            <div className="col-3">Name:</div>
            <div className="col-9">{user.name}</div>
          </div>
        )}
      </>
    );
  };
  const FormShippingInfo = () => {
    return (
      <>
        <h4>Shipping Info</h4>
        {order.shippingInfo && (
          <div className={"row"}>
            <div className="col-3">Address:</div>
            <div className="col-9">{order.shippingInfo.address}</div>
            <div className="col-3">City:</div>
            <div className="col-9">{order.shippingInfo.city}</div>
            <div className="col-3">Phone Num:</div>
            <div className="col-9">{order.shippingInfo.phoneNo}</div>
            <div className="col-3">Postal Code:</div>
            <div className="col-9">{order.shippingInfo.postalCode}</div>
            <div className="col-3">Country:</div>
            <div className="col-9">{order.shippingInfo.country}</div>
          </div>
        )}
      </>
    );
  };
  const FormItems = () => {
    return (
      <>
        <h4>Order Items</h4>
        {order.orderItems && (
          <>
            <div className="row">
              <div className="col-3">Name</div>
              <div className="col-3">Quantity</div>
              <div className="col-3">Image</div>
              <div className="col-3">Price</div>
            </div>
            {tableItems &&
              tableItems.map((item) => (
                <div className="row">
                  <div className="col-3">{item.name}</div>
                  <div className="col-3">{item.quantity}</div>
                  <div className="col-3">
                    <img src={item.image} style={{ width: "40px" }} />
                  </div>
                  <div className="col-3">{item.price}</div>
                </div>
              ))}
          </>
        )}
      </>
    );
  };
  const FormEthereum = () => {
    return (
      <>
        <input
          placeholder="Address To"
          name="address"
          onChange={(e) => handleChange(e, "address")}
        ></input>
        <input
          placeholder="Amount (ETH)"
          name="amount"
          onChange={(e) => handleChange(e, "amount")}
        ></input>
        <input
          placeholder="Keyword (Gif)"
          name="keyword"
          onChange={(e) => handleChange(e, "keyword")}
        ></input>
        <input
          placeholder="Enter Message"
          name="message"
          onChange={(e) => handleChange(e, "message")}
        ></input>
      </>
    );
  };
  const changeUSDToETH = () => {
    // return (order.totalPrice / crypto.USD) * crypto.ETH * 100 / 100;
    return crypto.USD;
  };
  const FormTotal = () => {
    return (
      <>
        <h4>Total</h4>
        <div className={"row"}>
          <div className="col-4">Payment method:</div>
          <div className="col-8">{order.paymentMethod}</div>
          <div className="col-4">Paid At:</div>
          <div className="col-8">
            {order.paidAt ? getFormattedDate(order.paidAt) : ""}
          </div>
          <div className="col-4">Items Price:</div>
          <div className="col-8">{formatterMoney.format(order.itemsPrice)}</div>
          <div className="col-4">Tax Price:</div>
          <div className="col-8">{formatterMoney.format(order.taxPrice)}</div>
          <div className="col-4">Shipping Price:</div>
          <div className="col-8">
            {formatterMoney.format(order.shippingPrice)}
          </div>
          <div className="col-4">Total Price:</div>
          <div className="col-8">{formatterMoney.format(order.totalPrice)}</div>
          <div className="col-4">ETH:</div>
          <div className="col-8">{changeUSDToETH()}</div>
          <div className="col-4">Order Status:</div>
          <div className="col-8">{order.orderStatus}</div>
          <div className="col-4">Created At:</div>
          <div className="col-8">{getFormattedDate(order.createAt)}</div>
          <div className="col-4">Discount code:</div>
          {discount && <div className="col-8">{discount.name}</div>}
        </div>
      </>
    );
  };

  const updateOrderStatus = (status) => {
    clientRequest
      .updateOrder(order._id, status)
      .then((res) => {
        setOrder({ ...order, orderStatus: res.order.orderStatus });
        NotificationManager.success("Success", "success");
      })
      .catch((err) => NotificationManager.error("Success", "error"));
  };

  return (
    <div className="container py-4 order-detail">
      <div className="order-Confirm">
        <div className="order-Confirm--header d-flex justify-content-between">
          <h3>Order Confirmation</h3>
          <div className="d-flex align-items-center">
            <span>Order Total: </span> <h3> $3255.85</h3>{" "}
            <button type="button" class="btn btn-order">
              Place Order
            </button>
          </div>
        </div>
        <div className="order-Confirm--body">
          <div className="order-Confirm--block row">
          <div className="col-6">
            <h4 className="header-detail">Your information</h4>
            <span className="row">
              <label>Min Peng</label>
              <span>nhathk2410@gmail.com</span>
            </span>
          </div>
          <div className="col-6">
            <h4 className="header-detail">Shipping Address</h4>
            <span className="row">
              <label>Min Peng</label>
              <span>nhathk2410@gmail.com</span>
            </span>
          </div>
          </div>
         
        </div>
      </div>

      <div className="order-DetailTable"></div>
    </div>
  );
};
export default OrderDetail;
