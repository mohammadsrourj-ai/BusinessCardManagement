using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Http;
using System.Globalization;
using System.Xml.Serialization;

namespace BusinessCardManagement.infrastructure;
public static class FileParser
{
    public static List<T> ParseCsv<T>(IFormFile file) where T : class
    {
        using var stream = file.OpenReadStream();
        using var reader = new StreamReader(stream);

        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            IgnoreBlankLines = true,  
        };

        using var csv = new CsvReader(reader, config);

        var records = csv.GetRecords<T>().ToList();

        return records;
    }

    public static List<T> ParseXml<T>(IFormFile file)
    {
        using var stream = file.OpenReadStream();
        var serializer = new XmlSerializer(typeof(List<T>));
        return (List<T>)serializer.Deserialize(stream)!;
    }

    public static byte[] ToCsv<T>(List<T> data)
    {
        using var memoryStream = new MemoryStream();
        using var writer = new StreamWriter(memoryStream);
        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HasHeaderRecord = true
        };
        using var csv = new CsvWriter(writer, config);
        csv.WriteRecords(data);
        writer.Flush();
        memoryStream.Position = 0;
        return memoryStream.ToArray();
    }

    public static byte[] ToXml<T>(List<T> data)
    {
        var serializer = new XmlSerializer(typeof(List<T>));
        using var memoryStream = new MemoryStream();
        serializer.Serialize(memoryStream, data);
        memoryStream.Position = 0;
        return memoryStream.ToArray();
    }
}
