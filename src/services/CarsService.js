import { AppState } from "../AppState.js"
import { Car } from "../models/Car.js"
import { api } from "./AxiosService.js"

class CarsService {
  async getCars() {
    // REVIEW Why set cars to [] here?
    AppState.cars = []
    const res = await api.get('api/cars')
    console.log('[GETTING CARS]', res.data)
    AppState.cars = res.data.map(c => new Car(c))
  }

}

export const carsService = new CarsService()