"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmOrder = void 0;
const typeorm_1 = require("typeorm");
const CustomError_1 = require("../../utils/response/custom-error/CustomError");
const Cart_1 = require("../../typeorm/entities/Cart");
const confirmOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const korpa = yield (0, typeorm_1.getManager)().findOne(Cart_1.Cart, { brojKupovine: id });
        if (korpa) {
            korpa.status = 'success';
            yield (0, typeorm_1.getManager)().save(Cart_1.Cart, korpa);
            res.customSuccess(200, `Status updated to success for [${id}]`, { code: 0, brojKupovine: id });
        }
        else {
            const customError = new CustomError_1.CustomError(400, 'Raw', `Cart with number [${id}] does not exist!`, null);
            return next(customError);
        }
    }
    catch (err) {
        const customError = new CustomError_1.CustomError(400, 'Raw', `Can't retrieve list of carts.`, null, err);
        return next(customError);
    }
});
exports.confirmOrder = confirmOrder;
//# sourceMappingURL=confirmOrder.js.map