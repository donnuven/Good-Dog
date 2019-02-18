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
    public class TermsAndConditionsService : ITermsAndConditionsService
    {
        private IDataProvider _dataProvider;

        public TermsAndConditionsService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public void Delete(int id)
        {
            string storeProc = "[dbo].[TermsAndConditions_Delete]";

            _dataProvider.ExecuteNonQuery(storeProc,
                delegate (SqlParameterCollection sqlParam)
                {
                    sqlParam.AddWithValue("@Id", id);
                });
        }

        public int Add(TermsAndConditionsAddRequest data, int userId)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");
            }
            int id = 0;

            string storeProc = "[dbo].[TermsAndConditions_Insert]";

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

        public void Update(TermsAndConditionsUpdateRequest data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");
            }
            string storedProc = "[dbo].[TermsAndConditions_Update]";
            _dataProvider.ExecuteNonQuery(storedProc,
                delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@Id", data.Id);
                    sqlParams.AddWithValue("@Title", data.Title);
                    sqlParams.AddWithValue("@Paragraph", data.Paragraph);
                    sqlParams.AddWithValue("@SortOrder", data.SortOrder);

                });
        }

        public void Update_Many(List<TermsAndConditionsUpdateRequest> data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("Parameter data is required");
            }
            string storedProc = "[dbo].[TermsAndConditions_Update_Many]";
            _dataProvider.ExecuteNonQuery(storedProc, delegate (SqlParameterCollection sqlParams)
            {
                DataTable dataTable = new DataTable();
                dataTable.Columns.Add("@Id", typeof(int));
                dataTable.Columns.Add("SortOrder", typeof(int));

                foreach (var termsandconditions in data)
                {
                    DataRow dataRow = dataTable.NewRow();
                    dataRow[0] = termsandconditions.Id;
                    dataRow[1] = termsandconditions.SortOrder;
                    dataTable.Rows.Add(dataRow);
                }
                sqlParams.AddWithValue("@TermsAndConditionsList", dataTable);
            });
        }


        public List<TermsAndConditions> Get()
        {
            List<TermsAndConditions> list = null;
            string storeProc = "[dbo].[TermsAndConditions_SelectAll]";
            _dataProvider.ExecuteCmd(storeProc
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                 {

                 }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    TermsAndConditions termsAndConditions = GetTermsAndConditionMapper(reader);

                    if (list == null)
                    {
                        list = new List<Sabio.Models.Domain.TermsAndConditions>();
                    }

                    list.Add(termsAndConditions);
                }
                );
            return list;
        }

        public Sabio.Models.Domain.TermsAndConditions Get(int id)
        {
            Sabio.Models.Domain.TermsAndConditions termsAndConditions = null;
            string storedProc = "[dbo].[TermsAndConditions_SelectById]";
            _dataProvider.ExecuteCmd(storedProc, inputParamMapper: delegate (SqlParameterCollection paramCollection)
             {
                 paramCollection.AddWithValue("@Id", id);
             }, singleRecordMapper: delegate (IDataReader reader, short set)
             {
                 termsAndConditions = GetTermsAndConditionMapper(reader);
             }
            );
            return termsAndConditions;
        }

        private static TermsAndConditions GetTermsAndConditionMapper(IDataReader reader)
        {
            TermsAndConditions termsAndConditions = new TermsAndConditions();
            int startingIndex = 0;
            termsAndConditions.Id = reader.GetSafeInt32(startingIndex++);
            termsAndConditions.Title = reader.GetSafeString(startingIndex++);
            termsAndConditions.Paragraph = reader.GetSafeString(startingIndex++);
            termsAndConditions.UserId = reader.GetSafeInt32(startingIndex++);
            termsAndConditions.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);
            termsAndConditions.DateModified = reader.GetSafeUtcDateTime(startingIndex++);
            termsAndConditions.SortOrder = reader.GetSafeInt32(startingIndex++);

            return termsAndConditions;
        }
    }

}
