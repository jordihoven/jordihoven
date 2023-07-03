import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

@NgModule({
  imports: [FeatherModule.pick(allIcons)], //create a subset of icons, now all icons are loaded...
  exports: [FeatherModule]
})

export class IconModule { }