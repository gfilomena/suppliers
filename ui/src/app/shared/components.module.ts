import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MdRippleModule } from '@angular/material';

import {
    SmdDataTable,
    SmdDatatableHeader,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdDatatableDialogChangeValue,
    SmdPaginatorComponent,
    SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent,
    SmdBottomNavLabelDirective,
    SmdBottomNavGroupComponent,
    SmdBottomNavComponent,
    SmdErrorMessageComponent,
    SmdErrorMessagesComponent
} from "./component";

let COMPONENTS = [
    SmdDataTable,
    SmdDatatableHeader,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdDatatableDialogChangeValue,
    SmdPaginatorComponent,
    SmdFabSpeedDialTrigger,
    SmdFabSpeedDialActions,
    SmdFabSpeedDialComponent,
    SmdBottomNavLabelDirective,
    SmdBottomNavGroupComponent,
    SmdBottomNavComponent,
    SmdErrorMessageComponent,
    SmdErrorMessagesComponent
];

let IMPORTS = [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MdRippleModule

];

@NgModule({
    imports: IMPORTS,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [SmdDatatableDialogChangeValue]
})
export class ComponentsModule {

    static forRoot(...imports: any[]): any[] {
        return [
            CommonModule,
            HttpModule,
            FormsModule,
            ReactiveFormsModule,
            BrowserModule,
            ComponentsModule,
            ...imports
        ]
    }

}