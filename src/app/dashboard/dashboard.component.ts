import { Component, Renderer2, OnDestroy } from '@angular/core';

import { City } from '../models/City';
import { Profession } from '../models/Profession';
import { Doctor } from '../models/Doctor';

import { Cities, Professions, Doctors } from '../shared/data';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy  {

  stopListening: Function;

  public filteredDoctors: Doctor[];

  public selectedDoctor: Doctor;
  public detailsDialogOpened = false;

  public cities: City[];
  public selectedCity: City;

  public professions: Profession[];
  public selectedProfession: Profession;

  constructor(
    private renderer: Renderer2
  ) {
    this.filteredDoctors = Doctors;

    this.cities = Cities;
    this.professions = Professions;
  }

  public onSelectCity(e) {
      let filtered = this.filterCity(Doctors, this.selectedCity);
      if (this.selectedProfession) {
        filtered = this.filterProfession(filtered, this.selectedProfession);
      }
      this.filteredDoctors = filtered;
  }

  private filterCity(arr: Doctor[], city?: City) {
    if (city) {
      const filtered = arr.filter(doc => doc.city.name === city.name);
      return filtered;
    } else {
      return arr;
    }
  }

  public onSelectProfession(e) {
    let filtered = this.filterProfession(Doctors, this.selectedProfession);
    if (this.selectedCity) {
      filtered = this.filterCity(filtered, this.selectedCity);
    }
    this.filteredDoctors = filtered;
  }

  private filterProfession(arr: Doctor[], profession?: Profession) {
    if (profession) {
      const filtered = arr.filter(doc => doc.profession.name === profession.name);
    return filtered;
    } else {
      return arr;
    }
  }

  public onSelectDoctor(doc: Doctor) {
    this.selectedDoctor = doc;
    this.detailsDialogOpened = true;
  }

  public onCloseDetailsDialog() {
    this.selectedDoctor = undefined;
    this.detailsDialogOpened = false;
  }

  public onUpdateDetails(doc: Doctor) {
    for (let i = 0; i < Doctors.length; i++) {
      if (Doctors[i].id === doc.id) {
        Doctors[i] = doc;
        break;
      }
    }
    for (let i = 0; i < this.filteredDoctors.length; i++) {
      if (this.filteredDoctors[i].id === doc.id) {
        this.filteredDoctors[i] = doc;
        break;
      }
    }
    this.onCloseDetailsDialog();
  }

  public onDeleteDoctor(doc: Doctor) {
    for (let i = 0; i < Doctors.length; i++) {
      if (Doctors[i].id === doc.id) {
        Doctors.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i < this.filteredDoctors.length; i++) {
      if (this.filteredDoctors[i].id === doc.id) {
        this.filteredDoctors.splice(i, 1);
        break;
      }
    }
  }

  public onPrintDoctor(doc: Doctor) {
    this.selectedDoctor = doc;
    const print = window.open('/print');
    if (!print || print.closed || typeof print.closed === 'undefined') {
      window.alert('Please disable your Pop-up blocker and try again.');
    } else {
      this.stopListening = this.renderer.listen('window', 'message', this.handleMessage.bind(this));
      print.postMessage('ready?', window.location.href);
    }
  }

  handleMessage(event: any) {
    console.log(event);
    if (event.data === 'opened') {
      event.source.postMessage(this.selectedDoctor, window.location.href);
      this.selectedDoctor = undefined;
      this.stopListening();
    }
  }

  ngOnDestroy() {
    this.stopListening();
  }

}
