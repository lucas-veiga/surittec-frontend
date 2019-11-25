import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class TokenInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/login') || !localStorage.getItem('token')) {
      return next.handle(req);
    }

    return next.handle(this.addToken(req));
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${ localStorage.getItem('token') }` } });
  }
}
