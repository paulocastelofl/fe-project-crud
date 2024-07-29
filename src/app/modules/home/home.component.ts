import { Component } from '@angular/core';
import { GenericHttpServiceTsService } from '../../services/generic-http.service.ts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public users: any[] = [];

  constructor(
    private _service: GenericHttpServiceTsService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.getPerson();
  }

  getPerson() {
    this._service.get("users").subscribe({
      next: (response) => {
        this.users = response;
      }, error: (error) => {
        console.error(error);
      }
    })
  }

  goToEditNewPerson(id?: number) {
    if (id !== undefined) {
      this._router.navigate([`persons/${id}`]);
    } else {
      this._router.navigate([`persons`]);
    }

  }
}
