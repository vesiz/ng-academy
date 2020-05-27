import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '../facades/auth.facade';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authFacade: AuthFacade) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		req = req.clone({
			setHeaders: {
				Authorization: `Bearer ${this.authFacade.getAccessToken()}`,
			},
		});

		return next.handle(req);
	}
}
