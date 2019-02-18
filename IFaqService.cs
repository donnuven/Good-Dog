using System.Collections.Generic;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface IFaqService
    {
        void Delete(int faqId);
        List<Faq> Get();
        Faq Get(int id);
        int Add(FaqAddRequest data, int userId);
        void Update(FaqUpdateRequest data);
        Paged<Faq> Get(int pageIndex, int pageSize);
        FaqCategories GetByCategoryId(int id);
        List<FaqCategories> GetFaqByAllCategories();
        void Update_Many(List<FaqUpdateRequest> model);
    }
}