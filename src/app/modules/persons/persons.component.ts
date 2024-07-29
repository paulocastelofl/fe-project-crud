import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericHttpServiceTsService } from '../../services/generic-http.service.ts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss'
})
export class PersonsComponent {
  public form!: FormGroup;
  public submitted = false;
  public typePersons: any[] = [];
  public idPerson: number | undefined;

  constructor(private formBuilder: FormBuilder,
    private _service: GenericHttpServiceTsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.form = this.formBuilder.group({
      name: [{ value: null, disabled: false }, Validators.required],
      phone: [{ value: null, disabled: false }, Validators.required],
      typeperson: [{ value: null, disabled: false }, Validators.required],
    });
  }

  // emailId: ['', Validators.compose([Validators.required,
  //   Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])], Validate Email
 
  ngOnInit() {
    this.getLookupTypePerson();

    this._route.params.subscribe(params => {
      if (params['id']) {
        this.idPerson = Number(params['id']);
        this.getById();
      }
    });
  }

  get formControl() {
    return this.form.controls;
  }

  onSaveAndUpdate() {
    this.submitted = true;
    if (this.form.valid) {

      const parms = {
        name: this.formControl['name'].value,
        phone: this.formControl['phone'].value,
        typeUserId: Number(this.formControl['typeperson'].value)
      }

      if (this.idPerson) {
        this._service.put('users', parms, this.idPerson).subscribe({
          next: (response) => {
            this._router.navigate([`home`]);
          },
          error: (error) => {
            console.log(error);
          }
        });

      } else {
        this._service.post('users', parms).subscribe({
          next: (response) => {
            this.onReset();
          },
          error: (error) => {
            console.log(error);
          }
        });
      }

    } else {
      console.log('Form is invalid');
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  getLookupTypePerson() {
    this._service.get('type-users').subscribe({
      next: (response) => {
        this.typePersons = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getById() {
    this._service.get(`users/${this.idPerson}`).subscribe({
      next: (response) => {
        this.form.patchValue({
          name: response.name,
          phone: response.phone,
          typeperson: response.typeUserId
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
