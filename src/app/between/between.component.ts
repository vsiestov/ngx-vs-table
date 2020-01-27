import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ICustomFilter } from '../../../projects/ngx-vs-table/src/lib/interfaces/ngx-vs-table.interface';

@Component({
  selector: 'between',
  templateUrl: './between.component.html',
  styleUrls: ['./between.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BetweenComponent implements OnInit, OnDestroy, ICustomFilter {
  form: FormGroup;
  formChanges: Subscription;

  update = (_) => {
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      from: [''],
      to: ['']
    });
  }

  ngOnInit() {
    this.formChanges = this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(() => {
          return this.update(this.form.value);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.formChanges) {
      this.formChanges.unsubscribe();
    }
  }
}
