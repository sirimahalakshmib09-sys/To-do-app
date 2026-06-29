public class Day4
{
    public static void main(String[] args)
    {
        int n=10;
        int x=5;
        for(int i=0;i<n/2;i++)
        {
            x--;
           for(int j=0;j<(n-(2*x))/2;j++)
           {
               System.out.print("*");
           }
           for(int j=0;j<n-2*(i+1);j++)
           {
               System.out.print(" ");
           }
           for(int j=0;j<(n-(2*x))/2;j++)
           {
               System.out.print("*");
           }
           System.out.println();
        }
        for(int i=1;i<n/2;i++)
        {
           for(int j=0;j<(n-2*i)/2;j++)
           {
               System.out.print("*");
           }
           for(int j=0;j<2*i;j++)
           {
               System.out.print(" ");
           }
           for(int j=0;j<(n-2*i)/2;j++)
           {
               System.out.print("*");
           }
           System.out.println();
        }
    }
}