import React, { useState, useEffect } from 'react';
import { fs } from '../Config/Config'
import SingleProduct from './SingleProduct';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import '../css/Products.scss'
import '../css/priceRange.scss'
import filterIcon from '../img/icones/filter.png'
import sortIcon from '../img/icones/sort.png'
import closeWindow from '../img/icones/close-window.png'
import close from '../img/icones/close-option.png'
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setPriceRange } from '../slices/productSlice'
import { query, orderBy, startAt,limit } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const Products = () => {
 
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const filterCategory = useSelector(state => state.productSlice.categories);
  const priceRange = useSelector(state => state.productSlice.priceRange);
  const [selectCategorys, setSelectCategorys] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(7500)
  const [checkedList, setCheckedList] = useState([])
  const [dataLimit,setDataLimit]=useState(2)
  const [loading,setLoading]=useState('none')

  window.addEventListener('scroll',()=>{
    const scroll = window.scrollY;
    // console.log(scroll)
    if(scroll>=(dataLimit*50)){
      setTimeout(()=>{
        setLoading('block')
        setDataLimit((data)=>data+2);
      })
    }
  })
  const categorys = [
    { value: "Floral", label: 'Floral' },
    { value: "Fresh", label: 'Fresh' },
    { value: "Woody", label: 'Woody' },
    { value: "Oriental", label: 'Oriental' }
  ];

  const [cards, setCards] = useState([]);
  // console.log(cards);

  async function getProducts() {
    const querySnapshot = await getDocs(query(collection(fs, "products"),limit(dataLimit)));

    if (filterCategory.length > 0) {
      getProduct(querySnapshot);
    }
    else {
      var card = []  
     
      querySnapshot.forEach((doc) => { 
        if (priceRange[0] <= (doc.data().price - doc.data().price * doc.data().discount / 100) && (doc.data().price - doc.data().price * doc.data().discount / 100) <= priceRange[1]) {
         card.push(<SingleProduct id={doc.id} data={doc.data()} />)
        }

      })
      console.log(card)
      setCards(card)
      setLoading('none')
    }

  }

  async function getProduct(querySnapshot) {

    var card = []
    const promises = [];

    querySnapshot.forEach((doc) => {
      const promise = getCategories(doc, card);
      promises.push(promise);
    });

    await Promise.all(promises);

    setCards(card)

  }

  async function getCategories(docs, card) {
    await getDoc(doc(fs, `product-categories`, `${docs.id}`)).then(async (document) => {
      if (document.exists() && document.data() && Array.isArray(document.data().categories)) {
        let categoryFormDb = [];

        await Promise.all(document.data().categories.map(async (category) => {
          const docu = await getDoc(doc(fs, `categories`, `${category}`));

          if (docu.exists()) {
            categoryFormDb.push(docu.data().name);
          }
        }));

        console.log(categoryFormDb);
        console.log(filterCategory);

        var valid = false;
        for (let i = 0; i < filterCategory.length; i++) {

          if (categoryFormDb.includes(filterCategory[i])) {

            valid = true;
          }
          else {
            valid = false;
            break;
          }
        }
        if (valid) {
          if (priceRange[0] <= (docs.data().price - docs.data().price * docs.data().discount / 100) && (docs.data().price - docs.data().price * docs.data().discount / 100) <= priceRange[1]) {
            card.push(<SingleProduct id={docs.id} data={docs.data()} />);
          }

        }
      }
    });

  }


  useEffect(() => {
    getProducts();
   
  }, [selectCategorys,dataLimit])

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
  }, [minValue, maxValue])

  function handleCheckboxChange(category) {
    if (document.getElementById(category).checked) {
      setCheckedList((checkedCategories) => [...checkedCategories, category])
    }
    else {
      setCheckedList((checkedCategories) => [...checkedCategories].filter((c) => c !== category))
    }

  }

  function handleFilter() {

    console.log(checkedList);
    dispatch(setCategories(checkedList))
    dispatch(setPriceRange([minValue, maxValue]));
    setSelectCategorys(checkedList);
  }
  function openFilter() {
    document.querySelector('.filter-section').style.animationName = 'filterSection';
    document.querySelector('.filter-section').style.display = 'block';
  }
  function closeFilter() {
    document.querySelector('.filter-section').style.animationName = 'closeSection';
    setTimeout(() => {
      document.querySelector('.filter-section').style.display = 'none';

    }, 1250)
  }

  function clearFilter(id) {
    var categories = checkedList.filter((c) => c !== id);
    console.log(categories)
    setCheckedList(categories)
    dispatch(setCategories(categories))
    setSelectCategorys(categories);

  }

  return (
    <>
      <section id="products" class="container section-products">
        <section class="title-section">
          <h2 class="title">Products</h2>
          <p>Order it for you or for your beloved ones</p>

        </section>

        <div className="filterBtnSection">
          <button className='filterBtn' onClick={openFilter}><img src={sortIcon} alt="" className='filter-icon' /><span> SORT</span></button>
         <div className="filter-div">
          <button className='filterBtn' onClick={openFilter}><img src={filterIcon} alt="" className='filter-icon' /><span> FILTER</span></button>
          </div>
        </div>

        <div className="cards-filter">

          <div className="appliedFilter">
            {

              filterCategory.map((categorys) => (
                <span key={categorys}>
                  <label>{categorys}</label>
                  <button style={{ background: 'none', border: '1px' }} onClick={(e) => clearFilter(e.target.id)}>
                    <img src={closeWindow} alt="" id={categorys} />
                  </button>
                </span>
              ))
            }
          </div>

          <section class="cards container2">

            {cards.length > 0 && (
              <>{cards}</>
              
            )}
          <div style={{display:`${loading}`,color:'#56B180',marginTop:'1em'}}>Loading ...</div>
          </section>
         
          <section className='filter-section'>
            <img src={close} className='close-filter' alt="close filter" onClick={closeFilter} />
            <div className="selection">
              <h1 className='category-title'><b> Category</b></h1>

              <ul>

                {categorys.map((category) => (
                  <li key={category.value} id={`li${category.value}`} style={{ marginBottom: '1em' }}>
                    <input type="checkbox" name="" id={category.value}
                      checked={checkedList.includes(category.value)}
                      onChange={() => handleCheckboxChange(category.value)}
                    />
                    <label htmlFor="">{category.label}</label>
                  </li>
                ))}

              </ul>
            </div>
            <div className="prices">
              <div class="wrapper">
                <h1><b> Price Range</b></h1>
                <div class="price-input">
                  <div class="field">
                    <span>Min</span>
                    <input type="number" class="input-min" value={minValue} onChange={(e) => setMinValue(e.target.value)} readOnly />
                  </div>
                  <div class="separator">-</div>
                  <div class="field">
                    <span>Max</span>
                    <input type="number" class="input-max" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} readOnly />
                  </div>
                </div>
                <div class="slider">
                  <div class="progress"></div>
                </div>
                <div class="range-input">
                  <input type="range" class="range-min" min="0" max="10000" value={minValue} onChange={(e) => setMinValue(e.target.value)} step="100" />
                  <input type="range" class="range-max" min="0" max="10000" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} step="100" />
                </div>
              </div>
            </div>
            <button type="button" className='apply-filter' onClick={handleFilter}>Apply</button>
          </section>
        </div>
       
      </section>
    </>
  );
}

export default Products;
