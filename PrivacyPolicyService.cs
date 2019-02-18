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
    public class PrivacyPolicyService : IPrivacyPolicyService
    {
        private IDataProvider _dataProvider;

        public PrivacyPolicyService(IDataProvider dataprovider)
        {


            _dataProvider = dataprovider;
        }

        public void Delete(int id)
        {
            string storeProc = "[dbo].[PrivacyPolicy_Delete]";
            _dataProvider.ExecuteNonQuery(storeProc,
                delegate (SqlParameterCollection sqlParam)
                {
                    sqlParam.AddWithValue("@Id", id);
                });
        }

        public int Add(PrivacyPolicyAddRequest data, int userId)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");
            }
            int id = 0;

            string storeProc = "[dbo].[PrivacyPolicy_Insert]";
            _dataProvider.ExecuteNonQuery(storeProc,
                     delegate (SqlParameterCollection sqlParams)

                     {

                         sqlParams.AddWithValue("@Title", data.Title);
                         sqlParams.AddWithValue("@Paragraph", data.Paragraph);
                         sqlParams.AddWithValue("@UserId", userId);
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

        public void Update(PrivacyPolicyUpdateRequest data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");

            }
            string storeProc = "[dbo].[PrivacyPolicy_Update]";
            _dataProvider.ExecuteNonQuery(storeProc, delegate (SqlParameterCollection sqlParams)
            {
                sqlParams.AddWithValue("@Id", data.Id);
                sqlParams.AddWithValue("@Title", data.Title);
                sqlParams.AddWithValue("@Paragraph", data.Paragraph);
                sqlParams.AddWithValue("@SortOrder", data.SortOrder);
            });
        }

        public void Update_Multiple(List<PrivacyPolicyUpdateRequest> data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");
            }
            string storeProc = "[dbo].[PrivacyPolicy_Update_Many]";
            _dataProvider.ExecuteNonQuery(storeProc, delegate (SqlParameterCollection sqlParams)
            {
                DataTable dataTable = new DataTable();
                dataTable.Columns.Add("Id", typeof(int));
                dataTable.Columns.Add("SortOrder", typeof(int));

                foreach (var privacypolicy in data)
                {
                    DataRow dataRow = dataTable.NewRow();
                    dataRow[0] = privacypolicy.Id;
                    dataRow[1] = privacypolicy.SortOrder;
                    dataTable.Rows.Add(dataRow);
                }
                sqlParams.AddWithValue("@PrivacyPolicyList", dataTable);

            });
        }

        public Sabio.Models.Domain.PrivacyPolicy Get(int id)
        {
            Sabio.Models.Domain.PrivacyPolicy privacyPolicy = null;
            string storedProc = "[dbo].[PrivacyPolicy_SelectById]";
            _dataProvider.ExecuteCmd(storedProc, inputParamMapper: delegate (SqlParameterCollection paramCollection)
             {
                 paramCollection.AddWithValue("@Id", id);
             }, singleRecordMapper: delegate (IDataReader reader, short set)
             {
                 privacyPolicy = GetPrivacyPolicyMapper(reader);
             }
            );
            return privacyPolicy;
        }

        public List<PrivacyPolicy> Get()
        {
            List<PrivacyPolicy> list = null;
            string storeProc = "[dbo].[PrivacyPolicy_SelectAll]";
            _dataProvider.ExecuteCmd(storeProc, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                PrivacyPolicy privacyPolicy = GetPrivacyPolicyMapper(reader);

                if (list == null)
                {
                    list = new List<Sabio.Models.Domain.PrivacyPolicy>();
                }

                list.Add(privacyPolicy);
            }
                );
            return list;
        }

        private static PrivacyPolicy GetPrivacyPolicyMapper(IDataReader reader)
        {
            PrivacyPolicy privacyPolicy = new PrivacyPolicy();
            int startingIndex = 0;
            privacyPolicy.Id = reader.GetSafeInt32(startingIndex++);
            privacyPolicy.Title = reader.GetSafeString(startingIndex++);
            privacyPolicy.Paragraph = reader.GetSafeString(startingIndex++);
            privacyPolicy.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);
            privacyPolicy.DateModified = reader.GetSafeUtcDateTime(startingIndex++);
            privacyPolicy.UserId = reader.GetSafeInt32(startingIndex++);
            privacyPolicy.SortOrder = reader.GetSafeInt32(startingIndex++);
            return privacyPolicy;
        }
    }
}

