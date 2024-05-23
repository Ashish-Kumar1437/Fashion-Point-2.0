import axios from "axios";

export class HttpService {
    API_URL;
    static USER_ID = '';

  constructor() {
    
    this.API_URL = axios.create({
        baseURL: import.meta.env.VITE_BASE_API_URL,
        withCredentials:true
    });
    this.API_URL.defaults.withCredentials = true
  }

  login(payload:any){
    return this.API_URL.post(`/user/login`, payload, { responseType: "text" as "json" });
  }

  fetchUser(){
    return this.API_URL.get(`/user/bytoken`);
  }

  createUser(payload:any){
    return this.API_URL.post(`/user/create`,payload);
  }

  updateUser(payload:any,isActivate:boolean = false,isDeactivate:boolean = false){
    return this.API_URL.post(`user/update?isActivate=${isActivate}&isDeactivate=${isDeactivate}`,payload)
  }

  fetchAddresses(){
    return this.API_URL.get(`/address?userId=${HttpService.USER_ID}`)
  }

  updateAddress(payload:any){
    return this.API_URL.post(`address/edit?userId=${HttpService.USER_ID}`,payload);
  }

  deleteAddress(id:number){
    return this.API_URL.delete(`address/delete?addressId=${id}`)
  }

}

export default new HttpService();
