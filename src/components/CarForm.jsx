import { observer } from 'mobx-react-lite';
import React from 'react';
import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { carsService } from "../services/CarsService.js";
import { BindEditable } from "../utils/FormHandler.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

// Why is this one observable?
function CarForm() {

  const editable = { ...AppState.car || new Car({}) }
  const bindEditable = BindEditable(editable)

  async function handleSubmit() {
    try {
      window.event.preventDefault()
      logger.log({ editable })
      await carsService.createCar(editable)
    }
    catch (error) {
      Pop.error(error.message)
    }
  }

  return (

    <div className="componentName">

    </div>
  )

}
export default observer(CarForm)