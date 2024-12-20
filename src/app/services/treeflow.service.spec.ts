import { TestBed } from '@angular/core/testing';

import { TreeflowService } from './treeflow.service';

describe('TreeflowService', () => {
  let service: TreeflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
