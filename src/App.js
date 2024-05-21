import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import Category from "./Category";

function App() {
  const [categories, setCategories] = useState([]);
  const [finalPro, setFinalProduct] = useState([]);
  let [catName, setCatName] = useState("");

  const getCategory = () => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => res.data)
      .then((finalRes) => {
        setCategories(finalRes);
      });
  };

  const getProducts = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((proRes) => proRes.data)
      .then((finalRes) => {
        setFinalProduct(finalRes.products);
      });
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  useEffect(() => {
    if (catName !== "") {
      axios
        .get(`https://dummyjson.com/products/category/${catName}`)
        .then((proRes) => proRes.data)
        .then((finalRes) => {
          setFinalProduct(finalRes.products);
        });
    }
  }, [catName]);

  const Pitems = finalPro.map((product, index) => {
    return <ProductItems key={index} pdata={product} />;
  });

  return (
    <div className="py-[40px]">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-center text-[40px] font-bold mb-[30px]">
          Our Products
        </h1>
        <div className="grid grid-cols-[30%_auto] gap-[20px]">
          <div>
            <Category categories={categories} setCatName={setCatName} />
          </div>
          <div>
            <div className="grid grid-cols-3 gap-5">
              {finalPro.length >= 1 ? Pitems : "No Product Found"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductItems({ pdata }) {
  return (
    <div className="pb-4 text-center shadow-lg">
      <img
        src={pdata.thumbnail}
        className="w-[100%] h-[220px]"
        alt={pdata.title}
      />
      <h4>{pdata.title}</h4>
      <b>{pdata.price}</b>
    </div>
  );
}

export default App;
