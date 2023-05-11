import HttpRequest from './HttpRequest'

class Service extends HttpRequest {
  constructor(endpoint: string, apiURL = null) {
    super()
    this.setEndpoint(endpoint)

    if (apiURL !== null) {
      this.setApiUrl(apiURL)
    }
  }
}

export default Service
