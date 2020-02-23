using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
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
        public ActionResult<List<UserTaskDetailsViewModel>> Get() => _userTaskDbManager.Get();

        [HttpGet("{id}")]
        public ActionResult<UserTaskDetailsViewModel> Get(int id)
        {
            var task = _userTaskDbManager.Get(id);
            if (task == null)
                return NotFound();
            return task;
        }

        [HttpPost]
        public ActionResult<UserTaskDetailsViewModel> Create(UserTaskDetailsViewModel taskDetailsViewModel)
        {
            var newTask = _userTaskDbManager.Create(taskDetailsViewModel);
            return CreatedAtAction(nameof(Get), new { id = newTask.Id }, taskDetailsViewModel);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UserTaskDetailsViewModel taskDetailsViewModel)
        {
            if (_userTaskDbManager.Update(id, taskDetailsViewModel))
                return NoContent();
            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_userTaskDbManager.Remove(id))
                return NoContent();
            return NotFound();
        }

        [HttpGet("group/{groupId}")]
        public ActionResult<List<SimpleUserTaskViewModel>> GetAllTaskInGroup(int groupId)
        {
            var tasks = _userTaskDbManager.Get()?.Where(t => t.GroupId == groupId)
                .Select(t => t as SimpleUserTaskViewModel);
            if (tasks == null)
                return NotFound();
            return tasks.ToList();
        }
    }
}