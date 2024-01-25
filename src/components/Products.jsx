import React, { useState, useEffect } from 'react';
import { fs } from '../Config/Config'
import SingleProduct from './SingleProduct';
import { collection, getDocs } from "firebase/firestore";
import '../css/Products.scss'
import '../css/priceRange.scss'
import Select from 'react-select'

const Products = () => {


  const [selectCategorys, setSelectCategorys] = useState([]);
  const [minValue,setMinValue]=useState(2500);
  const [maxValue,setMaxValue]=useState(7500)

  const categorys = [
    { value: "Floral", label: 'Floral' },
    { value: "Fresh", label: 'Fresh' },
    { value: "Woody", label: 'Woody' },
    { value: "Oriental", label: 'Oriental'}
  ];

  const [cards, setCards] = useState([]);
  // console.log(cards);

  async function getProducts() {
    const querySnapshot = await getDocs(collection(fs, "products"));
    // console.log("data");
    var card = []
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      card.push(<SingleProduct id={doc.id} data={doc.data()} />)
    })

    setCards(card)
  }

  useEffect(() => {
    getProducts();
  }, [])

  function handleChange(selctOption) {
    setSelectCategorys(selctOption);
    console.log(selectCategorys)
  }

  function showFilter() {
    console.log("filter")
  }



  // filter price 

  useEffect(() => {
    const rangeInput = document.querySelectorAll(".range-input input"),
      priceInput = document.querySelectorAll(".price-input input"),
      range = document.querySelector(".slider .progress");
    let priceGap = 1000;

    priceInput.forEach(input => {
      input.addEventListener("input", e => {
        let minPrice = parseInt(minValue),
          maxPrice = parseInt(maxValue);

        if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
          if (e.target.className === "input-min") {
            rangeInput[0].value = minPrice;
            range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
          } else {
            rangeInput[1].value = maxPrice;
            range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
          }
        }
      });
    });

    rangeInput.forEach(input => {
      input.addEventListener("input", e => {
        let minVal = parseInt(minValue),
          maxVal = parseInt(maxValue);


        if ((maxVal - minVal) < priceGap) {
          if (e.target.className === "range-min") {
            rangeInput[0].value = maxVal - priceGap
          } else {
            rangeInput[1].value = minVal + priceGap;
          }
        } else {
          priceInput[0].value = minVal;
          priceInput[1].value = maxVal;

          range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
          range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
      });
    });
  },[minValue,maxValue])
  return (
    <>
      <section id="products" class="container section-products">
        <section class="title-section">
          <h2 class="title">Products</h2>
          <p>Order it for you or for your beloved ones</p>

        </section>


        <div className="space" style={{ height: '2em' }}></div>
        <div className="cards-filter">
          <section class="cards container2">

            {cards.length > 0 && (
              <>{cards}</>
            )}

          </section>
          <section className='filter-section'>
            <div className="selection">
              <h1 style={{margin:'1em',fontSize:'20px'}}>Category</h1>
              <Select
                placeholder='Select Categories'
                onChange={handleChange}
                options={categorys}
                isMulti={true}
                styles={{
                  control: (baseStyle, state) => ({
                    ...baseStyle,
                    border: '1px solid white',
                    width: '300px',
                    borderRadius: '0px',
                    ':hover': {
                      cursor: 'pointer',
                      border: '1px solid black',
                    }
                  }),
                  multiValue: (baseStyle) => ({
                    ...baseStyle,
                    height: '30px',
                    fontSize: '17px',
                    background: '#F7F8FA',
                    padding: '10px 5px',
                    borderRadius: '14px',
                  }),
                  multiValueLabel: (baseStyle) => ({
                    ...baseStyle,
                    height: '20px',
                    paddingTop: '5px',
                    color: '#333',
                  }),
                  multiValueRemove: (baseStyle) => ({
                    ...baseStyle,
                    color: '#999',
                    ':hover': {
                      background: '#d6dbe0',
                    },
                  }),
                  placeholder: (baseStyle) => ({
                    ...baseStyle,
                    color: '#999',
                  }),
                  dropdownIndicator: (baseStyle) => ({
                    ...baseStyle,
                    color: '#333',
                  }),
                  menu: (baseStyle) => ({
                    ...baseStyle,
                    width: '300px',
                    maxWidth: '400px',
                  }),
                  option: (baseStyle, state) => ({
                    ...baseStyle,
                    margin: '10px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid black',
                    fontSize: '18px',
                    backgroundColor: state.isSelected ? '#e4e7ea' : 'white',
                    ':hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }),
                }}
              />
            </div>
            <div className="prices">
              <div class="wrapper">
                <h1>Price Range</h1>
                <div class="price-input">
                  <div class="field">
                    <span>Min</span>
                    <input type="number" class="input-min" value={minValue} onChange={(e)=>setMinValue(e.target.value)} readOnly/>
                  </div>
                  <div class="separator">-</div>
                  <div class="field">
                    <span>Max</span>
                    <input type="number" class="input-max" value={maxValue} onChange={(e)=>setMaxValue(e.target.value)} readOnly/>
                  </div>
                </div>
                <div class="slider">
                  <div class="progress"></div>
                </div>
                <div class="range-input">
                  <input type="range" class="range-min" min="0" max="10000" value={minValue} onChange={(e)=>setMinValue(e.target.value)} step="100" />
                  <input type="range" class="range-max" min="0" max="10000" value={maxValue} onChange={(e)=>setMaxValue(e.target.value)} step="100" />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="see-more-product" class="button btn-see-more">
          See more
        </div>
      </section>
    </>
  );
}

export default Products;
