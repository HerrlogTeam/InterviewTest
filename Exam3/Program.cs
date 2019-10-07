using System;
using System.Collections.Generic;

namespace Exam3
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var primeContainer = new PrimeContainer();

            primeContainer.PrimeNumbers.Add(1);
            primeContainer.PrimeNumbers.Add(2);
            primeContainer.PrimeNumbers.Add(3);
            primeContainer.PrimeNumbers.Add(5);
            Console.WriteLine(string.Join(",", primeContainer));
        }
    }

    public class PrimeContainer
    {
        public List<int> PrimeNumbers { get; set; }
    }
}