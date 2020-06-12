import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private sessionervice: SessionService, private router: Router) {
    if (this.sessionervice.getRole() != 'admin') {
      this.sessionervice.clear();
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}
