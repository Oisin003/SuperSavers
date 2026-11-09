import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  username: string;
  role: 'shop' | 'warehouse' | 'admin';
  location?: string;
}

interface UserWithPassword extends User {
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: UserWithPassword[] = [
    { username: 'admin', password: 'password', role: 'admin' },
    ...[
      'Buncranna', 'Longford', 'Castlebar', 'Roscommon',
      'Athlone', 'Carrick', 'Cavan', 'Mullingar'
    ].flatMap((location, shopIndex) =>
      Array.from({ length: 4 }, (_, workerIndex) => {
        const workerNumber = shopIndex * 4 + workerIndex + 1;
        return {
          username: `shop.${workerNumber}`,
          password: 'password',
          role: 'shop' as const,
          location
        };
      })
    ),
    ...Array.from({ length: 5 }, (_, index) => ({
      username: `wh.${index + 1}`,
      password: 'password',
      role: 'warehouse' as const,
      location: 'Warehouse'
    }))
  ];

  currentUser: User | null = null;

  constructor(private router: Router) {
    const raw = localStorage.getItem('ss_user');
    if (raw) {
      const savedUser = JSON.parse(raw) as User;
      this.currentUser = {
        ...savedUser,
        location: savedUser.location || this.getShopLocation(savedUser.username)
      };
      localStorage.setItem('ss_user', JSON.stringify(this.currentUser));
    }
  }

  login(username: string, password: string): boolean {
    const found = this.users.find(u => u.username === username && u.password === password);
    if (found) {
      this.currentUser = { username: found.username, role: found.role, location: found.location };
      localStorage.setItem('ss_user', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('ss_user');
    this.router.navigate(['/']);
  }

  isShop() { return this.currentUser?.role === 'shop'; }
  isWarehouse() { return this.currentUser?.role === 'warehouse'; }
  isAdmin() { return this.currentUser?.role === 'admin'; }

  getShopLocation(username: string): string | undefined {
    return this.users.find(user => user.username === username && user.role === 'shop')?.location;
  }

  // Staff Management Methods
  getAllStaff(): User[] {
    return this.users.map(u => ({ username: u.username, role: u.role, location: u.location }));
  }

  addStaff(username: string, password: string, role: 'shop' | 'warehouse'): boolean {
    if (this.users.find(u => u.username === username)) {
      return false; // User already exists
    }
    this.users.push({ username, password, role });
    return true;
  }

  editStaff(username: string, newRole: 'shop' | 'warehouse'): boolean {
    const user = this.users.find(u => u.username === username);
    if (user && user.role !== 'admin') {
      user.role = newRole;
      // If editing current user, update current user
      if (this.currentUser?.username === username) {
        this.currentUser.role = newRole;
        localStorage.setItem('ss_user', JSON.stringify(this.currentUser));
      }
      return true;
    }
    return false;
  }

  changePassword(username: string, newPassword: string): boolean {
    const user = this.users.find(u => u.username === username);
    if (user) {
      user.password = newPassword;
      return true;
    }
    return false;
  }

  deleteStaff(username: string): boolean {
    if (username === 'admin') {
      return false; // Cannot delete admin
    }
    const index = this.users.findIndex(u => u.username === username);
    if (index !== -1) {
      // If deleting current user, logout
      if (this.currentUser?.username === username) {
        this.logout();
      }
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
