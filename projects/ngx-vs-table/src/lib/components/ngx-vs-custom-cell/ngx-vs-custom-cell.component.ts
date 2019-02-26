import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'ngx-vs-custom-cell',
  templateUrl: './ngx-vs-custom-cell.component.html',
  styleUrls: ['./ngx-vs-custom-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxVsCustomCellComponent implements OnInit, OnDestroy {
  @ViewChild(TemplateRef, {read: ViewContainerRef}) template: ViewContainerRef;

  @Input() component: any;
  @Input() value: any;
  @Input() init: (...args) => void;

  componentRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    if (!this.component) {
      return;
    }

    const resolvedComponent = this.componentFactoryResolver.resolveComponentFactory(this.component);

    this.componentRef = this.template.createComponent(resolvedComponent);
    this.componentRef.instance.value = this.value;

    if (this.init) {
      this.init(this.componentRef.instance, this.value);
    }
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }

}
