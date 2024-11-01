import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapAnalystPage } from './map-analyst.page';

describe('MapAnalystPage', () => {
  let component: MapAnalystPage;
  let fixture: ComponentFixture<MapAnalystPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAnalystPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
