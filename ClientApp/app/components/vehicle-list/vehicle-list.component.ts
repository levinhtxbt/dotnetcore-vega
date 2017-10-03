import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {
    makeId: 0
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) {

  }

  ngOnInit() {
    this.getVehicle();
    this.getMakes();
  }

  getVehicle() {
    this.vehicleService
      .getVehicles()
      .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);
  }

  getMakes() {
    this.vehicleService
      .getMakes()
      .subscribe(makes => this.makes = makes);
  }

  onFilterChange() {
    console.log(this.filter);
    var vehicles = this.allVehicles;

    if (this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

    this.vehicles = vehicles;
  }

  resetFilter() {
    this.filter = {};

    this.onFilterChange();

  }

}
