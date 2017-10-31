import { AuthService } from './../../core/services/auth.service';
import { VehicleService } from './../../core/services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  private readonly PAGE_SIZE = 10;

  queryResult: any = {};
  makes: KeyValuePair[];
  query: any = {
    page: 1,
    pageSize: this.PAGE_SIZE
  }
  columns = [
    { title: 'Id' },
    { title: 'Make', id: 'make', isSortable: true },
    { title: 'Model', id: 'model', isSortable: true },
    { title: 'ContactName', id: 'contactName', isSortable: true },
    {}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService,
    private auth: AuthService) {

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

    this.query.page = 1;

    this.populateVehicles();
  }

  resetFilter() {

    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };

    this.populateVehicles();
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
      .subscribe(result => this.queryResult = result);
  }

  onPageChange(page: number) {

    this.query.page = page;
    this.populateVehicles();
  }
}
