import { TestBed } from '@angular/core/testing';

import { NodeManagementService } from './node-management.service';

describe('NodeManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeManagementService = TestBed.get(NodeManagementService);
    expect(service).toBeTruthy();
  });
});
