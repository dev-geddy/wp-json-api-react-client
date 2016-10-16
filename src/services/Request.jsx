import axios from 'axios'
import Promise from 'bluebird'

module.exports = {
  callEndpoint: (params) => {
    return Promise.resolve(axios({
      method: params.method,
      url: params.url,
      data: params.data
    })).catch(err => {
      console.log(err)
      throw err
    })
  },
  callEndpointUpload: (params) => {
    return Promise.resolve(axios({
      method: params.method,
      url: params.url,
      data: params.data,
      processData: false,
      contentType: false,
      headers: {
        /*'Content-Type': 'multipart/form-data',*/
        Accept: 'application/json',
        "Content-Type": 'application/json'
      }
    })).catch(err => {
      console.log(err)
      throw err
    })
  }
}