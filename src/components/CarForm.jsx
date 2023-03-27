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
    <form onSubmit={handleSubmit} key={editable.id}>
      <div className="modal-body">
        <div className="mb-3">
          <label htmlFor="make" className="form-label">Make</label>
          <input type="text" defaultValue={editable.make} className="form-control" id="make" placeholder="Make..." name="make" required onChange={bindEditable} />
        </div>
        <div className="mb-3">
          <label htmlFor="model" className="form-label">Model</label>
          <input type="text" defaultValue={editable.model} className="form-control" id="model" placeholder="Model..." name="model" required onChange={bindEditable} />
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">Year</label>
          <input type="text" defaultValue={editable.year} className="form-control" id="year" placeholder="Year..." name="year" required onChange={bindEditable} />
        </div>
        <div className="mb-3">
          <label htmlFor="imgUrl" className="form-label">Image Url</label>
          <input type="text" defaultValue={editable.imgUrl} className="form-control" id="imgUrl" placeholder="Image Url..." name="imgUrl" required onChange={bindEditable} />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="text" defaultValue={editable.price} className="form-control" id="price" placeholder="Price..." name="price" required onChange={bindEditable} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" defaultValue={editable.description} className="form-control" id="description" placeholder="Description..." name="description" required onChange={bindEditable} />
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
      </div>
    </form>
  )

}
export default observer(CarForm)