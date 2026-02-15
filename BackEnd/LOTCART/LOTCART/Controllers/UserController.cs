using Microsoft.AspNetCore.Mvc;

namespace LOTCART.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
    }
}
