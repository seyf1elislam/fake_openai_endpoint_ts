"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleModelsRequest = void 0;
async function handleModelsRequest(request, response) {
    console.log(" models Called ------------------");
    //       return response.sendStatus(401);
    // } else if (config.token === empty_token_placeholder) {
    //   config.token = header_token;
    //   cach_config(config);
    // }
    try {
        let botNames = [
            "Chatbot",
            "DialoGPT",
            "Ada",
            "Babbage",
            "Curie",
        ];
        const data = [];
        botNames.map(function (element) {
            data.push({
                id: element,
                object: "model",
                created: 1669599635,
                owned_by: "POEPlugine-internal",
                permission: [
                    {
                        id: "modelperm-jepinXYt59ncUQrjQEIUEDyC",
                        object: "model_permission",
                        created: 1688551385,
                        allow_create_engine: false,
                        allow_sampling: true,
                        allow_logprobs: true,
                        allow_search_indices: false,
                        allow_view: true,
                        allow_fine_tuning: false,
                        organization: "*",
                        group: null,
                        is_blocking: false,
                    },
                ],
                root: element,
                parent: null,
            });
            return null;
        });
        console.log("Poe is Connected! ---------------");
        response.json({ object: "list", data });
    }
    catch (err) {
        console.error(err);
        return response.sendStatus(401);
    }
}
exports.handleModelsRequest = handleModelsRequest;
//# sourceMappingURL=handleModelsRequest.js.map