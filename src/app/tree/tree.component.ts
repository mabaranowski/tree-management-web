import { Component, OnInit } from '@angular/core';
import { NodeManagementService } from '../service/node-management.service';
import { Node } from '../model/node';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  
  rootNode: Node[];

  constructor(private nodeService: NodeManagementService) { }
  
  ngOnInit(): void {
    this.rootNode = [this.nodeService.createNode(null)];

    //TODO Retrive from database
  }

  updateOnChangeDetect(): void {
    this.nodeService.toggleLeaf(this.rootNode[0]);
    this.nodeService.calculateSumForLeafs(this.rootNode[0]);
    
    //TODO Save to database
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
