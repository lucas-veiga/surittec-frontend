import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Directive({
  selector: '[appIsAdmin]'
})
export class IsAdminDirective {

  constructor(private authService: AuthService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
    this.updateView();
  }

  private updateView(): void {
    this.viewContainerRef.clear();
    if (this.authService.isAdmin()) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
