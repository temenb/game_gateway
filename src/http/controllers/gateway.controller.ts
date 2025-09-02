import * as GatewayService from "../../services/gateway.service";
import wrapper from "./wrapper";

export const health = wrapper(async (req, res) => {
    const full = Boolean(req.query.full);
    return GatewayService.health(full);
});

export const status = wrapper(async (req, res) => {
    return GatewayService.status();
});

export const livez = wrapper(async (req, res) => {
    return GatewayService.livez();
});

export const readyz = wrapper(async (req, res) => {
    return GatewayService.readyz();
});
