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

  async createCar(carData) {
    const res = await api.post('api/cars', carData)
    console.log('[CREATING NEW CAR]', res.data)
    let newCar = new Car(res.data)
    AppState.cars.push(newCar)
  }

}

export const carsService = new CarsService()