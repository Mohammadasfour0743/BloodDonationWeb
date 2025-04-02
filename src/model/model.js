const model = {
  requests: [
    {
      id: '1',
      hospitalId: '1',
      urgency: 0,
      bloodType: 'A+',
      amount: 10,
      description: 'Blablabla test description yippie',
    },
    {
      id: '2',
      hospitalId: '1',
      urgency: 1,
      bloodType: 'B+',
      amount: 2,
      description: '',
    },
  ],
  hospitals: [
    {
      id: '1',
      name: 'Test hospital',
      location: 'location random',
      contact: {
        email: 'email@email.com',
        phone: 'phonee',
      },
    },
  ],

  getHospital(id) {
    return this.hospitals.find((hospital) => hospital.id === id) ?? null;
  },
  getRequest(id) {
    const req = this.requests.find((request) => request.id === id);
    if (!req) return null;
    const hospital = this.getHospital(req.hospitalId);
    return {
      ...req,
      hospital: hospital,
    };
  },
  getRequests() {
    return this.requests.map((request) => this.getRequest(request.id));
  },
  addRequest(request) {
    this.requests = [...this.requests, request];
  },
  removeRequest(id) {
    this.requests = this.requests.filter((request) => {
      return request.id !== id;
    });
  },
  addHospital(hospital) {
    this.hospitals = [...this.hospitals, hospital];
  },
  setRequests(requests) {
    this.requests = requests;
  },
  setHospitals(hospitals) {
    this.hospitals = hospitals;
  },
  updateHospital(id, hospitalFields) {
    this.hospitals = this.hospitals.map((hospital) => {
      if (hospital.id === id) {
        return {
          ...hospital,
          hospitalFields,
        };
      } else {
        return hospital;
      }
    });
  },
  updateRequest(id, requestFields) {
    this.requests = this.requests.map((request) => {
      if (request.id === id) {
        return {
          ...request,
          requestFields,
        };
      } else {
        return request;
      }
    });
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
