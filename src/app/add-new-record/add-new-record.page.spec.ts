import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewRecordPage } from './add-new-record.page';

describe('AddNewRecordPage', () => {
  let component: AddNewRecordPage;
  let fixture: ComponentFixture<AddNewRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRecordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
