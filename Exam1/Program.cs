using System;

namespace Exam1
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Console.WriteLine(Average(1, 2));
        }

        public static double Average(int x, int y)
        {
            return (x + y) / 2;
        }
    }
}