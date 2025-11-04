using System.Text.Json.Serialization;

namespace BusinessCardManagement.Core.Helpers;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum FileType
{
    Csv,
    Xml
}