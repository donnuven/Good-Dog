using System.Collections.Generic;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface ITermsAndConditionsService
    {
        void Delete(int id);
        List<TermsAndConditions> Get();
        TermsAndConditions Get(int id);
        int Add(TermsAndConditionsAddRequest data, int userId);
        void Update(TermsAndConditionsUpdateRequest data);
        void Update_Many(List<TermsAndConditionsUpdateRequest> model);
    }
}
