import { AuthService } from './../../services/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { BrowserXhr } from '@angular/http';
import { ProgressService, BrowserXhrWithProgress } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { Vehicle } from './../../models/vehicle';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
  providers: [
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
    ProgressService
  ]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any;
  progress: any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private progressService: ProgressService,
    private toastyService: ToastyService,
    private auth: AuthService) {

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

    this.photoService
      .getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);
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

    this.progressService
      .startTracing()
      .subscribe(progress => {
        this.zone.run(() => {
          this.progress = progress;
        });
      }, null, () => this.progress = null);


    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = '';

    this.photoService
      .upload(this.vehicleId, file)
      .subscribe(photo => this.photos.push(photo), err => {
        this.toastyService.error({
          title: 'Error',
          msg: err.text(),
          theme: 'bootstrap',
          timeout: 5000,
          showClose: true
        });
      });
  }

  private pushSuccessNotification(msg) {

    this.toastyService.success({
      title: 'Success',
      msg: msg,
      theme: 'bootstrap',
      timeout: 5000,
      showClose: true
    });
  }

}
