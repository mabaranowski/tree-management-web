import { TreeNode } from 'primeng/api/treenode';

export interface Node extends TreeNode {
    value: number;
    parentNode: Node;
    children: Node[];
}
