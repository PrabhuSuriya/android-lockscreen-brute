import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxLocalStorageModule } from "ngx-localstorage";
import { InputNumberModule } from 'primeng/inputnumber';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PatternComponent } from "./pattern/pattern.component";
import { PatternSvgComponent } from "./pattern-svg/pattern-svg.component";

@NgModule({
  declarations: [AppComponent, PatternComponent, PatternSvgComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxLocalStorageModule.forRoot({ prefix: "lockscreen" }),
    InputNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [PatternComponent, PatternSvgComponent]
})
export class AppModule { }
