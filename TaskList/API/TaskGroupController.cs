using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskList.Data.Logic.TaskGroup;
using TaskList.Data.Models.ViewModels;

namespace TaskList.API
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskGroupController : ControllerBase
    {
        private readonly ITaskGroupDbManager _groupDbManager;

        public TaskGroupController(ITaskGroupDbManager groupDbManager)
        {
            _groupDbManager = groupDbManager ?? throw new ArgumentNullException(nameof(groupDbManager));
        }

        [HttpGet]
        public ActionResult<List<TaskGroupViewModel>> Get() => _groupDbManager.Get();

        [HttpGet("{id}")]
        public ActionResult<TaskGroupViewModel> Get(int id)
        {
            var group = _groupDbManager.Get(id);
            if (group == null)
                return NotFound();
            return group;
        }

        [HttpPost]
        public ActionResult<TaskGroupViewModel> Create(TaskGroupViewModel groupViewModel)
        {
            var newGroupId = _groupDbManager.Create(groupViewModel);
            groupViewModel.Id = newGroupId;
            return CreatedAtAction(nameof(Get), new { id = newGroupId }, groupViewModel);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, TaskGroupViewModel groupViewModel)
        {
            if (_groupDbManager.Update(id, groupViewModel))
                return NoContent();
            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_groupDbManager.Remove(id))
                return NoContent();
            return NotFound();
        }
    }
}