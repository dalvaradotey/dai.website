class HttpRequest {
  apiURL: string
  endpoint: string
  query: any
  body: any

  constructor() {
    this.apiURL = process.env.API_URL || '';
    this.endpoint = ''
    this.query = {}
    this.body = {}
  }

  setApiUrl(apiURL: string): void {
    this.apiURL = apiURL
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint
  }

  buildURL(id = ''): string {
    const endpoint = id !== '' ? `${this.endpoint}/${id}` : this.endpoint

    return `${this.apiURL}${endpoint}`
  }

  async post(data: any) {
    const response = await fetch(`${this.buildURL()}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }

  async getAudio(data: any) {
    const response = await fetch(`${this.buildURL()}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }
}

export default HttpRequest;