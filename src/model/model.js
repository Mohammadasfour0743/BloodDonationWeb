import { saveRequests } from './firebaseModel';

const model = {
  id: 'hospitalId',
  username: undefined,
  location: 'Test location',
  name: 'Hospital 1',

  email: 'hospital@email.com',
  phone: '+46 20 123 4567',

  requests: [],

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
