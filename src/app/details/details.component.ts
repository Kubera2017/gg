import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Doctor } from '../models/Doctor';
import { City } from '../models/City';
import { Profession } from '../models/Profession';

import { Cities, Professions } from '../shared/data';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public doctor: Doctor;

  @Input() display: boolean;
  @Input() set _doctor(value: Doctor) {
    if (value) {
      this.doctor = JSON.parse(JSON.stringify(value));
    }
  }
  @Output() handleClose = new EventEmitter<any>();
  @Output() handleSave = new EventEmitter<any>();

  public cities: City[];
  public professions: Profession[];

  constructor() {
    this.cities = Cities;
    this.professions = Professions;
  }

  ngOnInit() {
  }

  public onSave() {
    this.handleSave.emit(this.doctor);
  }

  public onClose() {
    this.handleClose.emit('closed');
  }

}
