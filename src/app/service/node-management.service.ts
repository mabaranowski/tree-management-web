import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NodeManagementService {

  constructor() { }

  createNode(): TreeNode {
    return {
      key: uuidv4(),
      label: '',
      children: [],
      expanded: true
    };
  }

  addChildrenToNode(childrenNodes: TreeNode[], parentNode: TreeNode, newNode: TreeNode) {
    childrenNodes.forEach(childNode => {
      if(childNode.key === parentNode.key) {
        childNode.children.push(newNode);
        return;
      }
    });

    childrenNodes.push(newNode);
  }

  deleteNode(rootNode: TreeNode, toDeleteNode: TreeNode) {
    if(!!rootNode.children) {
      rootNode.children.forEach(childNode => {
        if(childNode.key === toDeleteNode.key) {
          const index = rootNode.children.indexOf(toDeleteNode);
          rootNode.children.splice(index, 1);
          return;
        }
        this.deleteNode(childNode, toDeleteNode);
      });
    }
  }

  findPath(rootNode: TreeNode, leaf: TreeNode) {
    
  }

}
