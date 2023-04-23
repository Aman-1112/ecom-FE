import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import Card from './Card';
import { fetchSearchedProducts } from './actions';


function SearchList(props) {
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [searchList, setSearchList] = useState([])
    const [filteredSearchList, setFilteredSearchList] = useState([]);
    const [initial, setInitial] = useState(true); //   Just to check if filter button has been clicked once
    let List;
    /**********material UI slider****/
    const [value1, setValue1] = useState([0, 200]);
    const minDistance = 10;
    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };
    /*********************/
    const searchItem = props.match.params.searchItem;
    useEffect(() => {
        props.fetchSearchedProducts(searchItem);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {//! BIG DOUBBBBTTTT...........
            firstUpdate.current = false;
            return;
        }

        let newProductList = props.ProductList.filter((ele) => ele.name.match(regex));
        setSearchList(newProductList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    function handleClick() {
        setInitial(false);
        /***Filter Over Range****/
        let min = value1[0];
        let max = value1[1];
        let productList = searchList.filter(ele => ele.price >= min && ele.price <= max)

        /***Filter Over Category****/
        if (selectedCategory.length)
            productList = productList.filter(ele => selectedCategory.includes(ele.category));

        /***Filter Over Order****/
        var select = document.querySelector('.form-select');
        var value = select.options[select.selectedIndex].value;
        // console.log(value);
        if (value === "Desc")
            productList = productList.sort((a, b) => (b.price - a.price));
        else
            productList = productList.sort((a, b) => a.price - b.price);

        setFilteredSearchList(productList);
    }

    function toggle(e) {
        if (selectedCategory.includes(e.target.id)) {
            let x = selectedCategory.filter((ele) => ele !== e.target.id);
            setSelectedCategory(x)
        }
        else {
            setSelectedCategory([...selectedCategory, e.target.id])
        }
    }
    const regex = new RegExp(searchItem, "ig");

    if (searchList.length !== 0) {
        if (initial) {    //Only initial time show searchList ,every other time show filteredList
            List = searchList;
        }
        else {
            List = filteredSearchList;
        }
        return (
            <>
                <Link to="/" className='btn btn-secondary'>Go Home</Link>
                <Box sx={{ width: 300 }} >
                    <h5>Price Range</h5>
                    <Slider
                        getAriaLabel={() => 'Minimum distance'}
                        value={value1}
                        onChange={handleChange1}
                        min={0}
                        max={200}
                        valueLabelDisplay="auto"
                        disableSwap
                    />
                    Min <input className='w-25 text-center' type="text" value={value1[0]} readOnly ></input> - Max <input className='w-25 text-center' type="text" value={value1[1]} readOnly></input>
                </Box>
                <input id='men' onClick={toggle} type="checkbox"></input>
                <label htmlFor='men'>Men</label>
                <input id='women' onClick={toggle} type="checkbox"></input>
                <label htmlFor='women'>Women</label>
                <input id='electronics' onClick={toggle} type="checkbox"></input>
                <label htmlFor='electronics'>Electronics</label>

                <h6>Sort By Price</h6>
                <select className="form-select" style={{ width: "20%", display: "inline-block" }} >
                    <option value="Asc">Asc</option>
                    <option value="Desc">Desc</option>
                </select>
                <button onClick={handleClick} >Apply Filter</button>

                <div className='text-center'>{List.map((ele, index) => <Card
                    key={index}
                    id={ele._id}
                    name={ele.name}
                    imageUrl={ele.image}
                    brand={ele.brand}
                    price={ele.price}
                />)}</div>
            </>
        )
    }
    else {
        return (<>
            <Link to="/" className='btn btn-secondary'>Go Home</Link>
            <div className="m-5 d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>)
    }

}
function mapStateToProps(state) {
    return { ProductList: state.fetchProductReducer }
}
export default connect(mapStateToProps, { fetchSearchedProducts })(SearchList);