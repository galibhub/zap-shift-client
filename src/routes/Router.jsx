import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivetRoute from "./PrivetRoute";
import Raider from "../pages/Raider/Raider";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'raider',
        element:<PrivetRoute>
          <Raider></Raider>
        </PrivetRoute>
      },

      {
    path:'send-parcel',
    element:<PrivetRoute>
      <SendParcel></SendParcel>
    </PrivetRoute>,
    loader:()=>fetch('/serviceCenter.json').then(res=>res.json())
      },

      {
        path:'coverage',
        Component:Coverage,
        loader:()=>fetch('/serviceCenter.json').then(res=>res.json())
      }
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'login',
        Component:Login

      },
        {
        path:'register',
        Component:Register,
        
      }
    ]
  },
  {
    path:"dashboard",
    element:<PrivetRoute>
      <DashBoardLayout>

      </DashBoardLayout>
    </PrivetRoute>,
    children:[
      {
        path:'my-parcels',
        Component:MyParcels
      }
    ]

  }
]);