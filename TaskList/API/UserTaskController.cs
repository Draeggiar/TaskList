using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TaskList.Data.Logic.UserTask;
using TaskList.Data.Models.ViewModels;

namespace TaskList.API
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserTaskController : ControllerBase
    {
        private readonly IUserTaskDbManager _userTaskDbManager;

        public UserTaskController(IUserTaskDbManager userTaskDbManager)
        {
            _userTaskDbManager = userTaskDbManager;
        }

        [HttpGet]
        public ActionResult<List<UserTaskViewModel>> Get() => _userTaskDbManager.Get();

        [HttpGet("{id}")]
        public ActionResult<UserTaskViewModel> Get(int id)
        {
            var task = _userTaskDbManager.Get(id);
            if (task == null)
                return NotFound();
            return task;
        }

        [HttpPost]
        public ActionResult<UserTaskViewModel> Create(UserTaskViewModel taskViewModel)
        {
            var newTask = _userTaskDbManager.Create(taskViewModel);
            return CreatedAtRoute("GetUserTask", new { id = newTask.Id }, taskViewModel);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UserTaskViewModel taskViewModel)
        {
            if (_userTaskDbManager.Get(id) == null)
                return NotFound();

            _userTaskDbManager.Update(id, taskViewModel);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_userTaskDbManager.Get(id) == null)
                return NotFound();

            _userTaskDbManager.Remove(id);
            return NoContent();
        }
    }
}