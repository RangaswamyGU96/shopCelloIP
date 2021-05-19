import React from 'react';
import '../product/product.css'


function Prodlist(props) {
    return (
        <div className="col-sm-12 col-md-4  col-lg-4"   >
            <div className="card product-card ">
                <div className="product-detail  ">
                    <p className="product-item"> {props.name}</p>
                </div>

                <div className="product-detail">

                    <p className="product-item">{props.price} Rs</p>
                </div>
                <div className="product-detail">

                    <button id="Addtocart" onClick={props.addtocart} type="button" className="btn btn-info text-center">
                        Add to cart
                </button>
                </div>

                <div className="update-buttons">
                    <button type="button" onClick={props.edit} className="btn btn-info">
                        Edit
                </button>
                    <button onClick={props.delete} type="button" className="btn btn-danger">
                        Delete
                </button>
                </div>

            </div>
        </div>
    );
}

export default Prodlist;