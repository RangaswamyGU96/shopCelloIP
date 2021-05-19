import React, { Component } from 'react';
import Product from '../product/product';
import Cart from '../cart/cart';
import { Route, Router } from 'react-router';




class Productlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Products: [
                {
                    id: 1,
                    productname: "Mobile",
                    Price: "100"
                },
                {
                    id: 2,
                    productname: "Television",
                    Price: "200"
                }
            ],
            Cart: [{
                id: 89,
                productname: "Pen",
                Price: "100"

            }],
            newproductname: "",
            newproductprice: "",
            editname: "",
            editprice: "",
            editid: "",
            totalcartprice: 100,
            isshowform: false,
            isshowdetails: true,
            isallfieldsfilled: false,
            isshowEditform: false


        }

    }

    componentWillMount() {

        console.log("getproductdetails" + this.props.Products);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    Deleteproducthandler = (prod) => {

        let array = [...this.state.Products];
        console.log(array)
        let index = array.findIndex((list) => {
            return list.id == prod;
        });
        console.log(index);


        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ Products: array });
        }


        this.removefromcartHandler(prod);


    }

    Addproducttocarthandler = (prod) => {
        let array = [...this.state.Products];
        console.log(array)
        let index = array.findIndex((list) => {
            return list.id == prod;
        });
        let newarray = [...this.state.Products];
        let cartarray = newarray[index];
        console.log(newarray[index]);
        const obj = { 'id': cartarray.id, 'productname': cartarray.productname, 'Price': cartarray.Price };
        console.log(obj);
        this.setState({
            Cart: [...this.state.Cart, obj],
            totalcartprice: this.state.totalcartprice + Number(obj.Price),
        })

        console.log(this.state.Cart)
    }

    removefromcartHandler = (prod) => {

        let array = [...this.state.Cart];
        console.log(array)
        let index = array.findIndex((list) => {
            return list.id == prod;
        });
        console.log(index);


        if (index !== -1) {
            console.log(array[index].Price);
            let Price = array[index].Price;
            array.splice(index, 1);


            this.setState({
                Cart: array,
                totalcartprice: this.state.totalcartprice - Price
            });
        }

    }

    EditproductHandler = (prod) => {
        let array = [...this.state.Products];
        console.log(array)
        let index = array.findIndex((list) => {
            return list.id == prod;
        });
        console.log(index);
        let newarray = array[index];

        this.setState({
            editname: newarray.productname,
            editprice: newarray.Price,
            editid: newarray.id,
            isshowform: false,
            isshowdetails: false,
            isshowEditform: true
        })

    }

    UpdateProducthandler = (prod) => {
        alert(prod)
        let array = [...this.state.Products];
        console.log(array)
        let index = array.findIndex((list) => {
            return list.id == prod;
        });
        array[index].productname = this.state.editname;
        array[index].Price = this.state.editprice;
        console.log(array)

        this.setState({
            Products: array,
            isshowform: false,
            isshowdetails: true,
            isshowEditform: false
        })



    }



    render() {

        const createProducthandler = (e) => {
            if (this.state.newproductname == "" || this.state.newproductprice == "") {
                this.setState({
                    isallfieldsfilled: true,
                })
            }
            else {
                const name = this.state.newproductname;
                const price = this.state.newproductprice;
                const newid = Math.floor(Math.random() * 100);
                const obj = { 'id': newid, 'productname': name, 'Price': price };
                this.setState({
                    Products: [...this.state.Products, obj],

                });

                this.setState({
                    isshowdetails: true,
                    isshowform: false,
                    isshowEditform: false
                });
                console.log(this.state.Products);
            }


            //alert("Succesfully Created");
        }



        const productlist = this.state.Products.map((prd, index) => {
            return <Product name={prd.productname}
                id={prd.id}
                price={prd.Price}
                delete={() => this.Deleteproducthandler(prd.id)}
                addtocart={() => this.Addproducttocarthandler(prd.id)}
                edit={() => this.EditproductHandler(prd.id)} />
        })

        const Cartlist = this.state.Cart.map((item) => {
            return <tr> <td>{item.productname}</td>
                <td>{item.Price}</td>
                <td><button onClick={() => { this.removefromcartHandler(item.id) }} className="btn btn-danger">Remove</button></td></tr>
        })



        return (
            <div className="Product-page">
                <div className="main-buttons">
                    <button type="button" className="btn btn-outline-primary" onClick={() => { this.setState({ isshowdetails: false, isshowform: true, isshowEditform: false }) }}>
                        Add product
                    </button>
                    <button type="button" className="btn btn-outline-success" onClick={() => { this.setState({ isshowdetails: true, isshowform: false, isshowEditform: false }) }}>
                        View Products
                    </button>
                </div>

                { this.state.isshowdetails && <div className="mt-4">
                    <h3 className="text-center">Products</h3>
                    <div className="row">
                        {productlist}
                    </div>

                    <div className="mt-5">
                        <h3 className="text-center">
                            Your Cart Details
                    </h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        Product Name
                            </th>
                                    <th>
                                        Price
                            </th>
                                    <th>
                                        Action
                            </th>
                                </tr>

                            </thead>
                            <tbody>
                                {Cartlist}
                                <tr>
                                    <td>

                                    </td>
                                    <td>
                                        Total -- {this.state.totalcartprice}

                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>}

                {this.state.isshowform && <div className="Formcontainer mt-4">
                    <h3 className="text-center" >Add product</h3>
                    <div className="form-group m-2">
                        <label htmlFor="Productname">Product name :</label>
                        <input className="form-control" type="text"
                            value={this.state.newproductname} name="Productname" id="Productname"
                            placeholder="Ex:Mobile"
                            onChange={(event) => { this.setState({ newproductname: event.target.value }) }} />


                    </div>
                    <div className="form-group m-2">
                        <label htmlFor="Productprice">Price:</label>
                        <input type="text" className="form-control" name="Productprice" id="Productprice"
                            value={this.state.newproductprice}
                            placeholder="Ex:2000"
                            onChange={(event) => { this.setState({ newproductprice: event.target.value }) }} />


                    </div>
                    <div className="form-group m-2">
                        {this.state.isallfieldsfilled && <p className="mandotory">All fields are mandotory</p>}


                    </div>

                    <button className="btn btn-primary m-2 " onClick={createProducthandler}>Add Product</button>


                </div>}


                {this.state.isshowEditform && <div className="Formcontainer mt-4">
                    <h3 className="text-center" >Edit product</h3>
                    <div className="form-group m-2">
                        <label htmlFor="Productname">Product name :</label>
                        <input className="form-control" type="text"
                            value={this.state.editname} name="Productname" id="Productname"
                            placeholder="Ex:Mobile"
                            onChange={(event) => { this.setState({ editname: event.target.value }) }} />


                    </div>
                    <div className="form-group m-2">
                        <label htmlFor="Productprice">Price:</label>
                        <input type="text" className="form-control" name="Productprice" id="Productprice"
                            value={this.state.editprice}
                            placeholder="Ex:2000"
                            onChange={(event) => { this.setState({ editprice: event.target.value }) }} />


                    </div>
                    <div className="form-group m-2">
                        {this.state.isallfieldsfilled && <p className="mandotory">All fields are mandotory</p>}


                    </div>

                    <button className="btn btn-primary m-2 " onClick={() => this.UpdateProducthandler(this.state.editid)}>Update Product</button>


                </div>}




            </div>
        );
    }
}

export default Productlist;

