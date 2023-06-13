import { loadRemoteModule } from '@angular-architects/module-federation';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { PluginOptions } from './mf.model';


@Component({
  selector: 'app-load-fragments',
  template: ` <ng-container #placeHolder></ng-container> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadFragmentsComponent implements OnChanges {

  @ViewChild('placeHolder', { read: ViewContainerRef, static: true }) viewContainer!: ViewContainerRef;
  @Input() options!: PluginOptions;

  async ngOnChanges() {
    this.viewContainer.clear();
    const component = await loadRemoteModule(this.options!).then(
      (m) => m[this.options?.componentName]
    );
    this.viewContainer?.createComponent(component);
  }
}