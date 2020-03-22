import { Injectable } from '@angular/core';
import { v4 as UUID } from 'uuid';
import { Node } from '../model/node';

@Injectable({
  providedIn: 'root'
})
export class NodeManagementService {

  constructor() { }

  createNode(parentNode: Node): Node {
    return {
      key: UUID(),
      value: 0,
      children: [],
      parentNode: parentNode,
      expanded: true
    };
  }

  addChildrenToNode(parentNode: Node, newNode: Node): void {
    parentNode.children.forEach(childNode => {
      if(childNode.key === parentNode.key) {
        childNode.children.push(newNode);
        return;
      }
    });
    parentNode.children.push(newNode);
  }

  deleteNode(rootNode: Node, toDeleteNode: Node): void {
    rootNode === toDeleteNode ? rootNode.children = [] :
    rootNode.children.forEach(childNode => {
      if(childNode.key === toDeleteNode.key) {
        const index = rootNode.children.indexOf(toDeleteNode);
        rootNode.children.splice(index, 1);
        return;
      }
      this.deleteNode(childNode, toDeleteNode);
    });
  }

  toggleLeaf(rootNode: Node): void {
    rootNode.children.forEach(childNode => {
      childNode.leaf = childNode.children.length > 0 ? false : true;
      this.toggleLeaf(childNode);
    });
  }

  calculateSumForLeafs(rootNode: Node): void {
    rootNode.children.forEach(childNode => {
      if(childNode.leaf) {
        this.sum = 0;
        this.findPathToRoot(childNode);
        childNode.value = this.sum;
      }
      this.calculateSumForLeafs(childNode);
    });
  }

  sum: number;
  private findPathToRoot(inputNode: Node): void {
    if(!!inputNode.parentNode) {
      this.sum += inputNode.parentNode.value
      this.findPathToRoot(inputNode.parentNode);
    }
  }

}
