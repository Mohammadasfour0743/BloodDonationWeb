import { saveRequests } from './firebaseModel';

const model = {
  ready: false,
  id: 'hospitalId',
  username: undefined,
  location: undefined,
  name: 'Hospital 1',
  email: undefined,
  phone: undefined,
  longitude: undefined,
  latitude: undefined,
  coordinates: undefined,

  requests: [],

  setEmail(email) {
    this.email = email;
  },
  setPhone(phone) {
    this.phone = phone;
  },
  setId(id) {
    this.id = id;
  },

  setUsername(username) {
    this.username = username;
  },

  setPassword(password) {
    this.password = password;
  },

  setLocation(location) {
    this.location = location;
  },
  setName(name) {
    this.name = name;
  },
  addRequest(request) {
    this.requests = [request, ...this.requests];
    saveRequests(request);
  },
  removeRequest(id) {
    this.requests = this.requests.filter((request) => {
      return request.id !== id;
    });
  },
  deactivateRequest(id) {
    this.requests = this.requests.map((request) => {
      if (request.id === id) {
        return {
          ...request,
          current: false,
        };
      } else {
        return request;
      }
    });
  },
  setRequests(requests) {
    this.requests = requests;
  },

  setlongitude(longitude) {
    this.longitude = longitude;
  },
  setLatitude(latitude) {
    this.latitude = latitude;
  },
};

export { model };

/*
request: {
    id: string;
    hospitalId: string;
    urgency: number;
    bloodType: string;
    amount: number;
    description: string;
}

hospital: {
    id: string
    name: string
    location: string
    contact: {
        email: string
        phone: string
    }
}
*/
