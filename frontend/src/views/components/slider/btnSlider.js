import React from "react";
import "./slider.css";
import leftArrow from "../../../assets/img/arrow-left.png";
import rightArrow from "../../../assets/img/arrow-right.png";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} alt="slider-photo" />
    </button>
  );
}