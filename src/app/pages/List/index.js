import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./List.module.scss";
import shipping from "../../assets/icons/shipping.png";

export const ItemsList = () => {
  const { search } = useSelector((state) => state);
  const { searchList } = search;
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    if (searchList && searchList.items.length > 0) {
      setListItems(
        searchList.items.map((ele, indx) => ({
          id: indx,
          image: ele.image,
          currency: ele.price.currency,
          price: ele.price.amount,
          decimals: ele.price.decimals,
          title: ele.title,
          condition: ele.condition,
          freeShipping: ele.free_shipping,
        }))
      );
    }
  }, [searchList]);
  return (
    <div className={styles.card}>
      {listItems.map((ele, indx) => (
        <>
          <div key={indx} className={styles.wrapper}>
            <div className={styles.wrapperImgInfo}>
              <img alt="img" src={ele.image} />
              <div className={styles.wrapperInformation}>
                <div className={styles.wrapperPrice}>
                  <h2>{`${ele.currency} ${ele.price}.${ele.decimals}`}</h2>
                  {ele.freeShipping && <img alt="icon" src={shipping} />}
                </div>
                <h3>{ele.title}</h3>
              </div>
            </div>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};
