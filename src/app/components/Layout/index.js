/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Layout.module.scss";
import logo from "../../assets/icons/logo.png";
import searchIcon from "../../assets/icons/search.png";
import { getItemsList } from "../../core/store/search";
import { useNavigate } from "react-router-dom";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state);
  const { isSuccess } = items;
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    if (isSuccess) {
      navigate(`/items?search=${searchWord}`);
    }
  }, [isSuccess]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchWord(value);
  };

  const handleSearchInput = (e) => {
    if (searchWord !== "") {
      if (e.key === "Enter") {
        dispatch(getItemsList(searchWord));
      }
    }
  };

  const handleSearch = () => {
    if (searchWord !== "") {
      dispatch(getItemsList(searchWord));
    }
  };

  return (
    <div>
      <div className={styles.layout}>
        <div className={styles.wrapper}>
          <img alt="logo" src={logo} />
          <div className={styles.wrapperSearch}>
            <input
              className={styles.search}
              type="search"
              id="search"
              placeholder="Nunca dejes de buscar"
              value={searchWord}
              onChange={handleChange}
              onKeyDown={handleSearchInput}
            />
            <button className={styles.wrapperIcon} onClick={handleSearch}>
              <img alt="seacrh" src={searchIcon} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.wrapperChildren}>{children}</div>
    </div>
  );
};
