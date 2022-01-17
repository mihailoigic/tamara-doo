import User from "../../../entities/sessionData/user";
import Gtm from "../../../entities/sessionData/gtm";
import ActionTypes from "../../../constants/ActionTypes";
import {IProductsState} from "../product/productList/types";

export interface ISessionData {
    user: User;
}