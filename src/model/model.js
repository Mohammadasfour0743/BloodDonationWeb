const model = {
  requests: [],
  hospitals: [],

  getHospital(id) {
    return this.hospitals.find((hospital) => hospital.id === id) ?? null;
  },
  getRequest(id) {
    const req = this.requests.find((request) => request.id === id);
    if (!req) return null;
    const hospital = this.getHospital(req.hospitalid);
    return {
      ...req,
      hospital: hospital,
    };
  },
  getRequests() {
    return this.requests.map((request) => this.getRequest(request.id));
  },
};

export { model };

/*
request: {
    id: string;
    hospitalId: string;
    urgency: number;
    bloodType: string;
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
