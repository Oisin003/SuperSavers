import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-admin-staff',
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./admin-staff.component.css']
})
export class AdminStaffComponent implements OnInit {
  staff: User[] = [];
  message = '';
  editingUser: string | null = null;

  // Form for adding new staff
  newUsername = '';
  newPassword = '';
  newRole: 'shop' | 'warehouse' = 'shop';

  // Form for editing
  editRole: 'shop' | 'warehouse' = 'shop';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.staff = this.authService.getAllStaff();
  }

  addStaff(): void {
    this.message = '';
    if (!this.newUsername || !this.newPassword) {
      this.message = 'Username and password are required.';
      return;
    }

    if (this.authService.addStaff(this.newUsername, this.newPassword, this.newRole)) {
      this.message = `✓ Staff member '${this.newUsername}' added successfully.`;
      this.newUsername = '';
      this.newPassword = '';
      this.newRole = 'shop';
      this.loadStaff();
    } else {
      this.message = `✗ Username '${this.newUsername}' already exists.`;
    }
  }

  startEdit(username: string): void {
    const user = this.staff.find(u => u.username === username);
    if (user) {
      this.editingUser = username;
      this.editRole = user.role as 'shop' | 'warehouse';
    }
  }

  saveEdit(): void {
    this.message = '';
    if (this.editingUser && this.authService.editStaff(this.editingUser, this.editRole)) {
      this.message = `✓ Staff member '${this.editingUser}' updated successfully.`;
      this.editingUser = null;
      this.loadStaff();
    } else {
      this.message = '✗ Failed to update staff member.';
    }
  }

  cancelEdit(): void {
    this.editingUser = null;
  }

  deleteStaff(username: string): void {
    if (confirm(`Are you sure you want to delete '${username}'?`)) {
      this.message = '';
      if (this.authService.deleteStaff(username)) {
        this.message = `✓ Staff member '${username}' deleted successfully.`;
        this.loadStaff();
      } else {
        this.message = `✗ Failed to delete staff member.`;
      }
    }
  }

  getRoleDisplay(role: string): string {
    return role === 'shop' ? 'Shop' : 'Warehouse';
  }
}
