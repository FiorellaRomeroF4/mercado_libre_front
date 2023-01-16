/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getItemDetail, getItemsList } from "../../core/store/search";
import styles from "./Detail.module.scss";

export const ItemDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const category = params.get("category");
  const itemCategory = params.get("itemCategory");
  const searchWord = params.get("search");
  const { items } = useSelector((state) => state);
  const { itemDetail, isSuccessDetail, isLoadingDetail } = items;
  const [item, setItem] = useState({});

  useEffect(() => {
    dispatch(getItemDetail(id));
  }, []);

  useEffect(() => {
    if (isSuccessDetail) {
      setItem(itemDetail);
    }
  }, [isSuccessDetail]);

  const handleBack = () => {
    navigate(`/items?search=${searchWord}`);
    dispatch(getItemsList(searchWord));
  };

  const handleBuy = () => {
    console.log("add to cart");
  };

  return (
    <div>
      <div className={styles.breadcrumb}>
        {category && itemCategory && (
          <>
            <button onClick={handleBack} className={styles.linkButton}>
              {category}
            </button>
            <h4 style={{ color: "#999999" }}>{`> ${itemCategory}`}</h4>
          </>
        )}
      </div>
      <div className={styles.card}>
        {isLoadingDetail ? (
          <div style={{ width: "883.33px", height: "800px" }}></div>
        ) : (
          <>
            <div className={styles.wrapperHeader}>
              <div className={styles.wrapperImage}>
                <img
                  alt="item"
                  src={item.picture}
                  width="580px"
                  height="580px"
                />
              </div>
              <div className={styles.wrapperInfo}>
                <h4 style={{ marginBottom: "16px" }}>{`${
                  item.condition === "new" ? "Nuevo" : item.condition
                } - ${item.sold_quantity} ${
                  item.sold_quantity === 1 ? "vendido" : "vendidos"
                } `}</h4>
                <h2 style={{ fontWeight: "700", lineHeight: "1.25em" }}>
                  {item.title}
                </h2>
                <div
                  style={{ fontSize: "46px", margin: "32px 0 32px 0" }}
                >{`${item.price?.currency} ${item.price?.amount}`}</div>
                <button className={styles.button} onClick={handleBuy}>
                  Comprar
                </button>
              </div>
            </div>
            <div className={styles.wrapperFooter}>
              <div style={{ fontSize: "28px", marginBottom: "32px" }}>
                Descripción del producto
              </div>
              <p style={{ color: "#999999" }}>{item.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
