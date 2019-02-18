

using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models.Requests;
using Sabio.Web.Models.Responses;
using Sabio.Models;

namespace Sabio.Services
{
    public class FaqService : IFaqService
    {
        private IDataProvider _dataProvider;

        public FaqService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;

        }

        public void Delete(int id)
        {
            string storeProc = "[dbo].[Faq_Delete]";

            _dataProvider.ExecuteNonQuery(storeProc,
              delegate (SqlParameterCollection sqlParams)
                  {
                      sqlParams.AddWithValue("@Id", id);
                  });
        }

        public int Add(FaqAddRequest data, int userId)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");
            }
            int id = 0;

            string storeProc = "[dbo].[Faq_Insert]";

            _dataProvider.ExecuteNonQuery(storeProc,
                delegate (SqlParameterCollection sqlParams)

                {
                    sqlParams.AddWithValue("@UserId", userId);
                    sqlParams.AddWithValue("@CategoryId", data.CategoryId);
                    sqlParams.AddWithValue("@Question", data.Question);
                    sqlParams.AddWithValue("@Answer", data.Answer);
                    sqlParams.AddWithValue("@SortOrder", data.SortOrder);



                    SqlParameter idParameter = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idParameter.Direction = System.Data.ParameterDirection.Output;

                    sqlParams.Add(idParameter);


                }, returnParameters: delegate (SqlParameterCollection param)
                {
                    int.TryParse(param["@Id"].Value.ToString(), out id);
                });

            return id;
        }


        public void Update(FaqUpdateRequest data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");
            }
            string storeProc = "[dbo].[Faq_Update]";
            _dataProvider.ExecuteNonQuery(storeProc,
                delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@Id", data.Id);
                    sqlParams.AddWithValue("@CategoryId", data.CategoryId);
                    sqlParams.AddWithValue("@Question", data.Question);
                    sqlParams.AddWithValue("@Answer", data.Answer);
                    sqlParams.AddWithValue("@SortOrder", data.SortOrder);
                });

        }

        public void Update_Many(List<FaqUpdateRequest> data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");
            }
            string storeProc = "[dbo].[Faq_Update_Many]";
            _dataProvider.ExecuteNonQuery(storeProc, delegate (SqlParameterCollection sqlParams)
            {
                DataTable dataTable = new DataTable();
                dataTable.Columns.Add("@Id", typeof(int));
                dataTable.Columns.Add("SortOrder", typeof(int));

                foreach (var faq in data)
                {
                    DataRow dataRow = dataTable.NewRow();
                    dataRow[0] = faq.Id;
                    dataRow[1] = faq.SortOrder;
                    dataTable.Rows.Add(dataRow);

                }
                sqlParams.AddWithValue("@FaqsList", dataTable);
            });
        }

        public List<Sabio.Models.Domain.Faq> Get()
        {
            List<Sabio.Models.Domain.Faq> list = null;
            string storeProc = "[dbo].[Faq_SelectAll]";
            _dataProvider.ExecuteCmd(storeProc
                    , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                    {


                    }
                    , singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        Faq faq = GetFaqMap(reader);

                        if (list == null)
                        {
                            list = new List<Sabio.Models.Domain.Faq>();
                        }

                        list.Add(faq);


                    }
                    );

            return list;
        }

        public Sabio.Models.Paged<Faq> Get(int pageIndex, int pageSize)
        {
            int totalCount = 0;
            Sabio.Models.Paged<Faq> responseBody = null;
            List<Faq> list = null;
            string procName = "[dbo].[Faq_SelectByPage]";
            _dataProvider.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                 {
                     paramCollection.AddWithValue("@pageIndex", pageIndex);
                     paramCollection.AddWithValue("@pageSize", pageSize);

                 }
                  , singleRecordMapper: delegate (IDataReader reader, short set)
                  {
                      int startingIndex = 0;
                      Faq faq = GetFaqMap(reader);

                      if (totalCount == 0)
                      {
                          totalCount = reader.GetSafeInt32(startingIndex++);
                      }

                      if (list == null)
                      {
                          list = new List<Faq>();
                      }
                      list.Add(faq);


                  }
                   );
            if (list != null)
            {
                responseBody = new Sabio.Models.Paged<Faq>(list, pageIndex, pageSize, totalCount);
            }

            return responseBody;
        }


        public Sabio.Models.Domain.Faq Get(int id)
        {
            Sabio.Models.Domain.Faq faq = null;
            string storeProc = "[dbo].[Faq_SelectById]";
            _dataProvider.ExecuteCmd(storeProc
            , inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                faq = GetFaqMap(reader);
            }
            );
            return faq;
        }


        public List<FaqCategories> GetFaqByAllCategories()
        {
            string storedProc = "[dbo].[Faq_SelectAllByCategory]";
            List<FaqCategories> FaqList = new List<FaqCategories>();
            Dictionary<int, FaqCategories> dict = new Dictionary<int, FaqCategories>();

            _dataProvider.ExecuteCmd(storedProc, inputParamMapper: delegate (SqlParameterCollection sqlParams)
            {

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                switch (set)
                {
                    case 0:
                        FaqCategories sqlCategories = new FaqCategories();
                        sqlCategories.FaqList = new List<Faq>();
                        int startingIndex = 0;
                        sqlCategories.Id = reader.GetSafeInt32(startingIndex++);
                        sqlCategories.Name = reader.GetSafeString(startingIndex++);
                        FaqList.Add(sqlCategories);
                        dict.Add(sqlCategories.Id, sqlCategories);
                        break;
                    case 1:
                        startingIndex = 0;
                        Faq faq = new Faq();

                        faq.Id = reader.GetSafeInt32(startingIndex++);
                        faq.CategoryId = reader.GetSafeInt32(startingIndex++);
                        faq.Question = reader.GetSafeString(startingIndex++);
                        faq.Answer = reader.GetSafeString(startingIndex++);
                        faq.SortOrder = reader.GetSafeInt32(startingIndex++);
                        faq.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);
                        faq.DateModified = reader.GetSafeUtcDateTime(startingIndex++);
                        faq.UserId = reader.GetSafeInt32(startingIndex++);

                        if (dict.ContainsKey(faq.CategoryId))
                        {
                            dict[faq.CategoryId].FaqList.Add(faq);
                        }
                        break;
                }
            });
            return FaqList;
        }



        public Sabio.Models.Domain.FaqCategories GetByCategoryId(int id)
        {
            FaqCategories singleItem = new FaqCategories();

            string storeProc = "[dbo].[Faq_SelectByCategoryId]";

            _dataProvider.ExecuteCmd(storeProc,
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    switch (set)
                    {
                        case 0:
                            int startingIndex = 0;
                            singleItem.Id = reader.GetSafeInt32(startingIndex++);
                            singleItem.Name = reader.GetSafeString(startingIndex++);
                            break;

                        case 1:
                            Faq faq = GetFaqMap(reader);
                            if (singleItem.FaqList == null)
                            {
                                singleItem.FaqList = new List<Faq>();
                            }
                            singleItem.FaqList.Add(faq);
                            break;
                        default:
                            singleItem = null;
                            break;

                    }

                }
                );

            return singleItem;
        }

        private static Faq GetFaqMap(IDataReader reader)
        {
            Sabio.Models.Domain.Faq faq = new Faq();


            int startingIndex = 0;
            faq.Id = reader.GetSafeInt32(startingIndex++);
            faq.CategoryId = reader.GetSafeInt32(startingIndex++);
            faq.Question = reader.GetSafeString(startingIndex++);
            faq.Answer = reader.GetSafeString(startingIndex++);
            faq.SortOrder = reader.GetSafeInt32(startingIndex++);
            faq.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);
            faq.DateModified = reader.GetSafeUtcDateTime(startingIndex++);
            faq.UserId = reader.GetSafeInt32(startingIndex++);
            return faq;
        }



    }
}
