using Standard.AI.OpenAI.Models.Services.Foundations.ChatCompletions;

namespace Golem.Interfaces
{
    public interface IOpenAIProxy
    {
        Task<ChatCompletionMessage[]> SendChatMessage(string message);
    }
}
