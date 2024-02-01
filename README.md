# Fake OpenAI API Endpoint

This project is a mock implementation of the OpenAI API endpoint for usage during devlopment. It's built with Node.js and Express, and it's written in TypeScript.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installing

1. Clone the repository:
```sh
git clone https://github.com/seyf1elislam/fake_openai_endpoint_ts
```
2. Navigate to the project directory:
```sh
cd fake_openai_api_endpoint
```
3. Install the dependencies:
```sh
npm install
```

## Running the Application

To start the application, run the following command:

```sh
npm run serve
```

The application will start and listen on `http://127.0.0.1:3000/v1`.

## Built With

- Node.js
- Express
- TypeScript


## API Endpoints

This application provides two main API endpoints:

### `/models`

This endpoint returns a list of available models. To use it, send a GET request to `http://127.0.0.1:3000/v1/models`.

Example:

```sh
curl http://127.0.0.1:3000/v1/models
```

### `/completions`

This endpoint is used to get completions for a given prompt. To use it, send a POST request to `http://127.0.0.1:3000/v1/completions` with a JSON body containing the `model` and `prompt` parameters.

#### Example:

```python
# Non-streaming example
import requests
def get_completion(prompt):
    url = "http://127.0.0.1:3000/v1/completions"
    data = {
        "model": "gpt-3.5-turbo",
        "prompt": prompt
    }
    response = requests.post(url, json=data)
    completion = response.json()
    return completion

# Streaming example

def stream_completion(prompt):
    url = "http://127.0.0.1:3000/v1/completions/stream"
    data = {
        "model": "gpt-3.5-turbo",
        "prompt": prompt
    }
    response = requests.post(url, json=data, stream=True)
    for chunk in response.iter_content(chunk_size=1024):
        # Process the streamed completion chunk
        completion = json.loads(chunk)["choices"][0]["delta"]["content"] 
        # Do something with the completion


# Example usage

prompt = "Once upon a time"
non_streaming_completion = get_completion(prompt)
streaming_completion = stream_completion(prompt)
```
