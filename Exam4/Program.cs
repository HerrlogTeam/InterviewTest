using System;
using System.Collections.Generic;
using System.Linq;

namespace Exam4
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Console.WriteLine(string.Join(",", TripProcessor.GetTrips().Select(s => s.Length)));
        }
    }

    public static class TripProcessor
    {
        public static List<Route> GetTrips()
        {
            var routeLengths = RandomRoutes.GetRandomNumber();

            foreach (var item in routeLengths)
            {
                var smallerLength = routeLengths.FirstOrDefault(s => s.Length < item.Length);
                item.SmallerLength = smallerLength.Length;
            }

            return routeLengths;
        }
    }

    public class Route
    {
        public double SmallerLength { get; set; }
        public double Length { get; set; }
    }

    public static class RandomRoutes
    {
        public static List<Route> GetRandomNumber()
        {
            var result = new List<Route>();
            var rnd = new Random();

            for (int i = 0; i < 1000; i++)
            {
                result.Add(new Route { Length = rnd.NextDouble() * 100 });
            }

            return result;
        }
    }
}