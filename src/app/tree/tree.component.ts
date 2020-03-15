import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeManagementService } from '../service/node-management.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  
  rootNode: TreeNode[];

  constructor(private nodeService: NodeManagementService) { }
  
  ngOnInit(): void {
    this.rootNode = [this.nodeService.createNode()];

    //TODO Retrive from database
  }

  ngOnChanges(): void {
    // console.log(this.rootNode);

    //TODO Save to database
  }

  addNode(inputNode: TreeNode) {
    const newNode = this.nodeService.createNode();
    this.nodeService.addChildrenToNode(inputNode.children, inputNode, newNode);
    this.ngOnChanges();
  }

  removeNode(inputNode: TreeNode) {
    this.nodeService.deleteNode(this.rootNode[0], inputNode);
    this.ngOnChanges();
  }

}
