import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { AuthFacade } from '../facades/auth.facade';

@Injectable({
	providedIn: 'root',
})
export class NonauthGuard implements CanLoad {
	constructor(private router: Router, private authFacade: AuthFacade) {}

	canLoad(): boolean {
		if (!this.authFacade.isAccessTokenExpired()) {
			this.router.navigate(['/']);

			return false;
		}

		return true;
	}
}
