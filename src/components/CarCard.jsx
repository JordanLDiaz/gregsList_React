import { set } from "mobx";
import PropTypes from 'prop-types';
import React from 'react';
import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { carsService } from "../services/CarsService.js";
import Pop from "../utils/Pop.js";

// This provides intellisense, also don't forget to import Car model here
/**@param {{car:Car}} props */
export default function CarCard({ car }) {

  async function removeCar() {
    try {
      const yes = await Pop.confirm('Remove the car?')
      if (!yes) {
        return
      }
      await carsService.removeCar(car.id)
    } catch (error) {
      Pop.error(error.message)
    }
  }

  function setActiveCar() {
    console.log('Setting active car')
    AppState.car = car
  }

  return (

    <div className="carCard card">
      <img onClick={setActiveCar} src={car.imgUrl} alt="car" className="selectable" />
      <div className="card-body" >
        <div className="d-flex justify-content-between">
          <h5>{car.make} {car.model}</h5>
          <div className={AppState.car?.id == car.id ? "d-flex justify-content-between" : "d-none"}>
            <button onClick={removeCar} className="btn btn-outline ms-1" type="button" title="Delete Car!"><span>Remove</span></button>
          </div>
        </div>
      </div>
    </div>
  )

}

CarCard.propTypes = {
  car: PropTypes.instanceOf(Car)
}