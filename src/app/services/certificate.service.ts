import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helpers';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  // create new certificate 
  public createCertificate(certificate:any){
    return this.http.post(`${baseUrl}/api/certificate/create-certificate`,certificate)
  }

  // get certificates by sprint id
  public getCertificatesBySprintId(id:any){
    return this.http.get(`${baseUrl}/api/certificate/get-certificates/${id}`)
  }

  // get certificate by certificate id
  public getCertificateById(id:any){
    return this.http.get(`${baseUrl}/api/certificate/get-certificate/${id}`)
  }

  // update certificate by id
  public updateCertificateById(id:any,data:any){
    return this.http.put(`${baseUrl}/api/certificate/update-certificate/${id}`,data)
  }

  // delete certificate by id
  public deleteCertificateById(id:any){
    return this.http.delete(`${baseUrl}/api/certificate/delete-certificate/${id}`)
  }

  // get all certificates
  public getAllCertificates(){
    return this.http.get(`${baseUrl}/api/certificate/all`)
  }
}
