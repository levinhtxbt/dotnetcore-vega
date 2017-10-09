import { PhotoService } from './../../services/photo.service';
import { Vehicle } from './../../models/vehicle';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private toastyService: ToastyService) {

    this.route.params.subscribe(r => {
      this.vehicleId = +r['id'];

      if (isNaN(this.vehicleId) || this.vehicleId <= 0)
        router.navigate(['/vehicles']);

    });
  }

  ngOnInit() {

    this.vehicleService
      .getVehicle(this.vehicleId)
      .subscribe(vehicle => this.vehicle = vehicle);
  }

  delete() {

    if (confirm("Are you sure?")) {
      this
        .vehicleService
        .deleteVehicle(this.vehicle.id)
        .subscribe(res => {
          this.pushSuccessNotification('The vehicle was successfully deleted');
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {

    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;

    this.photoService
      .upload(this.vehicleId, nativeElement.files[0])
      .subscribe(x => console.log(x));
  }

  private pushSuccessNotification(msg: string) {

    this.toastyService.success({
      title: 'Success',
      msg: msg,
      theme: 'bootstrap',
      timeout: 5000,
      showClose: true
    });
  }

}
