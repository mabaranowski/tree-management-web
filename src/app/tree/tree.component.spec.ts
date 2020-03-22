import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeManagementService } from '../service/node-management.service';
import { TreeComponent } from './tree.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { Node } from '../model/node'
import { NodeConnectionService } from '../service/node-connection.service';
import { of } from 'rxjs';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;
  let nodeServiceStub: any;
  let connectionServiceStub: any;

  beforeEach(async(() => {
    nodeServiceStub = {
      createNode: (parentNode: Node) => {
        return {
          key: 'key123',
          value: 0,
          children: [],
          parentNode: parentNode,
          expanded: true
        }
      },
      addChildrenToNode: (parentNode: Node, newNode: Node) => {
        parentNode.children.push(newNode);
      },
      toggleLeaf: (rootNode: Node) => {
        rootNode.leaf = true;
      },
      calculateSumForLeafs: (rootNode: Node) => {
        rootNode.value = rootNode.value;
      },
      deleteNode: (root: Node, input: Node) => {
        input.children = [];
      }
    }

    connectionServiceStub = {
      retrieveNodeTree: () => of(),
      saveNodeTree: () => of()
    }

    TestBed.configureTestingModule({
      declarations: [ TreeComponent ],
      providers: [ 
        { provide: NodeManagementService, useValue: nodeServiceStub },
        { provide: NodeConnectionService, useValue: connectionServiceStub }
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TreeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have tree created', () => {
    expect(component.rootNode.length).toEqual(1);
  });

  it('should be root as first level node', () => {
    expect(component.rootNode[0].parentNode).toEqual(null);
  });

  it('should add child node to input', () => {
    const root: Node = nodeServiceStub.createNode();
    component.addNode(root);
    expect(root.children.length).toBeGreaterThan(0);
  });

  it('should not be root as further level node', () => {
    const root: Node = nodeServiceStub.createNode();
    component.addNode(root);
    expect(root.children[0].parentNode).not.toEqual(null);
  });

  it('should allow multiple nodes on the same level', () => {
    const root: Node = nodeServiceStub.createNode();
    component.addNode(root);
    component.addNode(root);
    expect(root.children.length).toBeGreaterThan(1);
  });

  it('should clear node from input', () => {
    const root: Node = component.rootNode[0];

    component.addNode(root);
    expect(root.children.length).toBeGreaterThan(0);

    component.removeNode(root);
    expect(root.children.length).toEqual(0);
  });

});
