import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { GlassMagnifier } from "react-image-magnifiers";
import { useHistory } from 'react-router-dom';

import { fetchProduct, verifyToken, addProductToCart } from './actions/index';
import './ProductPage.css';

function ProductPage(props) {
  const quantity = useRef(0);
  const history = useHistory();
  const productId = props.match.params.productId;

  useEffect(() => {
    props.fetchProduct(productId);
    props.verifyToken(localStorage.getItem('token'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const product = props.Products.find(({ _id }) => _id === productId)

  function handleAddToCart(e) {
    e.preventDefault();
    // console.log(quantity.current.value);
    if (!quantity.current.value) {
      alert("Input some Quantity!")
      return;
    } else {
      if (props.userDetail.isSignedIn) {
        // console.log(props.userDetail);
        props.addProductToCart({ id: props.userDetail.profile.id, product, quantity: quantity.current.value })
        history.push('/cart')
      } else {
        history.push('/login')
      }
    }
  }
  if (!product) {
    return <div className="loader">Loading...</div>
  }
  return (
    <>
      <button className="btn btn-secondary home" onClick={() => window.history.back()}>Go Back</button>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 ">
            <GlassMagnifier
              className="productImg"
              imageSrc={`https://${product.image}`}
              magnifierBorderColor="grey"
              magnifierSize="30%"
              imageAlt="Product image"
            />
          </div>
          <div className="col-12 col-md-4 productDetail" >
            <h2>{product && product.brand[0].toUpperCase() + product.brand.slice(1)}</h2>
            <hr />
            <h2>{product.name}</h2>
            <hr />
            <h6>Rating:⭐⭐⭐⭐⭐</h6>
            <hr />
            <p><strong>Price:</strong> ₹{product.price}</p>
            <hr />
            <p><strong>Description: </strong>{product.description ? product.description : product.name}</p>
            <p><strong>Category: </strong>{product.category}</p>
          </div>
          <div className="col-12 col-md-3">
            <div className="card card-of-detail" >
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Price:<p className="price">₹{product.price}</p></li>
                <li className="list-group-item">Quantity:<input ref={quantity} type="number" min="1" max="10" ></input></li>
                <li className="list-group-item cart"><a href='/#' onClick={handleAddToCart} className="btn btn-dark">Add to Cart</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function mapStateToProps(state) {
  return {
    Products: state.fetchProductReducer,
    userDetail: state.userDetailReducer
  }
}
export default connect(mapStateToProps, { fetchProduct, verifyToken, addProductToCart })(ProductPage)