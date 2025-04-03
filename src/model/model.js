import { saveRequests } from "./firebaseModel";

const model = {
  id: 'hospitalId',
  location: 'Test location',
  name: 'Hospital 1',
  contact: {
    email: 'hospital@email.com',
    phone: '+46 20 123 4567',
  },
  requests: [
    {
      id: '1',
      hospitalName: 'Hospital 1',
      urgency: true,
      bloodType: 'A+',
      amount: 10,
      description: 'Description',
      email: 'hospital@email.com',
    phone: '+46 20 123 4567', 
    current : true,
    },
  ],

  setId(id) {
    this.id = id;
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