export async function handleModelsRequest(request, response) {
  console.log(" models Called ------------------");

  //       return response.sendStatus(401);
  // } else if (config.token === empty_token_placeholder) {
  //   config.token = header_token;
  //   cach_config(config);
  // }
  try {
    let botNames = ["Chatbot", "Chatbot2", "Chatbot3", "Chatbot4"];
    const data = [];
    botNames.map(function (element) {
      data.push({
        id: element,
        object: "model",
        created: 1669599635,
        owned_by: "OpenAI-internal",
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

    response.json({ object: "list", data });
  } catch (err) {
    console.error(err);

    return response.sendStatus(401);
  }
}
