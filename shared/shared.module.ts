import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxResizeObserverModule} from 'ngx-resize-observer';
import {DataFormatComponent} from './components/data-format/data-format.component';
import {FilterTableComponent} from './components/filter-table/filter-table.component';
import {FormErrorsComponent} from './components/form-errors/form-errors.component';
import {SearchComponent} from './components/search/search.component';
import {ControlDirective} from './directives/control.directive';
import {DropdownDirective} from './directives/dropdown.directive';
import {RoleGuardDirective} from './directives/role-guard.directive';
import {NgPrimeImportsModule} from './ng-prime-imports/ng-prime-imports.module';
import {DateComparePipe} from './pipes/date-compare.pipe';

const directives: Array<any> = [DropdownDirective, RoleGuardDirective, ControlDirective];
const pipes: Array<any> = [DateComparePipe];
const components: Array<any> = [DataFormatComponent, FormErrorsComponent, SearchComponent, FilterTableComponent];

const declarations: Array<any> = [...directives, ...pipes, ...components];
const importModules: Array<any> = [CommonModule, ReactiveFormsModule, NgPrimeImportsModule, HttpClientModule, NgxResizeObserverModule];

@NgModule({
  declarations: [...declarations],
  imports: [...importModules],
  exports: [...importModules, ...declarations]
})
export class SharedModule {}
