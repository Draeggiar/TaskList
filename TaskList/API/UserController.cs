using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskList.Data.Logic.User;
using TaskList.Data.Models.ViewModels;

namespace TaskList.API
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserDbManager _usersManager;

        public UserController(IUserDbManager usersManager)
        {
            _usersManager = usersManager ?? throw new ArgumentNullException(nameof(usersManager));
        }

        [HttpGet]
        public ActionResult<List<UserViewModel>> Get() => _usersManager.Get();
    }
}