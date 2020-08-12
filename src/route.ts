import { Routes} from "nest-router"
import { OrderModule } from "./order/order.module"
export const routeConfig: Routes = [
    { path: "/orders", children: [OrderModule]},
    { path: "health", children: []}
]