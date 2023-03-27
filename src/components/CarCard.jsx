import { PropTypes } from "mobx-react";
import React from 'react';
import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";

// This provides intellisense, also don't forget to import Car model here
/**@param {{car:Car}} props */
export default function CarCard({ car }) {

  return (

    <div className="carCard card">
      <img src={car.imgUrl} alt="car" className="selectable" />
      <div className="card-body" >
        <div className="d-flex justify-content-between">
          <h5>{car.make} {car.model}</h5>
          {/* <div className={AppState.car?.id == car.id ? "d-flex justify-content-between" : "d-none"}> */}
          <button className="btn btn-outline ms-1" type="button" title="Delete Car!"><span>Remove</span></button>
        </div>
        {/* </div> */}
      </div>
    </div>
  )

}

// CarCard.propTypes = {
//   car: PropTypes.instanceOf(car)
// }