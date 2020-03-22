import { async, TestBed } from '@angular/core/testing';
import { TreeModule } from 'primeng/tree';
import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TreeComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TreeModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
