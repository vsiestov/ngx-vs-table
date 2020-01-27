import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef, EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit, Output, SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ngx-vs-custom-cell',
  templateUrl: './ngx-vs-custom-cell.component.html',
  styleUrls: ['./ngx-vs-custom-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgxVsCustomCellComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(TemplateRef, {read: ViewContainerRef}) template: ViewContainerRef;

  @Input() component: any;
  @Input() value: any;
  @Input() componentFactoryResolver: ComponentFactoryResolver;
  @Input() init: (...args) => void;
  @Input() update: (...args) => void;
  @Input() destroy: (...args) => void;
  @Input() label: string;
  @Input() data: any[];
  @Input() isFilter: boolean;
  @Output() filterChange: EventEmitter<any> = new EventEmitter();

  componentRef: ComponentRef<any>;

  constructor(
    private cfr: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    if (!this.component) {
      return;
    }

    const resolvedComponent = (this.componentFactoryResolver || this.cfr).resolveComponentFactory(this.component);

    this.componentRef = this.template.createComponent(resolvedComponent);

    if (this.init) {
      this.init(this.componentRef.instance, this.value || this.data);
    }

    if (this.update) {
      this.update(this.componentRef.instance, this.value || this.data);
    } else {
      this.componentRef.instance.value = this.value;
    }

    if (this.isFilter) {
      this.componentRef.instance.update = (data) => {
        this.filterChange.emit(data);
      };
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    if (this.destroy) {
      this.destroy(this.componentRef.instance, this.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      if (this.componentRef && this.componentRef.instance) {
        if (this.update) {
          this.update(this.componentRef.instance, this.value);
        } else {

          this.componentRef.instance.value = this.value;

          if (this.componentRef.instance.cdr) {
            this.componentRef.instance.cdr.markForCheck();
          }
        }
      }
    }
  }

}
