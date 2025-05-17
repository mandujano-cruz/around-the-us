export default class Api {
    constructor (options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
    
    _handleResponse(res){
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }

    _request(endpoint, options={}) {
      return fetch(`${this._baseUrl}${endpoint}`, {
        headers: this._headers,
        ...options,
      }).then(this._handleResponse);
    }
  
    getInitialCards (endpoint) {
      return this._request(endpoint);
    }
  
    getUserInfo (endpoint) {
      return this._request(endpoint);
    }
  
    setProfile (endpoint, data) {
      return this._request(endpoint, {
        method: "PATCH",
        body: JSON.stringify({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        }),
      });
    }
  
    addCard (endpoint, data) {
      return this._request(endpoint, {
        method: "POST", 
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      });
    }
  
    toggleLike(endpoint, cardId, isLiked) {
      return this._request(`${endpoint}${cardId}/likes`,{
        method: isLiked ? "PUT" : "DELETE",
      });
    }
  
    deleteCard (endpoint, cardId) {
      return this._request(`${endpoint}${cardId}`, {
        method: "DELETE",
      });
    }
  }
  