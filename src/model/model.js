/* import { saveRequests } from "./firebaseModel";

 const model = {

  id: "",
  name: "",
  location: "",
  
  requests: [
    {
      id: 3,
      hospitalId: "St Joseph's",
      urgency: true,
      bloodType: "B",
      location: "bangladesh",
      amount: "2 units",
      email: "randomemail@something.com",
      phoneNumber: "1000202879",
      description: "aaabababba",
    },

    {
      id: 4,
      hospitalId: "St Joseph's",
      urgency: false,
      bloodType: "B",
      location: "hungary",
      amount: "2 units",
      email: "randomemail@something.com",
      phoneNumber: "1000202879",
      description: " We have chosen to display the distribution of the white blood cell count (WBC) of patients by using a histogram with an X-axis displaying WBC (thousands) per microliter of blood and Y-axis representing the number of patients who recorded a specific range of WBC. We believed this was a good choice as it clearly links the WBC to a quantity of patients, and by looking at the height of the WBC bars and matching them with the corresponding Y-axis value, doctors can determine the most common ranges and identify any unusual values in the population in the future, with the most common WBC range being between 0-25 with approximately 85% of all patients falling into this range as seen in figure 1.",
    },
  ],

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

export const model = {
  user: {
    //name: null,
    //username: null,
    //bloodtype: null,
  },

  //requests: [{}],

  requests: [
    {
      id: 3,
      hospitalname: "St Joseph's",
      urgency: true,
      bloodType: "B",
      location: "bangladesh",
      amount: "2 units",
      email: "randomemail@something.com",
      phoneNumber: "1000202879",
      description: "aaabababba",
    },

    {
      id: 4,
      hospitalId: "St Joseph's",
      urgency: false,
      bloodType: "B",
      location: "hungary",
      amount: "2 units",
      email: "randomemail@something.com",
      phoneNumber: "1000202879",
      description: " We have chosen to display the distribution of the white blood cell count (WBC) of patients by using a histogram with an X-axis displaying WBC (thousands) per microliter of blood and Y-axis representing the number of patients who recorded a specific range of WBC. We believed this was a good choice as it clearly links the WBC to a quantity of patients, and by looking at the height of the WBC bars and matching them with the corresponding Y-axis value, doctors can determine the most common ranges and identify any unusual values in the population in the future, with the most common WBC range being between 0-25 with approximately 85% of all patients falling into this range as seen in figure 1.",
    },
  ],

  addRequest(req) {
    this.requests = [req, ...this.requests]
    
  },

  getRequest(id) {
    return this.requests.find((currentRequest) => {
      return id == currentRequest.id
    })
  },
  setRequest(arr) {
    this.requests = arr
  },
  getRequests() {
    return this.requests
  },
  updateUser(id, userFields) {
    return {
      ...this.user,
      userFields,
    }
  },
  updateUser(id, requestFields) {
    this.requests.map((currentRequest) => {
      if (this.currentRequest.id == id)
        return {
          ...this.currentRequest,
          requestFields,
        }
      return currentRequest
    })
  },
  setUser(user) {
    this.user = user
  },
  getUser() {
    return this.user
  },
}