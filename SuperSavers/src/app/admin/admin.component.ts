import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeTab = 'dashboard';

  constructor(public auth: AuthService, private router: Router) {
    if (!auth.isAdmin()) {
      router.navigate(['/']);
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
