import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { HttpService } from './services/http.service';
import { PartyService } from './services/party.service';
import { ConfigService } from './services/config.service';
import { ProjectService } from './services/project.service';
import { DistrictService } from './services/district.service';
import { PoliticianService } from './services/politician.service';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { ProjectLinkComponent } from './components/project-link/project-link.component';

import { MainModule } from './pages/main/main.module';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './components/header/header.component';
import { ProjectViewModule } from './pages/project-view/project-view.module';
import { ComponentsModule } from './components/components.module';
import { FullListModule } from './pages/full-list/full-list.module';
import { AppRoutes } from './helpers/routes.helper';

//import 'angular-carousel';
import * as angularCarousel from "angular-carousel";

@NgModule({
  declarations: [
    AppComponent,
    ProjectLinkComponent,
    HeaderComponent
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, { enableTracing: false }),
    HttpClientModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule,
    MainModule,
    FormsModule,
    HttpModule,
    ProjectViewModule,
    FullListModule
  ],
  providers: [
    HttpService,
    PartyService,
    ConfigService,
    ProjectService,
    DistrictService,
    PoliticianService,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
