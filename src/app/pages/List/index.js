/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./List.module.scss";
import shipping from "../../assets/icons/shipping.png";
import { categoryResult } from "../../utilities/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { getItemsList } from "../../core/store/search";

export const ItemsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchWord = params.get("search");
  const { items } = useSelector((state) => state);
  const { searchList } = items;
  const [listItems, setListItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (searchWord !== "") {
      dispatch(getItemsList(searchWord));
    }
  }, [searchWord]);

  useEffect(() => {
    if (searchList && searchList.items.length > 0) {
      setListItems(
        searchList.items.map((ele, indx) => ({
          key: indx,
          id: ele.id,
          image: ele.picture,
          currency: ele.price.currency,
          price: ele.price.amount,
          title: ele.title,
          condition: ele.condition,
          freeShipping: ele.free_shipping,
          location: ele.address,
        }))
      );
    }

    if (searchList && searchList.categories.length > 0) {
      setCategories(searchList.categories);
    }
  }, [searchList]);

  const handleDetail = (id, index) => {
    navigate(
      `/items/${id}?itemCategory=${categories[index]}&category=${categoryResult(
        categories
      )}&searchWord=${searchWord}`
    );
  };

  return (
    <div>
      <div className={styles.breadcrumb}>
        <h4 style={{ color: "#999999" }}>{categoryResult(categories)}</h4>
      </div>
      <div className={styles.card}>
        {listItems.slice(0, 4).map((ele, indx) => (
          <>
            <div key={indx} className={styles.wrapper}>
              <div
                className={styles.wrapperImgInfo}
                onClick={() => handleDetail(ele.id, ele.key)}
              >
                <img
                  alt="img"
                  src={ele.image}
                  height="180px"
                  width="180px"
                  style={{ borderRadius: "4px" }}
                />
                <div className={styles.wrapperInformation}>
                  <div className={styles.wrapperPrice}>
                    <h2>{`${ele.currency} ${ele.price}`}</h2>
                    {ele.freeShipping && <img alt="icon" src={shipping} />}
                  </div>
                  <div>
                    <h3>{ele.title}</h3>
                    <h3>{ele.condition === "new" ? "Nuevo" : ele.condition}</h3>
                  </div>
                </div>
              </div>
              <div className={styles.wrapperLocation}>
                <h5 style={{ color: "#666666" }}>{ele.location}</h5>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};
