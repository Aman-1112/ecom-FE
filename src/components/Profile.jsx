import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

function Profile(props) {
  const handleStatus = (delivery) => {
    let d = new Date();

    const [deliveryYear, deliveryMonth, deliveryDate] = delivery.split('-');

    if (d.getFullYear() < parseInt(deliveryYear)) {
      return false;
    } else if (d.getFullYear() > parseInt(deliveryYear)) {
      return true;
    } else {
      if (d.getMonth() + 1 < parseInt(deliveryMonth)) {
        return false;
      } else if (d.getMonth() + 1 > parseInt(deliveryMonth)) {
        return true;
      } else {
        if (d.getDate() < parseInt(deliveryDate)) {
          return false;
        } else if (d.getDate() > parseInt(deliveryDate)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  return (
    <div className='d-flex flex-md-row flex-column justify-content-evenly'>
      <div className="text-center">
        <h4>My Profile</h4>
        <img className='rounded-circle' src={props.userDetail.profile.avatar} alt="profilepic"></img>
        <p><strong>Name</strong> : {props.userDetail.profile.name}</p>
        <p><strong>Email</strong> : {props.userDetail.profile.email}</p>
        <Link className='btn btn-secondary rounded-pill mt-4' to="/">Continue Shopping</Link>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              {/* <th scope="col">ORDER_ID</th> */}
              <th scope="col">ORDER_DATE</th>
              <th scope='col'>DELIVERY_DATE</th>
              <th scope="col">PRODUCTS</th>
              <th scope="col">DELIVERY_STATUS</th>
            </tr>
          </thead>
          <tbody>
            {props.userDetail.orders.map((order, index) =>
              <tr>
                <th scope="row">{index + 1}</th>
                {/* <td>{order._id}</td> */}
                <td>{order.orderedAt.split('T')[0]}</td>
                <td>{order.deliveryDate}</td>
                <td>{order.orderedItems.map(product => <p className='d-flex justify-content-around'>{product.productName}<strong>X{product.quantity}</strong> </p>)}</td>
                <td>{handleStatus(order.deliveryDate) ? <h6><i className="fas fa-check fa-2x" style={{ color: "green" }}></i>Delivered
                </h6> : <h6><i className="far fa-clock fa-2x" style={{ color: "red" }}></i>Pending</h6>}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return ({ userDetail: state.userDetailReducer })
}
export default connect(mapStateToProps)(Profile)