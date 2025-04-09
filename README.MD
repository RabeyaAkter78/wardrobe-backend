## project details

# Project Name: Car store (CRUD)

# set-up Project :

* Install : express , mongoose, typescript, dotenv ,cors
* Create folder called src on the root of the project and under src folder, create file-->  app.ts and server.ts ,

--> under src: create app folder.
--> Under app: config and modules folder.
--> under config: index.ts folder,
--> under modules: make all the models here. like car, order

* create a tsconfig.json file .
-->Command: tsc --init
--> make : rootdir:"./src" , outDir:"./dist" 


on Car module: follow the rule: Interface -> models -> service ->  controller -> route 

## Features:

# Car:
* frist i create service for all features functionality, then controller and then route.

   * createCar -> craete(),

   * getAllCars -> find(),
   *  getSIngleCar -> findById(),
   * updateCar -> findByIdAndUpdate(),
   * deleteCar -> findByIdAndDelete()

# Order:
  * createOrder -> 
  
  --> if the car is available : findById(),
  --> update the quantity : findByIdAndUpdate()
  * getRevinew -->
  aggregate([{
        $group: {
            _id: null,
            totalPrice: {
                $sum: "$totalPrice"

            }
        }
    }])



-----------------------------------
## versel.json file for deploy:
{
    "version": 2,
    "builds": [
      {
        "src": "src/server.ts",
        "use": "@vercel/node",
        "config": { "includeFiles": ["src/**/*.ts"] }
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "src/server.ts"
      }
    ]
  }







