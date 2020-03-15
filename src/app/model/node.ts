import { TreeNode } from 'primeng/api/treenode';

export interface Node extends TreeNode {
    parentNode: Node;
    children: Node[];
}
