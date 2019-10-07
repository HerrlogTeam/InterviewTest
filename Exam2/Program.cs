using System;
using System.Globalization;

namespace Exam2
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Console.WriteLine(ConvertToDateTime("12/03/1992").ToString("yyyy-MM-dd"));
        }

        private static DateTime ConvertToDateTime(string date)
        {
            return DateTime.Parse(date, CultureInfo.InvariantCulture);
        }
    }
}