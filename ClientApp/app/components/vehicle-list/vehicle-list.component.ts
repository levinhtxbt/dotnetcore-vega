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
  makes: KeyValuePair[];
  query: any = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) {

  }

  ngOnInit() {
    this.populateVehicles();
    this.getMakes();
  }

  getMakes() {
    this.vehicleService
      .getMakes()
      .subscribe(makes => this.makes = makes);
  }

  onFilterChange() {
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {};

    this.onFilterChange();

  }

  sortBy(sortColumn: string) {

    if (this.query.orderBy === sortColumn) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.orderBy = sortColumn;
      this.query.isSortAscending = true;
    }

   this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService
      .getVehicles(this.query)
      .subscribe(vehicles => this.vehicles = vehicles);
  }
}
