using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nostreets.Extensions.DataControl.Classes;
using Nostreets.Extensions.Interfaces;
using Nostreets.Extensions.Extend.Web;
using Nostreets.Web.Interceptor;
using Nostreets.Web.Router.Models.Responses;
using Nostreets_Services.Classes.Domain.Bills;
using Nostreets_Services.Classes.Domain.Cards;
using Nostreets_Services.Classes.Domain.Charts;
using Nostreets_Services.Classes.Domain.Product;
using Nostreets_Services.Classes.Domain.Users;
using Nostreets_Services.Classes.Domain.Web;
using Nostreets_Services.Enums;
using Nostreets_Services.Interfaces.Services;
using Nostreets_Services.Models.Request;
using System.Net;
using System.Text.RegularExpressions;
using Nostreets.Extensions.DataControl.Enums;

namespace Nostreets_Sandbox_Core.Controllers
{
    //[Route("api/[controller]")]
    [Route("api")]
    [ApiController]
    public class SandboxApiController : ControllerBase
    {
        public SandboxApiController(IBillService billService, 
                                    IChartService chartService,
                                    IEmailService emailService,
                                    IUserService userService,
                                    IDBService<StyledCard, int> cardSrv,
                                    IDBService<WebRequestError, int> errorLog,
                                    IDBService<ProductDevelopment, int> delevopProductSrv)
        {
            _userSrv = userService;
            _chartsSrv = chartService;
            _emailSrv = emailService;
            _cardSrv = cardSrv;
            _billSrv = billService;
            _errorLog = errorLog;
            _delevopProductSrv = delevopProductSrv;
            //_oblBoardSrv = _oblBoardSrv.WindsorResolve(container);
        }

        //private IOBLBoardService _oblBoardSrv = null;// _oblSrv.WindsorResolve(container);
        private IBillService _billSrv = null;
        private IChartService _chartsSrv = null;
        private IEmailService _emailSrv = null;
        private IUserService _userSrv = null;
        private IDBService<StyledCard, int> _cardSrv = null;
        private IDBService<WebRequestError, int> _errorLog = null;
        private IDBService<ProductDevelopment, int> _delevopProductSrv = null;

        #region Private Members
        private bool IsOnDemendPrintingEmail(string strippedHtml)
        {
            bool result = false;
            Regex printfulOrderMatch = new Regex(@"(Your Order #)\d\d\d\d...............(has been sent out!)", RegexOptions.IgnoreCase | RegexOptions.Singleline);
            Regex artOfWhereOrderMatch = new Regex(@"(Your order #)(\d|[a-z])(\d|[a-z])(\d|[a-z])(\d|[a-z])(\d|[a-z])( is shipped!)", RegexOptions.IgnoreCase | RegexOptions.Singleline);
            Regex[] regices = new[] {
                printfulOrderMatch,
                artOfWhereOrderMatch
            };

            foreach (Regex regex in regices)
            {
                result = regex.IsMatch(strippedHtml);
                if (result)
                    break;
            }

            return result;
        }

        private HttpResponseMessage ErrorResponse(Exception ex)
        {
            _errorLog.Insert(new WebRequestError(Request, ex)
            {
                UserId = _userSrv.SessionUser?.Id
            });

            return Web.CreateResponse(HttpStatusCode.InternalServerError, new ErrorResponse(ex));
        }

        private string GetStringWithinLines(int begining, int ending, string[] file)
        {
            string result = null;
            for (int i = begining - 1; i <= ending; i++)
            {
                result += "\r\n" + file[i];
            }
            return result;
        }

        #endregion Private Members

        #region User Service Endpoints

        [Route("checkEmail")]
        [HttpGet]
        public HttpResponseMessage CheckIfEmailExist(string email)
        {
            try
            {
                bool result = _userSrv.CheckIfEmailExist(email);
                return Web.CreateResponse(HttpStatusCode.OK, new ItemResponse<bool>(result));
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Route("checkUsername")]
        [HttpGet]
        public HttpResponseMessage CheckIfUsernameExist(string username)
        {
            try
            {
                bool result = _userSrv.CheckIfUsernameExist(username);
                return Web.CreateResponse(HttpStatusCode.OK, new ItemResponse<bool>(result));
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Route("user/forgotPassword")]
        [HttpGet]
        public HttpResponseMessage ForgotPasswordEmail(string username)
        {
            try
            {
                _userSrv.ForgotPasswordEmailAsync(username);
                return Web.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("user/session")]
        [HttpGet]
        public HttpResponseMessage GetSessionUser()
        {
            try
            {
                if (_userSrv.SessionUser == null)
                    throw new Exception("Session is has not started...");

                return Web.CreateResponse(HttpStatusCode.OK, new ItemResponse<User>(_userSrv.SessionUser));
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Route("login")]
        [HttpPost]
        public async Task<HttpResponseMessage> LogInUserAsync(NamePasswordPair request, bool rememberDevice = false)
        {
            try
            {
                BaseResponse response = null;
                LogInResponse result = await _userSrv.LogInAsync(request, rememberDevice);

                if (result.Message == null)
                    response = new ItemResponse<User>(result.User);
                else
                    response = new ItemResponse<string>(result.Message);

                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpGet, Route("logout")]
        public HttpResponseMessage LogOutUser()
        {
            try
            {
                _userSrv.LogOut();
                return Web.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Route("register")]
        [HttpPost]
        public async Task<HttpResponseMessage> RegisterAsync(User user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string id = await _userSrv.RegisterAsync(user);
                    return Web.CreateResponse(HttpStatusCode.OK, new ItemResponse<string>(id));
                }
                else
                    throw new Exception("user is invalid...");

            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Route("user/resendValidationEmail")]
        [HttpGet]
        public HttpResponseMessage ResendValidationEmail(string username)
        {
            try
            {
                _userSrv.ResendValidationEmailAsync(username);

                return Web.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("user")]
        [HttpPut]
        public HttpResponseMessage UpdateUser(User user)
        {
            try
            {
                if (user.Id != _userSrv.SessionUser.Id)
                    throw new Exception("Targeted user is not the current user...");

                else
                    _userSrv.UpdateUser(user, true);

                return Web.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("user/validatePassword")]
        [HttpGet]
        public HttpResponseMessage ValidatePassword(string password)
        {
            try
            {
                if (!_userSrv.ValidatePassword(_userSrv.SessionUser.Password, password))
                    throw new Exception("Password is invalid...");

                return Web.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Route("user/tfauth")]
        [HttpGet]
        public HttpResponseMessage ValidateTFAuthCode(string id, string code)
        {
            try
            {
                Token token = _userSrv.ValidateToken(new TokenRequest { TokenId = id, Code = code }, out State state, out string o);

                if (!token.IsValidated)
                    throw new Exception("Code is invalid...");

                return Web.CreateResponse(HttpStatusCode.OK, new ItemResponse<User>(_userSrv.SessionUser));
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        #endregion User Service Endpoints

        #region Bill Service Endpoints

        [HttpDelete, Intercept("IsLoggedIn"), Route("bill/expenses/{id:int}")]
        public HttpResponseMessage DeleteExpense(int id)
        {
            try
            {
                _billSrv.DeleteExpense(id);
                SuccessResponse response = new SuccessResponse();
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpDelete, Intercept("IsLoggedIn"), Route("bill/income/{id:int}")]
        public HttpResponseMessage DeleteIncome(int id)
        {
            try
            {
                _billSrv.DeleteIncome(id);
                SuccessResponse response = new SuccessResponse();
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpGet, Route("bill/expenses/all"), Intercept("IsLoggedIn")]
        public HttpResponseMessage GetAllExpenses()
        {
            try
            {
                List<Expense> result = null;
                result = _billSrv.GetAllExpenses(_userSrv.SessionUser.Id);
                ItemsResponse<Expense> response = new ItemsResponse<Expense>(result);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpGet, Route("bill/income/all"), Intercept("IsLoggedIn")]
        public HttpResponseMessage GetAllIncome()
        {
            try
            {
                List<Income> result = null;
                result = _billSrv.GetAllIncome(_userSrv.SessionUser.Id);
                ItemsResponse<Income> response = new ItemsResponse<Income>(result);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpGet, Route("bill/combined/chart"), Intercept("IsLoggedIn")]
        public HttpResponseMessage GetCombinedChart(DateTime? startDate = null
                                                    , DateTime? endDate = null
                                                    , ScheduleTypes chartSchedule = ScheduleTypes.Any)
        {
            try
            {
                Chart<List<float>> result = null;
                result = _billSrv.GetCombinedChart(_userSrv.SessionUser.Id, out chartSchedule, startDate, endDate);
                ItemResponse<Chart<List<float>>> response = new ItemResponse<Chart<List<float>>>(result);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpGet, Route("bill/expenses"), Intercept("IsLoggedIn")]
        public HttpResponseMessage GetExpense(int id = 0
                                            , string name = null
                                            , ScheduleTypes scheduleType = ScheduleTypes.Any
                                            , ExpenseType billType = ExpenseType.Any)
        {
            try
            {
                Expense result = null;
                result = _billSrv.GetExpense(_userSrv.SessionUser.Id, name);
                ItemResponse<Expense> response = new ItemResponse<Expense>(result);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpGet, Route("bill/expenses/chart"), Intercept("IsLoggedIn")]
        public HttpResponseMessage GetExpensesChart(DateTime? startDate = null
                                                    , DateTime? endDate = null
                                                    , ScheduleTypes chartSchedule = ScheduleTypes.Any)
        {
            try
            {
                Chart<List<float>> result = null;
                result = _billSrv.GetExpensesChart(_userSrv.SessionUser.Id, out chartSchedule, startDate, endDate);
                ItemResponse<Chart<List<float>>> response = new ItemResponse<Chart<List<float>>>(result);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpGet, Route("bill/income"), Intercept("IsLoggedIn")]
        public HttpResponseMessage GetIncome(int id = 0
                                            , string name = null
                                            , ScheduleTypes scheduleType = ScheduleTypes.Any
                                            , IncomeType incomeType = IncomeType.Any)
        {
            try
            {
                Income result = null;
                result = _billSrv.GetIncome(_userSrv.SessionUser.Id, name);
                ItemResponse<Income> response = new ItemResponse<Income>(result);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpGet, Route("bill/income/chart"), Intercept("IsLoggedIn")]
        public HttpResponseMessage GetIncomeChart(DateTime? startDate = null
                                                   , DateTime? endDate = null
                                                   , ScheduleTypes chartSchedule = ScheduleTypes.Any)
        {
            try
            {
                Chart<List<float>> chart = null;
                chart = _billSrv.GetIncomeChart(_userSrv.SessionUser.Id, out chartSchedule, startDate, endDate);
                ItemResponse<Chart<List<float>>> response = new ItemResponse<Chart<List<float>>>(chart);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpPost, Route("bill/expenses"), Intercept("IsLoggedIn")]
        public HttpResponseMessage InsertExpense(Expense expense)
        {
            try
            {
                BaseResponse response = null;
                expense.UserId = _userSrv.SessionUser.Id;
                expense.ModifiedUserId = _userSrv.SessionUser.Id;

                if (!ModelState.IsValid)
                {
                    return Web.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    _billSrv.InsertExpense(expense);
                    response = new SuccessResponse();
                }

                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [HttpPost, Route("bill/income"), Intercept("IsLoggedIn")]
        public HttpResponseMessage InsertIncome(Income income)
        {
            try
            {
                BaseResponse response = null;
                income.UserId = _userSrv.SessionUser.Id;
                income.ModifiedUserId = _userSrv.SessionUser.Id;

                if (!ModelState.IsValid)
                    return Web.CreateResponse(HttpStatusCode.BadRequest);
                else
                {
                    _billSrv.InsertIncome(income);
                    response = new SuccessResponse();
                }

                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("bill/expenses")]
        [HttpPut]
        public HttpResponseMessage UpdateExpense(Expense expense)
        {
            try
            {
                BaseResponse response = null;
                expense.ModifiedUserId = _userSrv.SessionUser.Id;

                if (!ModelState.IsValid)
                {
                    return Web.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    _billSrv.UpdateExpense(expense);
                    response = new SuccessResponse();
                }

                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("bill/income")]
        [HttpPut]
        public HttpResponseMessage UpdateIncome(Income income)
        {
            try
            {
                BaseResponse response = null;
                income.ModifiedUserId = _userSrv.SessionUser.Id;

                if (!ModelState.IsValid)
                {
                    return Web.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    _billSrv.UpdateIncome(income);
                    response = new SuccessResponse();
                }

                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        #endregion Bill Service Endpoints

        #region Card Service Endpoints

        [Intercept("IsLoggedIn")]
        [Route("cards/delete/{id:int}")]
        [HttpDelete]
        public HttpResponseMessage DeleteCard(int id)
        {
            try
            {
                _cardSrv.Delete(id);
                SuccessResponse response = new SuccessResponse();
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("cards/user")]
        [HttpGet]
        public HttpResponseMessage GetAllCardsByUser()
        {
            try
            {
                List<StyledCard> filteredList = _cardSrv.Where(a => a.UserId == _userSrv.SessionUser.Id)?.ToList();
                ItemsResponse<StyledCard> response = new ItemsResponse<StyledCard>(filteredList);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("cards/{id:int}")]
        [HttpGet]
        public HttpResponseMessage GetCard(int id)
        {
            try
            {
                StyledCard card = _cardSrv.Get(id);
                ItemResponse<StyledCard> response = new ItemResponse<StyledCard>(card);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("cards")]
        [HttpPost]
        public HttpResponseMessage InsertCard(StyledCard model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Web.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    BaseResponse response = null;

                    model.UserId = _userSrv.SessionUser.Id;
                    int id = (int)_cardSrv.Insert(model);
                    if (id == 0) { throw new Exception("Insert Failed"); }
                    response = new ItemResponse<int>(id);
                    return Web.CreateResponse(HttpStatusCode.OK, response);
                }
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("cards")]
        [HttpPut]
        public HttpResponseMessage UpdateCard(StyledCard model)
        {
            try
            {
                BaseResponse response = null;

                if (!ModelState.IsValid)
                {
                    return Web.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    model.UserId = _userSrv.SessionUser.Id;
                    _cardSrv.Update(model);
                    response = new SuccessResponse();
                }

                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        #endregion Card Service Endpoints

        #region Chart Service Endpoints

        [Intercept("IsLoggedIn")]
        [Route("charts/delete/{id:int}")]
        [HttpDelete]
        public HttpResponseMessage DeleteChart(int id)
        {
            try
            {
                BaseResponse response = null;

                _chartsSrv.Delete(id);
                response = new SuccessResponse();
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("charts/all")]
        [HttpGet]
        public HttpResponseMessage GetAllCharts()
        {
            try
            {
                List<Chart<object>> list = _chartsSrv.GetAll();
                ItemsResponse<Chart<object>> response = new ItemsResponse<Chart<object>>(list);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("charts/user")]
        [HttpGet]
        public HttpResponseMessage GetAllChartsByUser()
        {
            try
            {
                List<Chart<object>> list = _chartsSrv.GetAll();
                List<Chart<object>> filteredList = list?.Where(a => a.UserId == _userSrv.SessionUser.Id).ToList();
                ItemsResponse<Chart<object>> response = new ItemsResponse<Chart<object>>(filteredList);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("charts/{id:int}")]
        [HttpGet]
        public HttpResponseMessage GetChart(int id)
        {
            try
            {
                Chart<object> chart = _chartsSrv.Get(id);
                ItemResponse<Chart<object>> response = new ItemResponse<Chart<object>>(chart);
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("charts/int")]
        [HttpPost]
        public HttpResponseMessage InsertChart(ChartAddRequest<int> model)
        {
            try
            {
                BaseResponse response = null;

                if (!ModelState.IsValid)
                {
                    return Web.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    model.UserId = _userSrv.SessionUser.Id;
                    int id = _chartsSrv.Insert(model, (a) =>
                    {
                        return new Chart<int>
                        {
                            Labels = a.Labels,
                            Legend = a.Legend,
                            Name = a.Name,
                            Series = a.Series,
                            TypeId = a.TypeId,
                            UserId = a.UserId,
                            DateModified = DateTime.Now,
                            DateCreated = DateTime.Now
                        };
                    });
                    if (id == 0) { throw new Exception("Insert Failed"); }
                    response = new ItemResponse<int>(id);
                }
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("charts/list/int")]
        [HttpPost]
        public HttpResponseMessage InsertChart(ChartAddRequest model)
        {
            try
            {
                BaseResponse response = null;

                if (!ModelState.IsValid)
                {
                    return Web.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    model.UserId = _userSrv.SessionUser.Id;

                    int id = _chartsSrv.Insert(model,
                        (a) =>
                        {
                            return new Chart<List<int>>
                            {
                                Labels = a.Labels,
                                Legend = a.Legend,
                                Name = a.Name,
                                Series = a.Series,
                                TypeId = a.TypeId,
                                UserId = a.UserId,
                                DateModified = DateTime.Now,
                                DateCreated = DateTime.Now
                            };
                        });

                    if (id == 0) { throw new Exception("Insert Failed"); }
                    response = new ItemResponse<int>(id);
                }
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("charts/int")]
        [HttpPut]
        public HttpResponseMessage UpdateChart(ChartUpdateRequest<int> model)
        {
            try
            {
                BaseResponse response = null;

                if (!ModelState.IsValid)
                {
                    return Web.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    model.UserId = _userSrv.SessionUser.Id;
                    _chartsSrv.Update(model, (a) =>
                    {
                        return new Chart<int>
                        {
                            Labels = a.Labels,
                            Legend = a.Legend,
                            Name = a.Name,
                            Series = a.Series,
                            TypeId = a.TypeId,
                            UserId = a.UserId,
                            DateModified = DateTime.Now
                        };
                    });
                    response = new SuccessResponse();
                }
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        [Intercept("IsLoggedIn")]
        [Route("charts/list/int")]
        [HttpPut]
        public HttpResponseMessage UpdateChart(ChartUpdateRequest model)
        {
            try
            {
                BaseResponse response = null;

                if (!ModelState.IsValid)
                {
                    return Web.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    model.UserId = _userSrv.SessionUser.Id;
                    _chartsSrv.Update(model, (a) =>
                    {
                        return new Chart<List<int>>
                        {
                            Labels = a.Labels,
                            Legend = a.Legend,
                            Name = a.Name,
                            Series = a.Series,
                            TypeId = a.TypeId,
                            UserId = a.UserId,
                            DateModified = DateTime.Now
                        };
                    });
                    response = new SuccessResponse();
                }
                return Web.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return ErrorResponse(ex);
            }
        }

        #endregion Chart Service Endpoints
    }
}
