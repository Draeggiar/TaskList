using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using AutoMapper;
using TaskList.Data.Models.DbEntities;
using TaskList.Data.Models.ViewModels;

namespace TaskList.Data.Logic.UserTask
{
    class UserTaskDbManager : IUserTaskDbManager
    {
        private readonly TasksDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserTaskDbManager(ITasksDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext as TasksDbContext;
            _mapper = mapper;
        }

        public List<UserTaskViewModel> Get()
        {
            return _dbContext.UserTasks
                .Select(t => _mapper.Map<UserTaskViewModel>(t))
                .ToList();
        }

        [return: MaybeNull]
        public UserTaskViewModel Get(int id)
        {
            var taskFromDb = _dbContext.UserTasks.Find(id);
            return taskFromDb == null ? null : _mapper.Map<UserTaskViewModel>(taskFromDb);
        }

        public UserTaskEntity Create(UserTaskViewModel taskViewModel)
        {
            var newTask = _dbContext.UserTasks.Add(_mapper.Map<UserTaskEntity>(taskViewModel));
            _dbContext.SaveChanges();
            return newTask.Entity;
        }

        public void Update(int id, UserTaskViewModel taskViewModel)
        {
            var updatedTask = _mapper.Map<UserTaskEntity>(taskViewModel);
            updatedTask.Id = id;
            _dbContext.UserTasks.Update(updatedTask);
            _dbContext.SaveChanges();
        }

        public void Remove(int id)
        {
            var taskFromDb = _dbContext.UserTasks.Find(id);
            _dbContext.UserTasks.Remove(taskFromDb);
            _dbContext.SaveChanges();
        }
    }
}