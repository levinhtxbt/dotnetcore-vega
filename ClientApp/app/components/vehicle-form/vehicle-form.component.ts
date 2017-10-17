import * as _ from 'underscore';
import { SaveVehicle, Vehicle } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';
@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})

export class VehicleFormComponent implements OnInit {
    makes: any[];
    models: any[];
    features: any[];
    vehicle: SaveVehicle = {
        id: 0,
        makeId: 0,
        modelId: 0,
        isRegistered: false,
        features: [],
        contact: {
            name: '',
            phone: '',
            email: ''
        }
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vehicleService: VehicleService,
        private toastyService: ToastyService) {

        this
            .route
            .params
            .subscribe(p => {
                this.vehicle.id = +p['id'];
            })
    }

    ngOnInit() {

        var sources = [
            this
                .vehicleService
                .getMakes(),
            this
                .vehicleService
                .getFeature()
        ];
        if (this.vehicle.id)
            sources.push(this.vehicleService.getVehicle(this.vehicle.id));

        Observable
            .forkJoin(sources)
            .subscribe(v => {
                this.makes = v[0];
                this.features = v[1];
                if (this.vehicle.id)
                    this.updateVehicle(v[2]);
                this.populateModels();
            }
            , err => {
                if (err.status == 404)
                    this.router.navigate(['/home']);
            }
            );
    }

    onMakeChange() {

        this.populateModels();

        delete this.vehicle.modelId;
    }

    onFeatureToggle(featureId: number, $event: any) {

        if ($event.target.checked) {
            this
                .vehicle
                .features
                .push(featureId);
        } else {
            let index = this
                .vehicle
                .features
                .indexOf(featureId);
            this
                .vehicle
                .features
                .splice(index, 1);
        }
    }

    submit() {

        var result$ = this.vehicle.id ?
            this.vehicleService.updateVehicle(this.vehicle) :
            this.vehicleService.createVehicle(this.vehicle);

        result$.subscribe(v => {
            this.pushSuccessNotification('Data was successfully saved');
            this.router.navigate(['/vehicles/' + v.id]);
        });
    }

    delete() {

        if (confirm("Are you sure")) {
            this
                .vehicleService
                .deleteVehicle(this.vehicle.id)
                .subscribe(res => {
                    this.pushSuccessNotification('The vehicle was successfully deleted');
                    this.router.navigate(['/home']);
                });
        }
    }


    private updateVehicle(v: Vehicle) {

        this.vehicle.id = v.id;
        this.vehicle.modelId = v.model.id;
        this.vehicle.makeId = v.make.id;
        this.vehicle.isRegistered = v.isRegistered;
        this.vehicle.contact = v.contact;
        this.vehicle.features = _.pluck(v.features, 'id');
    }

    private populateModels() {

        var selectedMake = this
            .makes
            .find(m => m.id == this.vehicle.makeId);

        this.models = selectedMake
            ? selectedMake.models
            : [];
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
