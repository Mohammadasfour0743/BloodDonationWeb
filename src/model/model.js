import { saveRequests } from "./firebaseModel";

 const model = {

  id: "",
  name: "",
  location: "",
  
  request: {
      id: "",
      hospitalid: "smtg",
      urgency: "hj",
      bloodType: "gh",
      amount: "gh",
      description: "hj",
  },

  setId(newId) {
    this.request.id = newId;
},

setUrgency(newUrgency) {
    this.request.urgency = newUrgency;
},

setBloodType(newBloodType) {
    this.request.bloodType = newBloodType;
},

setAmount(newAmount) {
    this.request.amount = newAmount;
},

setDescription(newDescription) {
    this.description = newDescription;
},

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