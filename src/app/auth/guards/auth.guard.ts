import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { AuthFacade } from '../facades/auth.facade';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanLoad {
	constructor(private router: Router, private authFacade: AuthFacade) {}

	canLoad(): boolean {
		if (this.authFacade.isAccessTokenExpired()) {
			this.router.navigate(['/auth/login']);

			return false;
		}

		return true;
	}
}
