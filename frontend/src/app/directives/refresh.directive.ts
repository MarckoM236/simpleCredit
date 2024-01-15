import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRefresh]'
})
export class RefreshDirective implements OnChanges{

  @Input() appRefresh:boolean=false;
  constructor(private templateRef:TemplateRef<any>,private viewContainerRef:ViewContainerRef) { 
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['appRefresh']){
        this.viewContainerRef.clear();
        this.viewContainerRef.createEmbeddedView(this.templateRef);  
      }
  }

}
