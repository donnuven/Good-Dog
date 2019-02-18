using System.Collections.Generic;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface IPrivacyPolicyService
    {
        void Delete(int id);
        List<PrivacyPolicy> Get();
        PrivacyPolicy Get(int id);
        int Add(PrivacyPolicyAddRequest data, int userId);
        void Update(PrivacyPolicyUpdateRequest data);
        void Update_Multiple(List<PrivacyPolicyUpdateRequest> data);
    }
}
