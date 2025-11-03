namespace BusinessCardManagement.Core.Helpers;

public class ResponseEnvelope<T>
{
    public string? Message { get; set; }
    public bool IsSuccess { get; set; } = false;
    public T? ResponseData { get; set; }
}