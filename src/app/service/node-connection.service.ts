import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Node } from '../model/node';
import { NodePayload } from '../model/nodePayload';
import { NodeManagementService } from './node-management.service';

@Injectable({
  providedIn: 'root'
})
export class NodeConnectionService {

  payload: NodePayload[] = [];
  payloadRootNode: Node[] = [];
  payloadParentNode: Node;

  constructor(
    private http: HttpClient,
    private nodeService: NodeManagementService
  ) { }

  saveNodeTree(root: Node): Observable<Node> {
    this.clearPayload();
    this.deserializeTree(root);
    return this.http.post<Node>('http://localhost:8080/save', this.payload); 
  }

  retrieveNodeTree(): Observable<any> {
    return this.http.get('http://localhost:8080/retrieve');
  }

  serializeTree(nodePayloadList: NodePayload[]): Node[] {
    this.clearPayload();
    nodePayloadList.forEach(node => {
      if(node.parent === null) {
        const root: Node = this.createSerializedNode(node, null);
        this.payloadRootNode.push(root);
      } else {
        this.findNodeInTree(this.payloadRootNode[0], node.parent);
        const parent: Node = this.payloadParentNode;
        const newNode: Node = this.createSerializedNode(node, parent);
        this.nodeService.addChildrenToNode(parent, newNode);
      }
    });

    return this.payloadRootNode;
  }

  private deserializeTree(rootNode: Node): void {
    if(!this.payload.find(node => node.key === rootNode.key)) {
      this.payload.push({
        key: rootNode.key, 
        value: rootNode.value, 
        parent: !!rootNode.parentNode ? rootNode.parentNode.key : null
      });
    }

    rootNode.children.forEach(childNode => {
      this.deserializeTree(childNode);
    });
  }

  private findNodeInTree(node: Node, nodeKey: string): void {
    if(nodeKey === node.key) {
      this.payloadParentNode = node;
      return;
    } else {
      node.children.forEach(childNode => {
        this.findNodeInTree(childNode, nodeKey);
      });
    }
  }
  
  private createSerializedNode(inputNode: NodePayload, parent: Node): Node {
    return {
      key: inputNode.key,
      value: inputNode.value,
      children: [],
      parentNode: parent,
      expanded: true
    };
  }

  private clearPayload(): void {
    this.payload = [];
    this.payloadRootNode = [];
    this.payloadParentNode = null;
  }

}
