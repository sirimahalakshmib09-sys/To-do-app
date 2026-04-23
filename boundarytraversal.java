/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int data;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int val) { data = val; left = null, right = null }
 * }
 **/

class Solution {
    public List<Integer> boundary(TreeNode root) {
        List<Integer> res=new ArrayList<>();
        if(root==null)
        return res;
        if(!(isLeaf(root)))
        res.add(root.data);
        addLeftBoundary(root, res);
        addLeaves(root, res);
        addRightBoundary(root, res);
        return res;
    }
    boolean isLeaf(TreeNode root)
    {
        return root.left==null && root.right==null;
    }
    void addLeftBoundary(TreeNode root,List<Integer> res)
    {
        TreeNode curr=root.left;
        while(curr!=null)
        {
            if(!(isLeaf(curr)))
            res.add(curr.data);
            if(curr.left!=null)
            curr=curr.left;
            else
            curr=curr.right;
        }
    }
    void addRightBoundary(TreeNode root,List<Integer> res)
    {
    TreeNode curr=root.right;
        List<Integer> temp = new ArrayList<>();
        while(curr!=null)
        {
            if(!(isLeaf(curr)))
            temp.add(curr.data);
            if(curr.right!=null)
            curr=curr.right;
            else
            curr=curr.left;
        }
        for(int i=temp.size()-1;i>=0;i--)
            {
                res.add(temp.get(i));
            }
    }
    void addLeaves(TreeNode root, List<Integer> res)
    {
        if(isLeaf(root))
        res.add(root.data);
        if(root.left!=null)
        addLeaves(root.left,res);
        if(root.right!=null)
        addLeaves(root.right,res);
    }
}