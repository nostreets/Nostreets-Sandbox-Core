using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

using Nostreets.Extensions.DataControl.Classes;
using Nostreets.Extensions.DataControl.Enums;
using Nostreets_Services.Classes.Domain.Users;
using Nostreets_Services.Interfaces.Services;

namespace Nostreets_Sandbox_Core.Pages
{
    public class IndexModel : PageModel
    {
        public IndexModel(IUserService userService)
        {
            _userService = userService;
        }

        public IUserService _userService = null;


        public void OnGet(string token = null)
        {
            User sessionUser = null;
            Token userToken = null;
            string outcome = null;
            bool hasVisited = false;
            State state = State.Error;

            if (token != null)
                userToken = _userService.ValidateToken(new TokenRequest { TokenId = token }, out state, out outcome);

            if (_userService.SessionUser != null)
            {
                sessionUser = _userService.SessionUser;
                hasVisited = true;
            }

            //else
            //    hasVisited  = (_userService.FirstOrDefault(a => a.Settings.IPAddresses != null && a.Settings.IPAddresses.Any(b => b == _userService.RequestIp)) != null) 
            //        ? true : false;

            ViewData["ServerModel"] = new
            {
                user = sessionUser,
                token = userToken,
                tokenOutcome = outcome,
                hasVisited,
                state = state.ToString()
            };


        }
    }
}
