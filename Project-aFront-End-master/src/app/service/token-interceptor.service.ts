import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private employeeService: EmployeeService, protected router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    let reqToken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.employeeService.getToken()
      }
    })
    return next.handle(reqToken).pipe(
      catchError((error) => {
        window.alert(error.error)
        if (error.status === 401) {
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('role')
          sessionStorage.removeItem('userId')
          this.router.navigate(['/login'])
        }
        return throwError(()=>new Error(error.error))
      }))
  }
}
