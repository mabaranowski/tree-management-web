import { Component, OnInit } from '@angular/core';
import { NodeManagementService } from '../service/node-management.service';
import { NodeConnectionService } from '../service/node-connection.service';
import { Node } from '../model/node';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  
  rootNode: Node[] = [];

  constructor(
    private nodeService: NodeManagementService,
    private connectionService: NodeConnectionService
  ) { }
  
  ngOnInit(): void {
    this.rootNode = [this.nodeService.createNode(null)];
    this.connectionService.retrieveNodeTree().subscribe(nodeList => {
      if(nodeList.length > 0) {
        this.rootNode = this.connectionService.serializeTree(nodeList);
      }
    });
  }

  updateOnChangeDetect(): void {
    const root = this.rootNode[0];
    this.nodeService.toggleLeaf(root);
    this.nodeService.calculateSumForLeafs(root);
    this.connectionService.saveNodeTree(root).subscribe();
  }

  addNode(inputNode: Node): void {
    const newNode: Node = this.nodeService.createNode(inputNode);
    this.nodeService.addChildrenToNode(inputNode, newNode);
    this.updateOnChangeDetect();
  }

  removeNode(inputNode: Node): void {
    this.nodeService.deleteNode(this.rootNode[0], inputNode);
    this.updateOnChangeDetect();
  }

}
