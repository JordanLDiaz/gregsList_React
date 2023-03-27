import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { AppState } from "../AppState.js";
import CarCard from "../components/CarCard.jsx";
import { carsService } from "../services/CarsService.js";
import Pop from "../utils/Pop.js";

function HomePage() {

  async function getCars() {
    try {
      console.log('getting cars')
      await carsService.getCars()
    } catch (error) {
      Pop.error(error.message)
    }
  }

  // This is like a computed. Here we are computing what cars is, and putting the template for a single carCard in the return. Then we place the {cars} in main return down below which is essentially like a component within a component.
  let cars = (AppState.cars.map(c => {
    return (
      <div className="col-md-4 my-3" key={c.id}>
        <CarCard car={c} />
      </div>
    )
  }))

  // UseEffect is a global hook that takes care of onMounted, onChange, and more. 
  // Contains array that will contain list of variables to be watched.
  useEffect(() => {
    getCars()
  }, [])

  return (
    <section className="home-page">
      <div className="container my-3">
        <div className="row">
          {/* Here is where we put our "computed" cars from appstate */}
          {cars}
        </div>
        <div className="row sticky-bottom">
          <div className="col-12 text-end">
            <button className="row btn btn-dark" title="Create Car" onClick={createCar} data-bs-toggle="modal" data-bs-target="#carModal">
              <span>🚗</span>
            </button>
          </div>
        </div>
      </div>

      {/* BOOTSTRAP MODAL */}
      <div className="modal fade" id="carModal" tabIndex={-1} aria-labelledby="carModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Car</h1>
              <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {AppState.car ? <CarForm /> : null}
          </div>
        </div>
      </div>
    </section>

  )
}

// !rt:observable gives this export, will use this on pages, but not necessarily components. Components will more likely be !rt:function because individual components do not need to be observables, just need to be HTML (per jake's lecture)
export default observer(HomePage)