import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
function Card(props) {
    return (

        <Link to={`/product/${props.id}`}>
            <div className="card card-of-list">
                <img className="card-img-top" src={`http://${props.imageUrl}`} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.brand}</h5>
                    <p>Rating:⭐⭐⭐⭐⭐</p>
                    <p>₹{props.price}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card
