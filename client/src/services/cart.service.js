import httpService from "./http.service";

const cartsEndpoint = "carts/";

const cartsService = {
    get: async () => {
        const { data } = await httpService.get(cartsEndpoint);
        return data;
    },

    create: async (payload) => {
        const { data } = await httpService.post(
            cartsEndpoint + payload._id,
            payload
        );
        return data;
    },
    delete: async (productId) => {
        const { data } = await httpService.delete(cartsEndpoint + productId);
        return data;
    },
    update: async (content) => {
        const { data } = await httpService.patch(
            cartsEndpoint + content._id,
            content
        );
        return data;
    }
};

export default cartsService;
