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
  const [transactionEthereum, setTransactionEhthereum] = useState();

  useEffect(() => {
    if (props.match.path == "/order/me/:id") {
      async function fetchMyAPI() {
        clientRequest.getOrder(props.match.params.id).then((res) => {
          setTransactionEhthereum(res.order.transactionEthereum);
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
          setTransactionEhthereum(res.order.transactionEthereum);
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
        {order.shippingInfo && (
          <div className="order-Confirm">
            <div className="order-Confirm--header d-flex justify-content-between">
              <h3>Order Confirmation</h3>
              <div className="d-flex align-items-center">
                <span>Order Total: </span>{" "}
                <h3> {formatterMoney.format(order.totalPrice)}</h3>{" "}
                <div className="btn-group">
            {order.orderStatus == "Processing" &&
              props.match.path == "/admin/order/:id" && (
                <button
                  className="btn btn-order "
                  onClick={(status) => updateOrderStatus("Confirmed")}
                >
                  Confirm Order
                </button>
              )}
              </div>
              </div>
            </div>
            <div className="order-Confirm--body">
              <div className="order-Confirm--block row">
                <div className="col-6">
                  <h4 className="header-detail">Your information</h4>
                  <span className="row">
                    <label className="label--CustomerName">{user.name}</label>
                    <span>{user.emailUser}</span>
                  </span>
                </div>
                <div className="col-6">
                  <h4 className="header-detail">Shipping Address</h4>
                  <span className="row">
                    <label className="label--CustomerName">{user.name}</label>
                    <span>{order.shippingInfo.address}</span>
                    <span>{order.shippingInfo.city}</span>
                    <span>{order.shippingInfo.country}</span>
                    <span>{order.shippingInfo.postalCode}</span>
                    <span>{order.shippingInfo.phoneNo}</span>
                  </span>
                </div>
              </div>

              <div className="order-Confirm--block row">
                <div className="col-6">
                  <h4 className="header-detail">Payment</h4>
                  <span className="row">
                    <div>
                      <img
                        className="img-Payment "
                        style={{ height: "50px" } }
                        src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png"
                      ></img>
                      <label style={{fontSize:"20px",marginLeft:"10px"}}>Ethereum</label>
                    </div>
                    {
                      transactionEthereum ? (<>
                       <span style={{ marginLeft: "2%" }}>
                      Hash contract:{<a target="_blank" rel="noopener noreferrer" href={"https://rinkeby.etherscan.io/tx/"+transactionEthereum.hash}>{transactionEthereum.hash}</a>}
                      </span>
                      <span style={{ marginLeft: "2%" }}>
                      Hash Blockchain:{<a target="_blank" rel="noopener noreferrer" href={"https://rinkeby.etherscan.io/tx/"+transactionEthereum.hashTransaction}>{transactionEthereum.hashTransaction}</a>}
                      </span>
                      <span style={{ marginLeft: "2%" }}>
                      from:{transactionEthereum.from}
                      </span>
                      <span style={{ marginLeft: "2%" }}>
                      keyword:{transactionEthereum.keyword}
                      </span>
                      <span style={{ marginLeft: "2%" }}>
                      message:{transactionEthereum.message}
                      </span>
                      <span style={{ marginLeft: "2%" }}>
                      value:{transactionEthereum.value} ETH
                      </span></>) :(<></>)

                    
                    }
                  </span>
                </div>
                <div className="col-6">
                  <h4 className="header-detail">Billing Address</h4>
                  <span className="row">
                    <label className="label--CustomerName">{user.name}</label>
                    <span>{order.shippingInfo.address}</span>
                    <span>{order.shippingInfo.city}</span>
                    <span>{order.shippingInfo.country}</span>
                    <span>{order.shippingInfo.postalCode}</span>
                    <span>{order.shippingInfo.phoneNo}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  const FormItems = () => {
    return (
      <>
        {order.orderItems && (
          <>
            <table class="table">
              <thead className="headerTb-Order">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {tableItems &&
                  tableItems.map((item) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <img
                        src={item.image}
                        style={{ width: "60px", height: "50px" }}
                      />
                      <td>{item.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
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
        <div
          className="Order-Detail--footer"
          style={{ minWidth: "255px", minHeight: "200px", float: "right" }}
        >
          <span className="d-flex justify-content-between">
            <label className="label-pay">Subtotal: </label>
            <label>{formatterMoney.format(order.itemsPrice)}</label>
          </span>
          <span className="d-flex justify-content-between">
            <label className="label-pay">Shipping: </label>
            <label>{formatterMoney.format(order.shippingPrice)}</label>
          </span>
          <span className="d-flex justify-content-between">
            <label className="label-pay">Tax: </label>
            <label>{formatterMoney.format(order.taxPrice)}</label>
          </span>
          <span className="d-flex justify-content-between">
            <label className="" style={{ fontSize: "15px" }}>
              Total:{" "}
            </label>
            <h4>{formatterMoney.format(order.totalPrice)}</h4>
          </span>

          <div className="btn-group">
            {order.orderStatus == "Processing" &&
              props.match.path == "/admin/order/:id" && (
                <button
                  className="btn btn-order "
                  onClick={(status) => updateOrderStatus("Confirmed")}
                >
                  Confirm Order
                </button>
              )}
            {order.orderStatus == "Confirmed" &&
              props.match.path == "/admin/order/:id" && (
                <button
                  className="btn btn-order"
                  onClick={(status) => updateOrderStatus("Delivered")}
                >
                  Delivered
                </button>
              )}
            {order.orderStatus == "Delivered" &&
              props.match.path == "/order/me/:id" && (
                <button
                  className="btn"
                  onClick={(status) => updateOrderStatus("Complete")}
                >
                  Has Received
                </button>
              )}
            {order.orderStatus == "Processing" &&
              props.match.path == "/order/me/:id" && (
                <button
                  className="btn"
                  onClick={(status) => updateOrderStatus("Cancel")}
                >
                  Cancel Order
                </button>
              )}
          </div>
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
      <FormShippingInfo />
      <div className="order-DetailTable">
        <FormItems />
      </div>

      <FormTotal />
    </div>
  );
};
export default OrderDetail;
