import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TreeModule } from 'primeng/tree';
import { NodeConnectionService } from './node-connection.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NodeManagementService } from './node-management.service';

describe('NodeConnectionService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      TreeModule
    ]
  }));

  it('should be created', () => {
    const service: NodeConnectionService = TestBed.get(NodeConnectionService);
    expect(service).toBeTruthy();
  });
});
